import React from "react";
import { render } from "react-native-testing-library";
import { createAppContainer } from "react-navigation";
import { SettingsTab } from "./src/navigation/tabs/Settings";
import { CameraTab } from "./src/navigation/tabs/Camera";
import { ProfileTab } from "./src/navigation/tabs/Profile";
import { StateProvider } from "./src/state";
import { initialState } from "./src/state/initialState";
import { reducer } from "./src/state/reducer";
import { verificationStatusEnum } from "./src/services/verificationService/verificationService";

// Workpass Imports
const workpass = require("./src/test/fixtures/validCert.json");

// Temporary hides the error, look into: https://github.com/facebook/react/issues/14769#issuecomment-462528230
// eslint-disable-next-line no-console
const originalConsoleError = console.error;
// eslint-disable-next-line no-console
console.error = (...args) => {
  if (
    !args[0].startsWith(
      "Warning: An update to %s inside a test was not wrapped in act(...)."
    )
  ) {
    originalConsoleError(...args);
  }
};

describe("<SettingsTab />", () => {
  it("should render without crashing", () => {
    const SettingsTabContainer = createAppContainer(SettingsTab);
    const tree = render(<SettingsTabContainer />);
    expect(tree).toMatchSnapshot();
  });
});

describe("<CameraTab />", () => {
  it("should render without crashing", () => {
    const CameraTabContainer = createAppContainer(CameraTab);
    const tree = render(<CameraTabContainer />);
    expect(tree).toMatchSnapshot();
  });
});

describe("<ProfileTab />", () => {
  const profileObjectInit = {
    workpass,
    timeAccepted: null,
    timeLastVerified: null,
    validityStatus: verificationStatusEnum.VALIDATING
  };

  const oneProfileState = {
    tempProfile: null,
    profilesArray: [Object.assign({}, profileObjectInit)] // To deep clone profileObject, index 0 reserved for main pass
  };

  const twoProfileState = {
    tempProfile: null,
    profilesArray: [
      Object.assign({}, profileObjectInit),
      Object.assign({}, profileObjectInit)
    ]
  };

  it("Without Profile", () => {
    const tree = render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <ProfileTab />
      </StateProvider>
    );
    expect(tree).toMatchSnapshot();
  });
  it("With One Profile", () => {
    const tree = render(
      <StateProvider initialState={oneProfileState} reducer={reducer}>
        <ProfileTab />
      </StateProvider>
    );
    expect(tree).toMatchSnapshot();
  });
  it("With Two Profiles", () => {
    const tree = render(
      <StateProvider initialState={twoProfileState} reducer={reducer}>
        <ProfileTab />
      </StateProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});
