import React from "react";
import renderer from "react-test-renderer";
import { SettingsTab } from "./src/navigation/tabs/Settings";
import { createAppContainer } from "react-navigation";

describe("<SettingsTab />", () => {
  it("should render without crashing", () => {
    let WrappedSettings = createAppContainer(SettingsTab);
    const tree = renderer.create(<WrappedSettings />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
