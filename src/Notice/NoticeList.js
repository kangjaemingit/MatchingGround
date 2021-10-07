import React, { Component, useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ControlledAccordions() {
  const [expanded, setExpanded] = useState(false);
  const [getnotice, setgetnotice] = useState({
    list : '',
  })

  const handleChange = (panel) => (event, isExpanded) => {
    if(!expanded){
      setExpanded(panel);
    }else{
      setExpanded(false);
    }
  };

  const deletnotice = (data_id) => {
    fetch("http://localhost:3001/notice/delete", {
      method: "post", //통신방법
      headers: {
          "content-type": "application/json",
      },
      body: JSON.stringify({id : data_id}),
  })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.msg);
        window.location.replace('/notice');
      });
  }

  const noticegetlist = () => {
    fetch("http://localhost:3001/notice/list", {
          method: "post", //통신방법
          headers: {
              "content-type": "application/json",
          },
          body: JSON.stringify(),
      })
          .then((res) => res.json())
          .then((res) => {
            setgetnotice({
              list : res.map((data) => 
              <Accordion key={data._id} expanded={expanded === data._id} onChange={handleChange(data._id)} style={{margin:5, width:"100%"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '80%', flexShrink: 0 }} style={{fontSize:18}}>
                  {data.title}
                </Typography>        
                <Typography sx={{ color: 'text.secondary' }}>{data.author}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {data.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
            )
            })
          });
  }

  useEffect(() => {
    noticegetlist();
},[expanded])

  return (
    <div>
      <Grid
        container
        justifyContent="center"
      >
        {getnotice.list} 
      </Grid>
    </div>
  );
}