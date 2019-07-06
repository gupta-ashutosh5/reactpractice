import React, {Component} from 'react';
import { connect } from 'react-redux'
import { listNews, viewedNews } from '../../actions'
import ProjectsDashboard from '../../components/ProjectsDashboard'

class Dashboard extends Component {

  pushNews = (news, e) => {
    this.props.dispatch(viewedNews(news));
  }

  // Call to listNews in actions/index.js file.
  // Once all components are mounted the data is in store in props.
  componentDidMount = () => {
    this.props.dispatch(listNews());
  }

  // Called after mapStateToProps() and connect()
  render() {
    const { isFetching, newsList } = this.props
    if (isFetching !== undefined && newsList !== undefined) {
      return (
        <div className="animated fadeIn">
          {
            (isFetching) ? <h2>Loading...</h2> : <ProjectsDashboard news={newsList} addNews={this.pushNews.bind(this)} />
          }
        </div>
      );
    }
    else {
      return(
        <div>Waiting for news item to load....</div>
      );
    }
  }
}

const mapStateToProps = state => {
  // Setting isFetching and projectList using destructuring.
  console.log(state);
  const { isFetching, newsList } = state.projectOperations
  return {
    isFetching,
    newsList
  }
}

// The data present in state is mapped to props of Dashboard using connect.
export default connect(mapStateToProps)(Dashboard)

/**
 * Calling Order
 *
 * 1. First componentDidMount is called. It triggers listNews() using dispatch.
 * 2. ListNews fetches the data from URL and sets state using dispatch.
 * 3. Then mapStateToProps is called. Here the state calls a reducer function. It takes old state and returns new state based on action type.
 * Any function in reducer is available to state.
 * 4. Using connect(), the state variables are mapped to component props.
 * 5. This props are then used in render function.
 *
 * */