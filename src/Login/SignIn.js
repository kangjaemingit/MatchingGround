import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/backgroundimage/background4.jpg)',
    backgroundSize: 'cover',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: 300,
    height:300,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

async function loginUser(credentials) {
  return fetch('https://www.mecallapi.com/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

 const { naver } = window;


export default function Signin() {
  const classes = useStyles();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  //네이버 로그인 UI
  function NaverLogin() {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "MSl2rw4UPkjlxqHE2_qJ",
      callbackUrl: "http://localhost:3000/login/callback",
      isPopup: false,
      loginButton: {color: "green", type: 3, height:50} ,
      callbackHandle: true
    });
    naverLogin.init();
  }

  useEffect(() => {
    NaverLogin();
  });
  //네이버 로그인 API 요청
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password
    });
    if ('accessToken' in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        localStorage.setItem('accessToken', response['accessToken']);
        localStorage.setItem('user', JSON.stringify(response['user']));
        window.location.href = "/profile";
      });
    } else {
      swal("오류", response.message, "error");
    }
  };

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square style={{ paddingTop:"5%" }}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src="/backgroundimage/logo2.png" />
          <Typography component="h1" variant="h5" style={{ fontFamily:"Dongle-Bold", fontSize:70, marginBottom:25}}>
            매칭그라운드
          </Typography>
            <div id="naverIdLogin" style={{textAlign: "center", marginTop: 20}}></div>
        </div>
      </Grid>
    </Grid>
  );
}

