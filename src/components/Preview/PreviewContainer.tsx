import React from "react";
import { View, Modal, SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProfilePage } from "../Profile/ProfilePage/ProfilePage";
import { styles } from "./PreviewContainerStyles";
import { white } from "../../themeColors";
import { profileTypeEnum } from "../Profile/profileTypeEnum";

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
  const goBack = () => navigation.goBack();

  return (
    <Modal animationType="fade" visible={true}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {workpassType === profileTypeEnum.SHARED && (
            <MaterialCommunityIcons
              name="close-circle"
              size={30}
              color={white}
              style={styles.closeIcon}
              onPress={goBack}
            />
          )}
          <ProfilePage
            workpass={workpass}
            workpassType={workpassType}
            profileSelected={0}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};
