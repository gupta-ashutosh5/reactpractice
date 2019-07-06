import React, {Component} from 'react'
import {connect} from 'react-redux'
import NewsItem from "../../components/NewsItem/NewsItem"
import {addNews} from '../../actions'
import {Redirect} from 'react-router'

class AddNewsItem extends Component {
  state = {}

  onUpdateValue = (field, e) => {
    if (e.target.value !== '') {
      var data = {}
      data[field] = e.target.value
      this.setState(data)
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {dispatch} = this.props
    let news = this.state;
    dispatch(addNews(news));
  }

  render = () => {
    const {isFetching} = this.props
    if (isFetching) {
      return (
        <Redirect to="/dashboard"/>
      )
    }
    else {
      return (
        <NewsItem
          onSubmitForm={this.submitForm.bind(this)}
          updateValue={this.onUpdateValue.bind(this)}
        />
      )
    }
  }
}

const mapStateToProps = (state) => {
  const {isFetching} = state.projectOperations
  return {
    isFetching
  }
}

export default connect(mapStateToProps)(AddNewsItem);
