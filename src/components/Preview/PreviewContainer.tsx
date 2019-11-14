import React from "react";
import { View, Modal, SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProfileContainer } from "../Profile/ProfileContainer";
import { styles } from "./PreviewContainerStyles";
import { white } from "../../themeColors";

interface PreviewContainerProps {
  navigation: any;
  workpass: any;
  workpassType: any;
}

export const PreviewContainer = ({
  navigation,
  workpass,
  workpassType
}: PreviewContainerProps) => {
  return (
    <Modal animationType="fade" visible={true}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ProfileContainer
            workpass={workpass}
            workpassType={workpassType}
            profileSelected={0}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};
