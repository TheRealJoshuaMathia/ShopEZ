import React from "react"
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";

const Item = (props) => {
    return (
        <>
            <Container>

                <Card>
                    [// Test card just the the purpose of seeing the data populated on the front end]
                    <Typography variant="h3"> {props.title} </Typography>
                    <Typography variant="h4">{props.type}</Typography>
                    <Typography variant="h4">{props.catagory}</Typography>
                    <Typography variant="h5">{props.store}</Typography>
                    <Typography variant="h5">{props.quantity}</Typography>
                </Card>
            </Container>
        </>
    )
}
export default Item;