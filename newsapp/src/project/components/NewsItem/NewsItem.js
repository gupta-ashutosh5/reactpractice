import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

class NewsItem extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <Form onSubmit={this.props.onSubmitForm}>
                <CardHeader>
                  <strong>
Add News Item
                  </strong>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label htmlFor="title">
Title
                    </Label>
                    <Input
                      onChange={this.props.updateValue.bind(this, 'title')}
                      type="text"
                      id="title"
                      placeholder="Enter News Title"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="body">
Body
                    </Label>
                    <Input
                      onChange={this.props.updateValue.bind(this, 'body')}
                      type="textarea"
                      id="body"
                      placeholder="Enter News Body"
                    />
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i
                      className="fa fa-dot-circle-o"
                    />
                    {' '}
Submit
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewsItem;
