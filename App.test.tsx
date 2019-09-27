import React from "react";
import { render } from "react-native-testing-library";
import { createAppContainer } from "react-navigation";
import { SettingsTab } from "./src/navigation/tabs/Settings";
import { CameraTab } from "./src/navigation/tabs/Camera";
import { ProfileTab } from "./src/navigation/tabs/Profile";
import { StateProvider } from "./src/state";

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

const initialState = {
  workpass: null,
  dpWorkpassArray: [],
  workpassAcceptedBooleanArray: [],
  timeAcceptedArray: [],
  timeVerifiedArray: [],
  numberOfProfiles: 0,
  sessionValidatedArray: []
};

const oneProfileState = {
  workpass,
  dpWorkpassArray: [],
  workpassAcceptedBooleanArray: [false],
  timeAcceptedArray: [""],
  timeVerifiedArray: [""],
  numberOfProfiles: 1,
  sessionValidatedArray: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_WORKPASS":
      return { ...state, workpass: action.workpass };
    case "UPDATE_DP_WORKPASS_ARRAY":
      return { ...state, dpWorkpassArray: action.dpWorkpassArray };
    case "SET_WORKPASS_ACCEPTED":
      return {
        ...state,
        workpassAcceptedBooleanArray: action.workpassAcceptedBooleanArray
      };
    case "SET_WORKPASS_TIME_ACCEPTED_ARRAY":
      return { ...state, timeAcceptedArray: action.timeAcceptedArray };
    case "SET_WORKPASS_TIME_VERIFIED_ARRAY":
      return { ...state, timeVerifiedArray: action.timeVerifiedArray };
    case "SET_NUMBER_PROFILES":
      return { ...state, numberOfProfiles: action.numberOfProfiles };
    case "NUMBER_PROFILES_PLUS_ONE":
      return { ...state, numberOfProfiles: state.numberOfProfiles + 1 };
    case "NUMBER_PROFILES_MINUS_ONE":
      return { ...state, numberOfProfiles: state.numberOfProfiles - 1 };
    case "DELETE_WORKPASS":
      return { ...action.resetState };
    default:
      return state;
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
  it("Without Profile", () => {
    const tree = render(
      <StateProvider initialState={initialState} reducer={reducer}>
        <ProfileTab />
      </StateProvider>
    );
    expect(tree).toMatchSnapshot();
  });
  it("With Profile haven't confirmed", () => {
    const tree = render(
      <StateProvider initialState={oneProfileState} reducer={reducer}>
        <ProfileTab />
      </StateProvider>
    );
    expect(tree).toMatchSnapshot();
  });
  it("With Profile have confirmed", () => {
    const tree = render(
      <StateProvider
        initialState={{
          ...oneProfileState,
          workpassAcceptedBooleanArray: [true]
        }}
        reducer={reducer}
      >
        <ProfileTab />
      </StateProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});
