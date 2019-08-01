import React from "react";
import { View, Modal } from "react-native";
import PropTypes from "prop-types";
import { AntDesign } from "@expo/vector-icons";
import { ProfileContainer } from "../profile/ProfileContainer";
import { styles } from "./previewContainerStyles";

export const PreviewContainer = ({ navigation, workpass }) => {
  const goBack = () => navigation.goBack();

  return (
    <Modal animationType="fade" visible={true}>
      <View style={styles.container}>
        <AntDesign
          name="closecircle"
          size={25}
          color="#fff"
          style={styles.closeIcon}
          onPress={goBack}
        />
        <ProfileContainer workpass={workpass} isPreview={true} />
      </View>
    </Modal>
  );
};

PreviewContainer.propTypes = {
  navigation: PropTypes.any,
  workpass: PropTypes.object
};
