import React from "react"
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const styles = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: 'pink',
                    paddingBottom: '10px',
                    paddingTop: '10px'
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: ''
                }
            }
        }
    },
});
const Item = (props) => {
    return (
        <>
            <ThemeProvider theme={styles}>
                <Container>
                    <Card>
                        <CardContent>
                            <Typography variant="h4">{props.title} </Typography>
                            <Typography variant="body2">Type: {props.type}</Typography>
                            <Typography variant="body2">Catagory: {props.catagory}</Typography>
                            <Typography variant="body2">Store: {props.store}</Typography>
                            <Typography variant="body2">Quantity: {props.quantity}</Typography>
                        </CardContent>
                    </Card>
                </Container>
            </ThemeProvider>

        </>
    )
}
export default Item;