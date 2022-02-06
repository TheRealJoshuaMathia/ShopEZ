import React, { Component, useState } from "react";
import ItemDataService from "../services/items.service";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

// AddItem Styling

// const styles = createTheme({

//     components: {
//     Box: {
//         styleOverrides: {

//         }
//     }
// }


// });


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

    const[store, setStore] = React.useState()
    const stores = [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'EUR',
            label: '€',
        },
        {
            value: 'BTC',
            label: '฿',
        },
        {
            value: 'JPY',
            label: '¥',
        },
    ];

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
            <form>
                {this.state.submitted ? (
                    <div>
                        <h4>Submitted successfully!</h4>
                        <Button variant="contained" color="success">Success</Button>
                    </div>
                ) : (
                    <Grid container
                        marginTop={1}
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            background: "red",
                            minHeight: "100vh"
                        }}
                    >
                        <Grid
                            container
                            display="flex"
                            direction="column"
                            paddingTop={0}
                            spacing={0}
                            justifyContent="center"
                            wrap="nowrap"
                            alignItems="center"
                            sx={{ background: "gray", height: "60vh", width: "50vh" }}>
                            <Grid item marginTop={5} marginBottom={5} >
                                <TextField required id="outlined-basic" label="Title" variant="outlined" />
                            </Grid>
                            <Grid item marginBottom={5}>
                                <TextField id="outlined-basic" label="Type" variant="outlined" />
                            </Grid>
                            <Grid item marginBottom={5}>
                                <TextField
                                    id="outlined-basic"
                                    label="Catagory"
                                    variant="outlined"
                                    select
                                    value={store}>
                                    {stores.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item marginBottom={5}>
                                <TextField id="outlined-basic" label="Store" variant="outlined" />
                            </Grid>
                        </Grid>
                    </Grid>
                )
                }
            </form>
        )
    }
}
