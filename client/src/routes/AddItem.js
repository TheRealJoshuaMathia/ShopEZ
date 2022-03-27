import React, { useState } from "react";
import ItemDataService from "../services/items.service";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

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

const AddItem = () => {
  const defaultItemState = {
    id: null,
    title: "",
    type: "",
    catagory: "",
    store: "",
  };

  const [item, setItem] = useState(defaultItemState);
  const [submitted, setSubmitted] = useState(false);

  let navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };
  const saveItem = () => {
    var data = {
      title: item.title,
      type: item.type,
      catagory: item.catagory,
      store: item.store,
    };
    ItemDataService.create(data)
      .then((response) => {
        setItem({
          id: response.data.id,
          title: response.data.title,
          type: response.data.type,
          catagory: response.data.catagory,
          store: response.data.store,
        });
        setSubmitted(true);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        console.log("Trouble submitting...");
      });
  };

  const newItem = () => {
    setItem(defaultItemState);
    setSubmitted(false);
  };
  return (
    <ThemeProvider theme={styles}>
      <form>
        {submitted ? (
          <div>
            <h4>Submitted successfully!</h4>
            <Button variant="contained" color="success" onClick={newItem}>
              Add
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/items")}
            >
              Items
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
                  name="title"
                  variant="outlined"
                  value={item.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item marginBottom={5}>
                <TextField
                  className="form-item"
                  id="outlined-basic"
                  label="Type"
                  name="type"
                  variant="outlined"
                  value={item.type}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item marginBottom={5}>
                <TextField
                  className="form-item"
                  id="outlined-basic"
                  label="Catagory"
                  variant="outlined"
                  name="catagory"
                  autoComplete=""
                  value={item.catagory}
                  onChange={handleInputChange}
                ></TextField>
              </Grid>
              <Grid item marginBottom={5}>
                <TextField
                  className="form-item"
                  id="outlined-basic"
                  label="Store"
                  name="store"
                  variant="outlined"
                  placeholder="Select"
                  value={item.store}
                  onChange={handleInputChange}
                  select
                  helperText={`Please select "TBD" option if unknown!`}
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
                      onClick={saveItem}
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item marginTop={1}>
                    <Button variant="contained" color="error" onClick={newItem}>
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
};
export default AddItem;
