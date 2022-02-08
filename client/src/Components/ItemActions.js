import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default class ItemActions extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  handleEdit() {
    this.props.editFunction(this.props.value);
  }
  handleAdd() {
    this.props.addFunction(this.props.value);
  }
  render() {
    return (
      <Grid display="flex" direction="row" container alignItems="flex-start">
        <Grid item marginRight={2}>
          <Button variant="contained" color="primary" onClick={this.handleEdit}>
            Edit
          </Button>
        </Grid>
        <Grid item marginRight={2}>
          <Button variant="contained" color="success" onClick={this.handleAdd}>
            Add
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="error">
            Delete
          </Button>
        </Grid>
      </Grid>
    );
  }
}
