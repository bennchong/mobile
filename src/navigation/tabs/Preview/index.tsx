import React from "react";
import { withNavigation } from "react-navigation";
// eslint-disable-next-line no-unused-vars
import { Navigation } from "../../types";
import { PreviewContainer } from "../../../components/Preview/PreviewContainer";
import { useStateValue } from "../../../state";

interface ProfilePreviewPageProps {
  navigation: Navigation;
}

const ProfilePreviewPage = (props: ProfilePreviewPageProps) => {
  const { navigation } = props;
  const [{ tempProfile }] = useStateValue();

  return <PreviewContainer navigation={navigation} workpass={tempProfile} />;
};

export default withNavigation(ProfilePreviewPage);
