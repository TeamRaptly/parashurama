import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import helpers from '../../helpers';
import { withRouter } from 'react-router';
import styled from 'styled-components';

const FeaturesContainer = styled.div`
  margin-bottom: 12px;
  color: red;
`;

const FeaturesListItem = styled.li`
  margin: 12px;
`;

const FeaturesLink = styled(Link)`
  margin: 12px;
`;

class Features extends React.Component {
  handleFeatureClick = (e, f) => {
    e.preventDefault();
    this.props.history.push(
      `${this.props.location.pathname}?${f.queryString}=${!f.current}`
    );
    window.location.reload();
  };

  render() {
    const featureState = [];
    const featureDefinitions = this.props.featuresDefinitions();

    for (const [featureName, featureProps] of featureDefinitions) {
      featureState.push({
        current: this.props.f(featureName),
        default: this.props.c(featureName),
        description: featureProps.description,
        name: featureProps.name,
        queryString: featureProps.queryString
      });
    }

    return (
      <>
        <Helmet>
          <title>Features page</title>
        </Helmet>
        <FeaturesContainer>
          <h1>Features Page</h1>
          <Link to="/">Back to Home</Link>

          <ul>
            {featureState.map((f) => (
              <FeaturesListItem key={f.name}>
                <h2>{f.name}</h2>
                <p>{f.description}</p>
                <FeaturesLink
                  to={`${this.props.location.pathname}?${
                    f.queryString
                  }=${!f.current}`}
                  onClick={(e) => this.handleFeatureClick(e, f)}
                >
                  {f.current ? 'Turn off' : 'Turn on'}
                </FeaturesLink>
                <span>{` (Default: ${f.default ? 'on' : 'off'})`}</span>
              </FeaturesListItem>
            ))}
          </ul>
        </FeaturesContainer>
      </>
    );
  }
}

export default helpers(['c', 'f', 'featuresDefinitions'])(withRouter(Features));
