import React from "react";
import { View, Modal } from "react-native";
import { withNavigation } from "react-navigation";
import { AntDesign } from "@expo/vector-icons";
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
    <Modal animationType="fade" visible={true}>
      <View style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>
        <AntDesign
          name="closecircle"
          size={25}
          color="#fff"
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            zIndex: 99,
            backgroundColor: "#707070",
            borderRadius: 14,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5
          }}
          onPress={() => navigation.goBack()}
        />
        <ProfileContainer workpass={workpass} isPreview={true} />
      </View>
    </Modal>
  );
};

export default withNavigation(ProfilePreviewPage);
