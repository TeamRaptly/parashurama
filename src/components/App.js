import React from 'react';
// import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
// import Home from './components/home';
// import About from './components/about';
import { connect } from 'react-redux';
import { changeLanguage } from '../actions/app-action-creators';
import { getFacts } from '../reducers/facts';

const mapStateToProps = (state) => ({
  facts: getFacts(state)
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  //Just used for debugging language changer
  handleClick = (e) => {
    e.preventDefault();
    this.props.changeLanguage('kn');
  };

  render() {
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
        <div onClick={this.handleClick}>Language changer</div>
        <Link to="/about">About</Link>
      </>
    );
  }
}

export default connect(mapStateToProps, { changeLanguage })(App);
