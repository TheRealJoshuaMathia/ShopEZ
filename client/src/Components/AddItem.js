import React, { Component } from "react";
import ItemDataService from "../services/items.service";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material/TextField";
import Box from "@mui/material/Box";
export default class AddItem extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeCatagory = this.onChangeCatagory.bind(this);
        this.onChangeStore = this.onChangeStore.bind(this);
        this.saveItem = this.saveItem.bind(this);
        this.newItem = this.newItem.bind(this);

        this.state = {
            id: null,
            title: "",
            type: "",
            catagory: "",
            store: "",
            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }
    onChangeCatagory(e) {
        this.setState({
            catagory: e.target.value
        });
    }

    onChangeStore(e) {
        this.setState({
            store: e.target.value
        });
    }

    saveItem() {
        var data = {
            title: this.state.title,
            type: this.state.type,
            catagory: this.state.catagory,
            store: this.state.store
        };


        ItemDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    type: response.data.type,
                    catagory: response.data.catagory,
                    store: response.data.store,

                    submitted: true
                });
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    newItem() {
        this.setState({
            title: "",
            type: "",
            catagory: "",
            store: "",
            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Submitted successfully!</h4>
                        <Button variant="contained" color="success">Success</Button>
                    </div>
                ) : (
                    <Box
                        component="form">
                        <div>
                            <TextField required id="outlined-basic" label="Title" variant="outlined" />
                        </div>
                        <div>
                            <TextField id="outlined-basic" label="Type" variant="outlined" />
                        </div>
                        <div>
                            <TextField id="outlined-basic" label="Catagory" variant="outlined" />
                        </div>
                        <div>
                            <TextField id="outlined-basic" label="Store" variant="outlined" />
                        </div>
                    </Box>

                )};


            </div>
        )
    }
}
