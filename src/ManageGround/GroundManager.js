import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import { CssBaseline, Typography, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@material-ui/core";
import { minWidth } from "@material-ui/system";
import {LocalParking, Bathtub} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 10,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    maxHeight: 512,
  },
  table: {
    marginTop: 10,
    maxwidth: "auto",
  },
});


function GroundManager({history}) {
  const [groundinfo, setgroundinfo] = useState({
    ground_name: "",
    address: "",
    ground_count: "",
    price: "",
    manager_id : window.sessionStorage.getItem('id'),
    photo : "",
    parking_lot : "",
    shower_room : "",
    foot_rent : "",
    wifi : "",
    ball_rent : "",
    uniform_rent : "",
  });


  function getgroundinfo(){
    fetch("http://localhost:3001/ground/info/manager", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(groundinfo),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setgroundinfo({
          ground_name: json[0].ground_name,
          address: json[0].address,
          ground_count: json[0].ground_count,
          price: json[0].price,
          manager_id: groundinfo.manager_id,
          photo : json[0].photo,
          parking_lot : json[0].parking_lot,
          shower_room : json[0].shower_room,
          foot_rent : json[0].foot_rent,
          wifi : json[0].wifi,
          ball_rent : json[0].ball_rent,
          uniform_rent : json[0].uniform_rent,
        });
        
      });
  };

  function createData(category, contents) {
    return { category, contents };
  }

  const rows = [
    createData("경기장이름", groundinfo.ground_name),
    createData("경기장주소", groundinfo.address),
    createData("구장 수", groundinfo.ground_count + " 개"),
    createData("가격", groundinfo.price + " 원"),
  ];

  function link_reservation(){
    history.push({
      pathname:"/groundmanager/managereservation",
      state:{
        groundinfo:groundinfo,
      },
    });
  }

   useEffect(() => {
     getgroundinfo();
   }, []);


  const classes = useStyles();

  return (
    <React.Fragment>
      <MainLogo />
      <CssBaseline />
      <Container maxWidth="md" style={{backgroundColor : "#F3F3F3"}}>
        <Typography
          component="div"
          style={{ height: "100vh" }}
        >
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography component="h4" variant="h4" style={{textAlign:"center", marginTop:"20px"}}>
                {groundinfo.ground_name} 경기장
              </Typography>
            </Grid>  
            
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <img src={groundinfo.photo} height="300px"></img>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Typography component="h6" variant="h6">경기장 정보</Typography>
              <Table className={classes.table} aria-label="simple table">
                
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.category}>
                      <TableCell component="th" scope="row">
                        {row.category}
                      </TableCell>
                      <TableCell align="center">{row.contents}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={6}>
              <Typography component="h6" variant="h6" >편의 시설</Typography>
              {groundinfo.parking_lot === "true" ? <LocalParking style={{ fontSize: 80, margin:25}}/> : null}
              {groundinfo.shower_room === "true" ? <LocalParking style={{ fontSize: 80, margin:25}}/> : null}
              {groundinfo.foot_rent === "true" ? <LocalParking style={{ fontSize: 80, margin:25}}/> : null}
              {groundinfo.wifi === "true" ? <LocalParking style={{ fontSize: 80, margin:25}}/> : null}
              {groundinfo.ball_rent === "true" ? <LocalParking style={{ fontSize: 80, margin:25}}/> : null}
              {groundinfo.uniform_rent === "true" ? <LocalParking style={{ fontSize: 80, margin:25}}/> : null}
            </Grid>

            <Grid item xs={3}/>
            <Grid item xs={3} style={{marginTop:20}}>
              <Link to="/groundmanager/modify">
                <Button variant="outlined" color="primary" style={{ width: "100%" }}>경기장 정보 수정</Button>
              </Link>
            </Grid>
            <Grid item xs={3} style={{marginTop:20}}>
                <Button onClick={link_reservation} variant="outlined" color="primary" style={{ width: "100%" }}>경기장 예약 관리</Button>
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(GroundManager);