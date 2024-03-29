import { Route,withRouter, Link, Switch } from 'react-router-dom';
import Router from './Router/Router'
import React, { Component } from 'react';
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
//import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Gamja_Flower',
    ],
    h1:{
      fontFamily:[
        'Gamja_Flower',
      ],
    },
    h2:{
      fontFamily:[
        'Gamja_Flower',
      ],
    },
    h3:{
      fontFamily:[
        'Jua',
      ],
    },
    h4:{
      fontFamily:[
        'Jua',
      ],
    },
    h5:{
      fontFamily: [
        'Jua',
      ],
    },
    h6:{
      fontFamily: [
        'Jua',
      ]
    },
    subtitle1:{
      fontFamily: [
        'Gamja_Flower',
      ]
    },
    subtitle2:{
      fontFamily: [
        'Gamja_Flower',
      ]
    },
    body1:{
      fontFamily: [
        'Gamja_Flower',
      ]
    },
    body2:{
      fontFamily: [
        'Gamja_Flower',
      ]
    },
    button:{
      fontFamily: [
        'Gamja_Flower',
      ]
    },
    caption:{
      fontFamily: [
        'Gamja_Flower',
      ]
    },
    overline:{
      fontFamily: [
        'Gamja_Flower',
      ]
    },
  },
});

function App() {
   return (
     <div className="App">
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
     </div>
    );
}

export default withRouter(App);
