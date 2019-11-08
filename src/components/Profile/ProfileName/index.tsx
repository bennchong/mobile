import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SharePageContainer } from "../../SharePage";
import { styles } from "./ProfileNameStyles";
import { verificationStatusEnum } from "../../../services/verificationService/verificationService";
import { midGrey } from "../../../themeColors";
import { ShowTampered } from "./ShowTampered";
import { profileTypeEnum } from "../profileTypeEnum";

interface ProfileNameProps {
  status: number;
  photo: string;
  fin: string;
  name: string;
  workpassType: any;
  profileSelected: number;
}

export const ProfileName = ({
  status,
  photo,
  fin,
  name,
  workpassType,
  profileSelected
}: ProfileNameProps) => {
  const [isDialogVisible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!isDialogVisible);
  };

  return (
    <View style={styles.textContainer}>
      <ShowTampered status={status} fin={fin} name={name} />
      {workpassType === profileTypeEnum.STORED &&
      status === verificationStatusEnum.VALID ? (
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
