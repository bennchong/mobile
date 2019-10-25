import React from "react";
import { ScrollView, Button, Text, View } from "react-native";
import { withNavigation } from "react-navigation";
import Constants from "expo-constants";
import { getData } from "@govtechsg/open-attestation";
import { DevDeleteWorkpasses } from "./DevDebugSection/DevDeleteWorkpass";
import { DevStoreWorkPass } from "./DevDebugSection/DevStoreWorkPass";
import { DevStoreDPWorkPassArray } from "./DevDebugSection/DevStoreDPWorkPassArray";
import { useStateValue } from "../../state";
import { DevAppStateText } from "./DevDebugSection/DevAppStateText";
import { VERSION } from "../../config";

interface IDevDebugProps {
  navigation: any;
}

const DevDebug = (props: IDevDebugProps) => {
  const goBack = () => props.navigation.goBack();
  const [
    {
      workpass,
      dpWorkpassArray,
      workpassAcceptedBooleanArray,
      numberOfProfiles,
      profilesArray
    }
  ] = useStateValue();

  let shownWorkpass;
  if (workpass === null) {
    shownWorkpass = "Workpass is null";
  } else {
    const cleanWorkpass = getData(workpass);
    shownWorkpass = cleanWorkpass.recipient.name;
  }
  const dpArrayNames = [];
  dpWorkpassArray.forEach(dp => {
    const cleanDP = getData(dp);
    dpArrayNames.push(cleanDP.recipient.name);
  });

  // eslint-disable-next-line no-unused-vars
  // Only call this when you have to reset the entire file-system
  // const clearAppMemory = () => {
  //   deleteStoredTimeAccepted();
  //   deleteStoredTimeVerified();
  //   deleteStoredDPWorkpass();
  //   deleteStoredWorkpass();
  // };

  return (
    <ScrollView
      contentContainerStyle={{ marginTop: Constants.statusBarHeight }}
    >
      <View style={{ padding: 20 }}>
        <Text>Version: {JSON.stringify(VERSION.revisionId)}</Text>
        <Text> {JSON.stringify(VERSION.publishedTime)} </Text>
      </View>
      <DevStoreWorkPass />
      <DevStoreDPWorkPassArray />
      <DevDeleteWorkpasses />
      <DevAppStateText>Workpass name: {shownWorkpass}</DevAppStateText>
      <DevAppStateText>
        dpWorkpassArrays names: {JSON.stringify(dpArrayNames)}
      </DevAppStateText>
      <DevAppStateText>Number of profiles: {numberOfProfiles}</DevAppStateText>
      <DevAppStateText>
        workpassAcceptedBooleanArray:{" "}
        {JSON.stringify(workpassAcceptedBooleanArray)}
      </DevAppStateText>
      <DevAppStateText>
        profilesArray Length: {profilesArray.length}
      </DevAppStateText>
      <DevAppStateText>
        profilesArray: {JSON.stringify(profilesArray)}
      </DevAppStateText>
      <Button title="Go Back to Settings Page" onPress={goBack} />
    </ScrollView>
  );
};

export default withNavigation(DevDebug);
