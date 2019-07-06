import React, {Component} from 'react';
import {RIEInput} from 'riek';
import { Col, Table } from 'reactstrap';

class ProjectDetails extends Component {
  render = () => {
    const { project } = this.props;
    if (project.length === 0) {
      return <div>No data found</div>
    }
    else {
      return (
        <Col xs="12" sm="6" md="4">
          <Table bordered>
            <tbody>
              <tr>
                <th scope="row">Title</th>
                <td>
                  <RIEInput
                    value={project.title}
                    change={this.props.handleChange.bind(this, 'title')}
                    propName='title'>
                  </RIEInput>
                </td>
              </tr>
              <tr>
                <th scope="row">Body</th>
                <td>
                  <RIEInput
                    value={project.body ? project.body : 'NA'}
                    change={this.props.handleChange.bind(this, 'body')}
                    propName='body'>
                  </RIEInput>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      )
    }
  }
}

export default ProjectDetails;
