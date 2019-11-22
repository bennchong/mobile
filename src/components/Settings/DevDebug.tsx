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
  const [{ profilesArray }] = useStateValue();

  let shownWorkpass;
  if (profilesArray[0].workpass === null) {
    shownWorkpass = "Workpass is null";
  } else {
    const cleanWorkpass = getData(profilesArray[0].workpass);
    shownWorkpass = cleanWorkpass.recipient.name;
  }

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
      <DevAppStateText>Main workpass name: {shownWorkpass}</DevAppStateText>
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
