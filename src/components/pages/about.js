import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MapWithSearch from "../map-with-search";

const useStyles = makeStyles({
  aboutpage: {
    display: "flex",
    justifyContent: "center",
  }
});

export default function About() {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.aboutpage}>
        <Typography>
          <Helmet>
            <title>About page</title>
          </Helmet>
          <p>About Page</p>
          <Link to="/">Home</Link>
        </Typography>
      </Container>
      <MapWithSearch search={true} />
    </>
  );
}