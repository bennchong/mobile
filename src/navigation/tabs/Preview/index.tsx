import { View } from "react-native";
import { withNavigation } from "react-navigation";
import React from "react";
// eslint-disable-next-line no-unused-vars
import { Navigation } from "../../types";
import { ProfileContainer } from "../../../components/profile/ProfileContainer";

interface ProfilePreviewPageProps {
  navigation: Navigation;
}

const ProfilePreviewPage = (props: ProfilePreviewPageProps) => {
  const { navigation } = props;
  const certificate = navigation.getParam("certificate");

  return (
    <View style={{ flex: 1 }}>
      <ProfileContainer
        certificate={certificate}
        navigation={navigation}
        isPreview={true}
      />
    </View>
  );
};

export default withNavigation(ProfilePreviewPage);
