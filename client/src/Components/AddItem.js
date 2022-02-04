import React, { Component } from "react";
import ItemDataService from "../services/items.service";

export default class AddItem extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeCatagory = this.onChangeCatagory.bind(this);
    this.onChangeStore = this.onChangeStore.bind(this);
  }
}
