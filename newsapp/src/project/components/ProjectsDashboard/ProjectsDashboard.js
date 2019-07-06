import React, { Component } from 'react';
import {
  CardText, CardLink, Col, Card, Row, CardHeader, CardBody,
} from 'reactstrap';

class ProjectsDashboard extends Component {
  render() {
    // Fetching news from Props.
    const { news } = this.props;
    return (
      <div className="animated fadeIn">
        <h1>
News listing
        </h1>
        <Row>
          {news.map(news => (
            <Col xs="12" sm="6" md="4">
              <Card>
                <CardHeader>
                  {news.title}
                  <div className="card-actions">
                    <a onClick={this.props.addNews.bind(this, news)} href={`#/project/${news.news_id}`}>
                      <small className="text-muted">
View
                      </small>
                    </a>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <CardText>
                      {' '}
                      {news.body}
                      {' '}
                    </CardText>
                    <CardLink onClick={this.props.addNews.bind(this, news)} href={`#/project/${news.news_id}`}>
View
                    </CardLink>
                    <CardLink onClick={this.props.addNews.bind(this, news)} href={`#/project/${news.news_id}/edit`}>
Edit
                    </CardLink>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default ProjectsDashboard;
