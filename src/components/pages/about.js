import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const About = () => (
  <>
    <Helmet>
      <title>About page</title>
    </Helmet>
    <p>About Page</p>
    <Link to="/">Home</Link>
  </>
);

export default About;
