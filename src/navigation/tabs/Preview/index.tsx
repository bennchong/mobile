import React from "react";
import { withNavigation } from "react-navigation";
// eslint-disable-next-line no-unused-vars
import { Navigation } from "../../types";
import { PreviewContainer } from "../../../components/Preview/PreviewContainer";

interface ProfilePreviewPageProps {
  navigation: Navigation;
}

const ProfilePreviewPage = (props: ProfilePreviewPageProps) => {
  const { navigation } = props;
  const workpass = navigation.getParam("workpass");

  return <PreviewContainer navigation={navigation} workpass={workpass} />;
};

export default withNavigation(ProfilePreviewPage);
