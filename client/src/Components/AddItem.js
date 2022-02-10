import React, { Component } from "react";
import ItemDataService from "../services/items.service";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

//AddItem Styling

const styles = createTheme({
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
      itemId: null,
      title: "",
      type: "",
      catagory: "",
      store: "",
      submitted: false,
    };
  }

  onChangeTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }

  onChangeType(event) {
    this.setState({
      type: event.target.value,
    });
  }
  onChangeCatagory(event) {
    this.setState({
      catagory: event.target.value,
    });
  }

  onChangeStore(event) {
    this.setState({
      store: event.target.value,
    });
  }

  saveItem() {
    var data = {
      title: this.state.title,
      type: this.state.type,
      catagory: this.state.catagory,
      store: this.state.store,
    };

    ItemDataService.create(data)
      .then((response) => {
        this.setState({
          itemId: response.data.itemId,
          title: response.data.title,
          type: response.data.type,
          catagory: response.data.catagory,
          store: response.data.store,
          submitted: true,
        });
        console.log(data);
      })
      .catch((event) => {
        console.log(event);
      });
  }

  newItem() {
    this.setState({
      title: "",
      type: "",
      catagory: "",
      store: "",
      submitted: false,
    });
  }

  render() {
    return (
      <ThemeProvider theme={styles}>
        <form>
          {this.state.submitted ? (
            <div>
              <h4>Submitted successfully!</h4>
              <Button variant="contained" color="success">
                <Link to="/items">Items</Link>
              </Button>
            </div>
          ) : (
            <Grid
              container
              marginTop={3}
              justifyContent="center"
              alignItems="center"
              sx={{
                background: "white",
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
                sx={{ background: "gray", height: "inherit", width: "50vh" }}
              >
                <Grid item marginTop={5} marginBottom={5}>
                  <TextField
                    className="form-item"
                    required
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                  />
                </Grid>
                <Grid item marginBottom={5}>
                  <TextField
                    className="form-item"
                    id="outlined-basic"
                    label="Type"
                    variant="outlined"
                    value={this.state.type}
                    onChange={this.onChangeType}
                  />
                </Grid>
                <Grid item marginBottom={5}>
                  <TextField
                    className="form-item"
                    id="outlined-basic"
                    label="Catagory"
                    variant="outlined"
                    autoComplete=""
                    value={this.state.catagory}
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
                    value={this.state.store}
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
                  <Grid direction="row" display="flex">
                    <Grid item marginTop={1} marginRight={3}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={this.saveItem}
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid item marginTop={1}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={this.newItem}
                      >
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </form>
      </ThemeProvider>
    );
  }
}
