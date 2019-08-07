import React from "react";
import { View, Modal, SafeAreaView } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProfileContainer } from "../profile/ProfileContainer";
import { styles } from "./previewContainerStyles";

export const PreviewContainer = ({ navigation, workpass }) => {
  const goBack = () => navigation.goBack();

  return (
    <Modal animationType="fade" visible={true}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="close-circle"
            size={30}
            color="#fff"
            style={styles.closeIcon}
            onPress={goBack}
          />
          <ProfileContainer workpass={workpass} isPreview={true} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

PreviewContainer.propTypes = {
  navigation: PropTypes.any,
  workpass: PropTypes.object
};
