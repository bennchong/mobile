import React from 'react';

const StateContext = React.createContext<AppStateContext>({test: false, changeTestState: () => {} });

interface AppStateContext {
  test: boolean,
  changeTestState: () => {},
}

export default StateContext;