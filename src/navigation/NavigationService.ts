// NavigationService.js

import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function setParams(params, key) {
  _navigator.dispatch(
    NavigationActions.setParams({
      params: {params},
      key: key,
    })
  );
} 

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  setParams,
};