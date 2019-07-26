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
  const workpass = navigation.getParam("workpass");

  return (
    <View style={{ flex: 1 }}>
      <ProfileContainer
        workpass={workpass}
        navigation={navigation}
        isPreview={true}
      />
    </View>
  );
};

export default withNavigation(ProfilePreviewPage);
