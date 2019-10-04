import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SharePageContainer } from "../../SharePage";
import { styles } from "./ProfileNameStyles";
import { useStateValue } from "../../../state";
import { verificationStatusEnum } from "../../../services/verificationService/verificationService";
import { midGrey } from "../../../themeColors";

interface ProfileNameProps {
  status: number;
  photo: string;
  fin: string;
  name: string;
  isPreview: boolean;
  profileSelected: number;
}

export const ProfileName = ({
  status,
  photo,
  fin,
  name,
  isPreview,
  profileSelected
}: ProfileNameProps) => {
  const [isDialogVisible, setVisible] = useState(false);
  const [{ workpassAcceptedBooleanArray }] = useStateValue();

  const toggleVisibility = () => {
    setVisible(!isDialogVisible);
  };

  return (
    <View style={styles.textContainer}>
      {fin ? <Text style={styles.fin}>{fin}</Text> : null}
      <Text style={styles.name}>{name}</Text>
      {!isPreview &&
      status === verificationStatusEnum.VALID &&
      workpassAcceptedBooleanArray[profileSelected] ? (
        <TouchableOpacity
          style={styles.shareContainer}
          onPress={() => setVisible(!isDialogVisible)}
        >
          <AntDesign name="qrcode" size={30} color={midGrey} />
          <Text style={styles.shareText}>SHARE ID</Text>
          <SharePageContainer
            photo={photo}
            name={name}
            isVisible={isDialogVisible}
            handleCancel={toggleVisibility}
            profileSelected={profileSelected}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
