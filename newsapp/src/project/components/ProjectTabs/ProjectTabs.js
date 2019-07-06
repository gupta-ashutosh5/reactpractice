import React, {Component} from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import classnames from 'classnames';

import ProjectDetails from '../../containers/ProjectDetails';

class ProjectTabs extends Component {

  state = {
    activeTab: 'project_details'
  };

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'project_details' })}
              href="#"
              onClick={ this.toggleTab.bind(this, 'project_details') }>
              Project Details
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="project_details">
            <ProjectDetails />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default ProjectTabs;
