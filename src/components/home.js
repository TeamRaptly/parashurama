import React from 'react';
import helpers from '../helpers';

const Home = (props) => {
  return <p>Home Page - {props.t('welcome')}</p>;
};

export default helpers(['c', 't'])(Home);
