import { StyleSheet, View, Button } from "react-native";
import { withNavigation } from "react-navigation";
import React from "react";
import { ValidationBar, statusEnum } from "../VerifyingBar";
// import ProfilePreviewSection from "./ProfilePreviewSection";
// eslint-disable-next-line no-unused-vars
import { Navigation } from "../../navigation/types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "stretch"
  }
});

interface ProfilePreviewPageProps {
  navigation: Navigation;
}

const ProfilePreviewPage = (props: ProfilePreviewPageProps) => {
  const { navigation } = props;
  const workpass = navigation.getParam("workpass");

  return (
    <View style={styles.container}>
      <ValidationBar status={statusEnum.VALIDATING}/>
      {/* <ProfilePreviewSection workpass={workpass} navigation={navigation} /> */}
      <Button
              onPress={() => navigation.goBack()}
              title="Go Back to QR Scanner"
      />
    </View>
  );
};

export default withNavigation(ProfilePreviewPage);
