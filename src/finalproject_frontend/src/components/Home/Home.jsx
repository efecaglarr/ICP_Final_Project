import React from "react";

import useStyles from "./styles";

import {
  Container,
  Grow,
  Grid,
} from "@material-ui/core";

import Pets from "../Pets/Pets";
import Form from "../Form/Form";
import Essentials from "../Essential/Essential";
import { Divider, Typography } from "@mui/material";

const Home = ({currentId, setCurrentId}) => {
  
  const classes = useStyles();

  return (
    <Container>
      <Grow in>
        <Container style={{backgroundColor: '#FEF9F5'}}>
        {/* <Typography variant="h6" sx={{ml:1, mt:2, fontFamily:'sans-serif', fontWeight:'bold'}}>
          Pet Essentials
        </Typography>
        <Divider sx={{m:1}} />
        <Essentials /> */}
        <Typography variant="h6" sx={{ml:1, mt:2, fontFamily:'sans-serif', fontWeight:'bold'}}>
          Adopt Me!
        </Typography>
        <Divider sx={{m:1}} />
          <Grid
            className={classes.gridContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
          <Grid className={classes.gridPosts} item xs={12} /* take 12 spaces on mobile */ sm={6} md={9}>
              <Pets setCurrentId={setCurrentId}/>
          </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Form 
              currentId={currentId}
              setCurrentId={setCurrentId}
              />
            </Grid>
          </Grid>
        </Container>
      </Grow>

      
    </Container>
  );
};

export default Home;
