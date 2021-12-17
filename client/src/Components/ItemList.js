import React, { Component } from "react";
import axios from "axios";
import Item from "./Item";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const styles = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: 'black',
                },
            },
        },
    },
});

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }
    componentDidMount() {
        axios
            .get('https://localhost:7205/api/items')
            .then((res) => {
                this.setState({
                    items: res.data,
                });
            })
            .catch((err) => {
                console.log("Error showing list");
            });
    }

    render() {

        const items = this.state.items;
        let itemList;

        if (!items) {
            itemList = "There are no items found!";
        }
        else {
            itemList = items.map((item, k) => (
                <Item
                    key={k}
                    title={item.title}
                    type={item.type}
                    catagory={item.catagory}
                    store={item.store}
                />
            ))
        }
        return (
            <ThemeProvider theme={styles}> {itemList} </ThemeProvider>
        )
    }
}
export default ItemList;
