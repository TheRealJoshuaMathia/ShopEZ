import React, { Component } from "react";
import ItemDataService from "../services/items.service";
import ItemActions from "./ItemActions";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

const ItemStyles = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          ".form-item": {
            width: "50%",
          },
        },
      },
    },
  },
});

const stores = [
  {
    value: "TBD",
    label: "TBD",
  },
  {
    value: "Costco",
    label: "Costco",
  },
  {
    value: "Cash & Carry",
    label: "Cash & Carry",
  },
  {
    value: "Winco",
    label: "Winco",
  },
  {
    value: "Walmart",
    label: "Walmart",
  },
];

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeCatagory = this.onChangeCatagory.bind(this);
    this.onChangeStore = this.onChangeStore.bind(this);
    this.getItem = this.getItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      activeItem: {
        itemId: null,
        title: "",
        type: "",
        catagory: "",
        store: "",
      },
      successMessage: false,
    };
  }
  componentDidMount() {
    if (this.props.match && this.props.params.itemId) {
      this.getItem(this.props.params.itemId);
    }
  }
  getItem(itemId) {
    ItemDataService.get(itemId)
      .then((response) => {
        this.setState({
          activeItem: response.data,
        });
        console.log(response.data);
      })
      .catch((event) => {
        console.log(event);
      });
  }

  updateItem() {
    ItemDataService.update(this.state.activeItem.itemId, this.state.activeItem)
      .then((response) => {
        console.log(response.data);
        this.setState({
          successMessage: true,
        });
      })
      .catch((event) => {
        console.log(event);
      });
  }
  deleteItem() {
    ItemDataService.delete(this.state.activeItem.itemId)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/items");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onChangeTitle(event) {
    const title = event.target.value;

    this.setState(function (prevState) {
      return {
        activeItem: {
          ...prevState.activeItem,
          title: title,
        },
      };
    });
  }
  onChangeType(event) {
    const type = event.target.value;
    this.setState((prevState) => ({
      activeItem: {
        ...prevState.activeItem,
        type: type,
      },
    }));
  }
  onChangeCatagory(event) {
    const catagory = event.target.value;
    this.setState((prevState) => ({
      activeItem: {
        ...prevState.activeItem,
        catagory: catagory,
      },
    }));
  }
  onChangeStore(event) {
    const store = event.target.value;
    this.setState((prevState) => ({
      activeItem: {
        ...prevState.activeItem,
        store: store,
      },
    }));
  }
  render() {
    const { activeItem } = this.state;

    return (
      <ThemeProvider theme={ItemStyles}>
        {activeItem ? (
          <Grid
            container
            marginTop={3}
            justifyContent="center"
            alignItems="center"
            sx={{
              background: "white",
            }}
          >
            <form>
              <Grid item marginTop={5} marginBottom={5}>
                <TextField
                  className="form-item"
                  required
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  placeholder={activeItem.title}
                  onChange={this.onChangeTitle}
                ></TextField>
              </Grid>
              <Grid item marginBottom={5}>
                <TextField
                  className="form-item"
                  id="outlined-basic"
                  label="Type"
                  variant="outlined"
                  value={activeItem.type}
                  onChange={this.onChangeType}
                />
              </Grid>
              <Grid item marginBottom={5}>
                <TextField
                  className="form-item"
                  id="outlined-basic"
                  label="Catagory"
                  variant="outlined"
                  value={activeItem.catagory}
                  onChange={this.onChangeCatagory}
                ></TextField>
              </Grid>
              <Grid item marginBottom={5}>
                <TextField
                  className="form-item"
                  id="outlined-basic"
                  label="Store"
                  variant="outlined"
                  placeholder="Select"
                  value={activeItem.store}
                  onChange={this.onChangeStore}
                  select
                  helperText={`Please select "TBD" if unknown!`}
                >
                  {stores.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <ItemActions
                handleEdit={this.updateItem}
                handleDelete={this.deleteItem}
              />
            </form>
          </Grid>
        ) : (
          <h4>Click on a tutorial</h4>
        )}
      </ThemeProvider>
    );
  }
}
