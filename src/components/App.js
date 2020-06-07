import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeLanguage } from '../actions/app-action-creators';
import { getFacts } from '../reducers/facts';
import { Button } from '@material-ui/core';
import { withStyles, styled as materialStyled } from '@material-ui/core/styles';
import styled from 'styled-components';

const mapStateToProps = (state) => ({
  facts: getFacts(state)
});

//  Use this with `styled` from '@material-ui/core/styles'
// To override any Material UI style and based on style component
// You can use any tag here to override ex: Button
// const MaterialButton = materialStyled(Button)(({ theme }) => ({
//   padding: theme.spacing(1)
// }));

const styles = (theme) => ({
  materialButton: {
    padding: theme.spacing(1)
  }
});

const LinkWrapper = styled('span')`
  margin: 15px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  // TODO: Remove once language changer is implemented
  // Just used for debugging language changer
  handleClick = (e, language) => {
    e.preventDefault();
    this.props.changeLanguage(language);
  };

  render() {
    const { classes = {} } = this.props;
    const facts =
      this.props.facts &&
      this.props.facts.map((fact, i) => {
        if (fact) {
          return <li key={i}>{fact.text}</li>;
        }
      });

    return (
      <>
        <ul>{facts}</ul>
        <Button
          variant="contained"
          color="primary"
          className={classes.materialButton}
          onClick={(e) => this.handleClick(e, 'en')}
        >
          Language changer - English
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.materialButton}
          onClick={(e) => this.handleClick(e, 'kn')}
        >
          Language changer - Kannada
        </Button>
        <Link to="/about">
          <LinkWrapper>About</LinkWrapper>
        </Link>
      </>
    );
  }
}

export default connect(mapStateToProps, { changeLanguage })(
  withStyles(styles)(App)
);
