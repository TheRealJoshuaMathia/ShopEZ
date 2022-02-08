import React, { Component } from "react";
import axios from "axios";
import Item from "../Components/ListItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import ItemActions from "../Components/ItemActions";
import AddItem from "../Components/AddItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
//import Button from "@mui/material/Button";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.testButton = this.testButton.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      items: [],
      isAddItemVisible: false,
      isEditItemVisible: false,
      isModalOpen: false,
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
    this.setState({ isModalOpen: true });
  }
  handleOpen() {
    this.setState({ isModalOpen: true });
    console.log(this.state.isModalOpen.valueOf);
  }
  handleClose() {
    this.setState({ isModalOpen: false });
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
          {this.state.isAddItemVisible ? (
            <div>
              <Modal
                open={this.state.isModalOpen}
                onClose={this.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <AddItem />
                </Box>
              </Modal>
            </div>
          ) : null}
          <Stack spacing={2}>{itemList}</Stack>
        </Container>
      </ThemeProvider>
    );
  }
}
export default ItemList;
