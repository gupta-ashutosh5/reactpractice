import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import Cookies from "universal-cookie";
import CryptoJS from 'crypto-js';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';

import FullAside from './FullAside';
import FullFooter from './FullFooter';
import FullHeader from './FullHeader';

import Dashboard from '../../project/containers/Dashboard';
import AddNewsItem from '../../project/containers/AddNewsItem';
import Tabs from '../../project/containers/Tabs';
import Login from '../../project/components/Login';

import {
  userAuthenticationCheck,
  authenticateUser
} from '../../project/actions'

import config from '../../config';

class Full extends Component {
  onLogin = (name, pass) => {
    // This is called destructuring assignment. Only the one which is needed is assigned.
    const {dispatch} = this.props;
    dispatch(userAuthenticationCheck(name, pass))
  }

  /*
  As the name suggests, after all the elements of the page is rendered correctly,
  this method is called. After the markup is set on the page, this technique called
  by React itself to either fetch the data from An External API or perform some unique
  operations which need the JSX elements.

  componentDidMount() method is the perfect place, where we can call the setState()
  method to change the state of our application and render() the updated data loaded JSX.
  For example, we are going to fetch any data from an API then API call should be placed
  in this lifecycle method, and then we get the response, we can call the setState()
  method and render the element with updated data.
   */
  componentDidMount = () => {
    const {dispatch} = this.props;
    const cookies = new Cookies();
    var decryptText = cookies.get('isLoggedIn');
    if (decryptText !== undefined) {
      var access  = CryptoJS.AES.decrypt(decryptText, config.encryptText);
      access = access.toString(CryptoJS.enc.Utf8);
      if (access === 'true') {
        dispatch(authenticateUser(true));
      }
    }
  }

  render() {
    // Adding created projects to left navigation.
    const createProjectItems = (projects) => {
      const project = projects[projects.length - 1];
      if (project !== undefined) {
        const item = {
          name: project.title,
          url: `/project/${project.pid}`,
          icon: 'icon-speedometer',
        };
        const oldItem = navigation.items[navigation.items.length - 1];
        if (oldItem.url !== item.url) {
          navigation.items.push(item);
        }
      }
    };
    // End of navigation.

    if (this.props.viewedProjects) {
      createProjectItems(this.props.viewedProjects);
    }

    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return (
        <div className="app">
          <AppHeader fixed>
            <FullHeader />
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarNav navConfig={navigation} />
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
            <main className="main">
              <AppBreadcrumb />
              <Container fluid>
                <Switch>
                  <Route path="/login" name="Login" component={Login} />
                  <Route path="/dashboard" name="Dashboard" component={Dashboard} />
                  <Route path="/news/add" name="AddNews" component={AddNewsItem} />
                  <Route path="/project/:pid" name="Project" component={Tabs} />
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Container>
            </main>
            <AppAside fixed hidden>
              <FullAside />
            </AppAside>
          </div>
          <AppFooter>
            <FullFooter />
          </AppFooter>
        </div>
      );
    }
    else {
      return (
        <div className="app">
          <AppHeader fixed>
            <FullHeader />
          </AppHeader>
          <div className="app-body">
            <main className="main">
              <AppBreadcrumb />
              <Container fluid>
                <Login checkUser={this.onLogin.bind(this)}></Login>
              </Container>
            </main>
            <AppAside fixed hidden>
              <FullAside />
            </AppAside>
          </div>
          <AppFooter>
            <FullFooter />
          </AppFooter>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { viewedProjects, isLoggedIn } = state.projectOperations;
  return {
    viewedProjects,
    isLoggedIn
  };
};

export default connect(mapStateToProps)(Full);
