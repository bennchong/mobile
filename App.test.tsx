import React from "react";
import renderer from "react-test-renderer";

import App from "./App";
import SettingsTab from './src/navigation/screens/SettingsTab';

// Test cases shouldn't include snapshotting the whole app 
// describe("<App />", () => {
//   it("should render without crashing", () => {
//     const tree = renderer.create(<App />).toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

describe("<SettingsTab />", () => {
  it("should render without crashing", () => {
    const tree = renderer.create(<SettingsTab />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
