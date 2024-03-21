import React from 'react';
import { Grid, Card, Typography, Link, IconButton } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import YardIcon from '@mui/icons-material/Yard';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import useStyles from './styles';
import { Container } from '@material-ui/core';

const iconComponents = {
  PetsIcon: PetsIcon,
  SmartToyIcon: SmartToyIcon,
  YardIcon: YardIcon,
  ScatterPlotIcon: ScatterPlotIcon
};

const pages = [
  { title: 'Treats under $5', description: 'Big savings on little rewards', link: '#', component: 'PetsIcon' },
  { title: 'Toys under $5', description: 'Pounce on playtime savings', link: '#' ,component: 'SmartToyIcon' },
  { title: 'Wet food under $5', description: 'Add nutrition & flavor or less', link: '#',component: 'YardIcon' },
  { title: 'Food starting at $10', description: 'Complete & balanced nutrition priced right', link: '#' ,component: 'ScatterPlotIcon'},
];

function Essentials() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        {pages.map((page, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card style={{backgroundColor: '#E7EDF3'}} className={classes.card}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '50%', width: 'auto', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <IconButton className={classes.iconButton}>
                    {React.createElement(iconComponents[page.component])}
                  </IconButton>
                </div>
                <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 2, fontWeight: 'bold', fontSize:'1rem' }}>
                  {page.title}
                </Typography>
              </div>
              <Typography variant="body1" color="textSecondary" paragraph>
                {page.description}
              </Typography>
              <Link href={page.link} underline="hover" color="primary" sx={{fontSize:'0.875rem'}}>
                Learn more
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Essentials;
