import React from 'react';
import {FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import 'abortcontroller-polyfill';

import {connect} from 'react-redux';

import NewsItem from "../../components/NewsItem"

import {actions as home} from "../../index";
const { getNewsHeadlines } = home;

class Home extends React.Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      refreshing: false
    }
    const AbortController = window.AbortController;
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  };

  componentDidMount() {
    this._isMounted = true;
    this.getNewsHeadlines(false)
  }
  componentWillUnmount() {
    this.controller.abort();
  }

  getNewsHeadlines = (refreshing = true) => {
    this.setState({refreshing});
    this.props.getNewsHeadlines(this.props.area)
      .finally(() => this.setState({refreshing: false}));
  }

  renderItem = ({item, index}) => {
    return <NewsItem article={item}/>
  }

  render() {

    const {articles, isFetching, hasError,errorMsg} = this.props;

    if (isFetching) return <ActivityIndicator/>
    else {
      return (
        <FlatList
          style={{backgroundColor:'#eaeaea'}}
          contentContainerStyle={{paddingVertical:5,}}
          ref='listRef'
          data={articles}
          extraData={this.state}
          renderItem={this.renderItem}
          initialNumToRender={5}
          keyExtractor={(item, index) => index.toString()+"_home"}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.getNewsHeadlines}
            />
          }
        />
      );
    }
  }
}

function mapStateToProps(state, props) {
  return {
    isFetching: state.homeReducer.isFetching,
    hasError: state.homeReducer.hasError,
    errorMsg: state.homeReducer.errorMsg,
    articles: state.homeReducer.articles
  }
}

export default connect(mapStateToProps, { getNewsHeadlines })(Home);
