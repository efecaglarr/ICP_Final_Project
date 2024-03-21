import React, { useState, useEffect } from "react";
import Pet from './Pet/Pet';
import useStyles from './styles'
import { finalproject_backend } from "declarations/finalproject_backend";

import { Grid } from "@material-ui/core";

const Pets = ({setCurrentId}) =>  {
  const classes = useStyles();
  
  const [petPosts, setPetPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await finalproject_backend.getPetPosts();
        setPetPosts(posts);
      } catch (error) {
        console.error('Error fetching pet posts:', error);
      }
    };

    fetchData();
  }, [petPosts]);

  return (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {petPosts.map((post) => (
        <Grid key={post.id} item xs={12} sm={12} md={6} lg={6}>
          <Pet post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Pets;
