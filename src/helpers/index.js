import React from 'react';
import PropTypes from 'prop-types';
import { contextTypes as helpersContextTypes } from '../utils/create-context';

export const helperNames = ['c', 't', 'f'];

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function addHelpers(requestedHelpers = []) {
  return function (ComposedComponent) {
    class Helpers extends React.Component {
      static contextTypes = {
        helpers: PropTypes.shape(helpersContextTypes).isRequired
      };

      constructor(props, context) {
        super(props, context);
        const contextHelpers = this.context.helpers;
        const boundSelectedHelpers = {};

        for (var requestedHelperName of requestedHelpers) {
          if (typeof contextHelpers[requestedHelperName] === 'undefined') {
            throw new Error(
              `Requested helper ${requestedHelperName} could not be found. Please ensure all spelling is correct.`
            );
          }

          boundSelectedHelpers[requestedHelperName] = contextHelpers[
            requestedHelperName
          ].bind(contextHelpers);
        }

        this.bindedSelectedHelpers = boundSelectedHelpers;
      }

      render() {
        return (
          <ComposedComponent
            {...Object.assign({}, this.props, this.bindedSelectedHelpers)}
          />
        );
      }
    }

    Helpers.displayName = `Helpers(${getDisplayName(ComposedComponent)})`;
    Helpers.WrappedComponent = ComposedComponent;

    return Helpers;
  };
}

export default function helpers(optionsOrComponent = []) {
  if (
    optionsOrComponent.prototype instanceof React.Component ||
    optionsOrComponent.length === 0
  ) {
    throw new Error(
      `Helpers decorator implementation changed: @helpers(['nameOfTheHelperYourCompnentWantsToUse']) Update in ${getDisplayName(
        optionsOrComponent
      )}`
    );
  }

  return addHelpers(optionsOrComponent);
}
