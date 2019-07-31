import React from "react";
import renderer from "react-test-renderer";
import { createAppContainer } from "react-navigation";
import { SettingsTab } from "./src/navigation/tabs/Settings";

describe("<SettingsTab />", () => {
  it("should render without crashing", () => {
    const WrappedSettings = createAppContainer(SettingsTab);
    const tree = renderer.create(<WrappedSettings />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
