import React from 'react';
import { renderRoutes } from 'react-router-config';
import { createGlobalStyle } from 'styled-components';

const DefaultLayoutGlobalStyle = createGlobalStyle`
  body {
  background-color: #c6e0f8;
  font-family: Roboto, Arial, sans-serif;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 40px;
}

ul {
  padding: 0;
  margin: 0;
}

ul li {
  font-size: 18px;
  list-style-type: none;
  height: 48px;
  width: 100%;
  color: rgba(0, 0, 0, 0.63);
  border-bottom: 1px dashed rgba(0, 0, 0, 0.42);
  display: flex;
  align-items: center;
}
`;

export default function DefaultLayout(props) {
  return (
    <>
      <DefaultLayoutGlobalStyle />
      <h1>Header</h1>
      {renderRoutes(props.route.routes)}
      <h1>Footer</h1>
    </>
  );
}
