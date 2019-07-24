import React from "react";
import renderer from "react-test-renderer";

import { SettingsTab } from "./src/navigation/tabs/Settings";

describe("<SettingsTab />", () => {
  it("should render without crashing", () => {
    const tree = renderer.create(<SettingsTab />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
