import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { withRouter } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Modal,
} from "@material-ui/core";
import TeamMember from "./TeamMember";
import TeamModal from "./TeamModal";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 36,
    textAlign: "center",
  },
  photo: {
    height: 256,
    width: 256,
    alignItems: "center",
  },
  data: {
    fontSize: 20,
  },
  title_introduce: {
    textAlign: "center",
    fontSize: 28,
  },
  introduce: {
    fontSize: 20,
  },
  table: {
    minWidth: 650,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1500,
  height: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TeamLoad({ history }) {
  const classes = useStyles();

  const [teaminfo, setteaminfo] = useState({
    team_name: window.sessionStorage.getItem("team_name"),
    team_image: "",
    team_count: "",
    win: "",
    lose: "",
    team_date: "",
    team_class: "",
    team_introduce: "",
    activity_area: "",
    team_manage_name: "",
    team_age: "",
    user_name: "",
    user_email: window.sessionStorage.getItem("id"),
  });

  const getTeamdata = () => {
    fetch("http://localhost:3001/team/teaminfo", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(teaminfo),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setteaminfo({
          team_name: teaminfo.team_name,
          team_image: json[0].team_image,
          team_count: json[0].team_count,
          win: json[0].win,
          lose: json[0].lose,
          team_date: json[0].team_date,
          team_class: json[0].team_class,
          team_introduce: json[0].team_introduce,
          activity_area: json[0].activity_area,
          team_manage_name: json[0].team_manage_name,
          team_age: json[0].team_age,
          user_name: json[0].user_name,
          user_email: teaminfo.user_email,
        });
        console.log(json);
      });
  };

  //클럽정보 관리 버튼
  function Club_Modify() {
    history.push({
      pathname: "/team/modify",
      state: {
        teaminfo: teaminfo,
      },
    });
  }

  //클럽원 관리 버튼
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function Member_Modify() {}

  //탈퇴하기 버튼
  const [info, setinfo] = useState({
    team_name: "",
    user_email: window.sessionStorage.getItem("id"),
  });

  const quit = () => {
    if (window.sessionStorage.getItem("team_manager") === "1") {
      alert("클럽장권한을 가지고 있습니다. 탈퇴가 불가능합니다.");
    } else {
      fetch("http://localhost:3001/team/delete", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((json) => {
          setinfo({
            team_name: "none",
            user_email: info.user_email,
          });
          window.sessionStorage.setItem("team_manager", "0");
          window.sessionStorage.setItem("team_name", "none");
          alert("클럽 탈퇴가 완료되었습니다.");
          history.push("/team");
        });
    }
  };

  function createData(name, content) {
    return { name, content };
  }

  const rows = [
    createData("클럽명 ", teaminfo.team_name),
    createData("클럽장 ", teaminfo.user_name),
    createData("클럽 생성일 ", teaminfo.team_date),
    createData("활동지역 ", teaminfo.activity_area),
    createData("클럽 수준 ", teaminfo.team_class),
    createData("클럽 연령대 ", teaminfo.team_age),
    createData("최근전적 ", teaminfo.win + "승 " + teaminfo.lose + "패"),
  ];

  
  useEffect(() => {
    getTeamdata();
  }, []);

  return (
    <React.Fragment>
      <Container
        maxWidth="md"
        style={{ backgroundColor: "white", height: "100%" }}
      >
        <Typography component="div" style={{ height: "100vh", paddingTop: 20 }}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={6}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar src={teaminfo.team_image} className={classes.photo} />
            </Grid>
            <Grid item xs={6}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.content}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>

            <Grid item xs={12}>
              <Typography component="div" variant="h5">
                클럽소개
              </Typography>
              <TextField
                multiline
                fullWidth
                rows={4}
                defaultValue={teaminfo.team_introduce}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="div" variant="h5">
                클럽원 명단
              </Typography>
              <TeamMember />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item xs={2}>
                {window.sessionStorage.getItem("id") ===
                teaminfo.team_manage_name ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={handleOpen}
                  >
                    클럽원 관리
                  </Button>
                ) : null}
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <TeamModal/>
                  </Box>
                </Modal>
              </Grid>
              <Grid item xs={2}>
                {window.sessionStorage.getItem("id") ===
                teaminfo.team_manage_name ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={Club_Modify}
                  >
                    클럽정보 수정
                  </Button>
                ) : null}
              </Grid>
              <Grid>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={quit}
                >
                  탈퇴하기
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} />
          </Grid>
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(TeamLoad);
