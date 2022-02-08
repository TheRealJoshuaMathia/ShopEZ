import React, { Component } from "react";
import axios from "axios";
import Item from "../Components/ListItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import ItemActions from "../Components/ItemActions";
import AddItem from "../Components/AddItem";
import Modal from "@mui/material/Modal";
const styles = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "black",
          marginTop: 40,
          paddingTop: 30,
          paddingBottom: 30,
        },
      },
    },
  },
});

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.testButton = this.testButton.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.state = {
      items: [],
      isAddItemVisible: false,
      isEditItemVisible: false,
    };
  }

  componentDidMount() {
    axios
      .get("https://localhost:7205/api/items")
      .then((res) => {
        this.setState({
          items: res.data,
        });
      })
      .catch((err) => {
        console.log("Error showing list");
      });
  }

  testButton() {
    alert("You pressed me!");
  }
  addNewItem() {
    this.setState({ isAddItemVisible: true });
  }

  render() {
    const items = this.state.items;
    let itemList;

    if (!items) {
      itemList = "There are no items found!";
    } else {
      itemList = items.map((item, k) => (
        <>
          <Item
            key={k}
            title={item.title}
            type={item.type}
            catagory={item.catagory}
            store={item.store}
          />
          <ItemActions
            editFunction={this.testButton}
            addFunction={this.addNewItem}
            deleteFunction={this.testButton}
          />
        </>
      ));
    }
    return (
      <ThemeProvider theme={styles}>
        <Container>
          {this.state.isAddItemVisible ? <AddItem /> : null}

          <Stack spacing={2}>{itemList}</Stack>
        </Container>
      </ThemeProvider>
    );
  }
}
export default ItemList;
