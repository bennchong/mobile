import React from 'react';

const StateContext = React.createContext<AppStateContext>(null);

interface AppStateContext {
  test: boolean,
  changeTestState: () => {},
}

export default StateContext;