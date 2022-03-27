import React, { useState, useEffect } from "react";
import ItemDataService from "../services/items.service";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
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

const Item = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const defaultItemState = {
    title: "",
    type: "",
    catagory: "",
    store: "",
  };
  const [activeItem, setActiveItem] = useState(defaultItemState);

  const getItem = (id) => {
    ItemDataService.get(id)
      .then((response) => {
        setActiveItem(response.data);
        console.log(response.data);
        console.log("Succesfully loaded data");
      })
      .catch((event) => {
        console.log(event);
      });
  };

  useEffect(() => {
    getItem(id);
  }, [id]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setActiveItem({ ...activeItem, [name]: value });
  };
  const updateItem = () => {
    var data = {
      title: activeItem.title,
      type: activeItem.type,
      catagory: activeItem.catagory,
      store: activeItem.store,
    };
    ItemDataService.update(activeItem.id, data)
      .then((response) => {
        console.log(response.data);
        console.log("Updated successfully!");
        navigate("/items");
      })
      .catch((event) => {
        console.log(event);
        console.log("Error updating data");
      });
  };
  const deleteItem = () => {
    ItemDataService.remove(activeItem.id)
      .then((response) => {
        console.log(response);
        navigate("/items");
      })
      .catch((event) => {
        console.log(event);
      });
  };
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
                value={activeItem.title}
                name="title"
                onChange={handleInputChange}
              ></TextField>
            </Grid>
            <Grid item marginBottom={5}>
              <TextField
                className="form-item"
                id="outlined-basic"
                label="Type"
                name="type"
                variant="outlined"
                value={activeItem.type}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item marginBottom={5}>
              <TextField
                className="form-item"
                id="outlined-basic"
                label="Catagory"
                name="catagory"
                variant="outlined"
                value={activeItem.catagory}
                onChange={handleInputChange}
              ></TextField>
            </Grid>
            <Grid item marginBottom={5}>
              <TextField
                className="form-item"
                id="outlined-basic"
                label="Store"
                variant="outlined"
                name="store"
                placeholder="Select"
                value={activeItem.store}
                onChange={handleInputChange}
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
            <Grid
              display="flex"
              direction="row"
              container
              alignItems="flex-start"
            >
              <Grid item marginRight={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={updateItem}
                >
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="error" onClick={deleteItem}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      ) : (
        <h4>Click on a tutorial</h4>
      )}
    </ThemeProvider>
  );
};
export default Item;
