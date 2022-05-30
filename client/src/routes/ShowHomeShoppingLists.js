import React, { useEffect, useState } from "react";
import HomeService from "../services/home.service";
import Grid from "@mui/material/Grid";
import EventBus from "../common/EventBus";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useParams } from "react-router-dom";

const ShowHomesShoppingLists = () => {
    const [showShoppingLists, setShoppingLists] = useState([]);
    const { homename } = useParams();

    const getShoppingLists = (homename) => {

        HomeService.getHomeShoppingLists(homename).then(
            (response) => {
                setShoppingLists(response.data);
                console.log(response.data);
            },
            (error) => {
                const _setShoppingLists =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message || error.toString();
                setShoppingLists(_setShoppingLists);
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        )
    }
    useEffect(() => {
        getShoppingLists(homename);
    }, [homename]);

    return (
        <Grid container direction="column">
            <Grid item direction="column">
                <List>
                    {console.log(showShoppingLists)}
                    {showShoppingLists &&
                        showShoppingLists.map((list, index) => (
                            <div key={index}>
                                <ListItem>
                                    List: {list.id}
                                </ListItem>
                                <ListItem>
                                    List Title: {list.title}
                                </ListItem>
                                <ListItem>
                                    {/* {home.homeShoppingLists.map(list =>
                                        <div>
                                            <ListItem>
                                                Home Id: {list.id}
                                            </ListItem>
                                            <ListItem>
                                                List title: {list.title}
                                            </ListItem>

                                            <ListItem>
                                                {list.shoppingList.map(item =>

                                                    <div>
                                                        <ListItem>
                                                            Item id: {item.id}
                                                        </ListItem>
                                                        <ListItem>
                                                            Item title: {item.title}
                                                        </ListItem>
                                                        <ListItem>
                                                            Item type: {item.type}
                                                        </ListItem>
                                                        <ListItem>
                                                            Item Catagory: {item.catagory}
                                                        </ListItem>
                                                        <ListItem>
                                                            Item Store: {item.store}
                                                        </ListItem>
                                                    </div>
                                                )}
                                            </ListItem>
                                        </div>
                                    )} */}
                                </ListItem>
                            </div>
                        ))}
                </List>
            </Grid>
        </Grid>
    );
};

export default ShowHomesShoppingLists;
