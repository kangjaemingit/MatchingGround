import React, { Component } from "react";
import MainHeader from "./MainHeader/MainHeader";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MainScreen_Myinfo from "./MainScreen_Myinfo";
import MainScreen_Teaminfo from "./MainScreen_Teaminfo";

export default class MainScreen extends Component {
  render() {
    return (
      <div>
        <MainHeader />
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="md" style={{marginTop:30}}>
            <Typography
              component="div"
              style={{
                backgroundColor: "#F3F3F3",
                height: "100vh",
              }}
            >
              <Grid container spacing={6}>
                <Grid item xs>
                    <MainScreen_Myinfo/>    
                </Grid>
                <Grid item xs>
                    <MainScreen_Teaminfo/>
                </Grid>
              </Grid>

              
            </Typography>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}
