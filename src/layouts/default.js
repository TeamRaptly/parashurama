import React from 'react';
import { renderRoutes } from 'react-router-config';

export default function DefaultLayout(props) {
  return (
    <>
      <h1>Header</h1>
      {renderRoutes(props.route.routes)}
      <h1>Footer</h1>
    </>
  );
}
