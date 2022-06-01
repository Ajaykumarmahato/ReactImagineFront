import React, { Component } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";

class CategoryForm extends Component {
  state = {};

  render() {
    return (
      <Form>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="name"
              id="exampleEmail"
              placeholder="Category Name"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input type="textarea" name="description" id="exampleText" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleFile" sm={2}>
            Image
          </Label>
          <Col sm={10}>
            <Input type="file" name="file" id="exampleFile" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col className="d-flex justify-content-end">
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
export default CategoryForm;
