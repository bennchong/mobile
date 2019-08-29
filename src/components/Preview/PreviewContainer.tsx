import React from "react";
import { View, Modal, SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProfileContainer } from "../Profile/ProfileContainer";
import { styles } from "./PreviewContainerStyles";
import { white } from "../../themeColors";

interface PreviewContainerProps {
  navigation: any;
  workpass: any;
}

export const PreviewContainer = ({
  navigation,
  workpass
}: PreviewContainerProps) => {
  const goBack = () => navigation.goBack();

  return (
    <Modal animationType="fade" visible={true}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="close-circle"
            size={30}
            color={white}
            style={styles.closeIcon}
            onPress={goBack}
          />
          <ProfileContainer workpass={workpass} isPreview={true} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};
