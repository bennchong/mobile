import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SharePageContainer } from "../../../../../SharePage";
import { styles } from "./HeaderInformationStyles";
import { verificationStatusEnum } from "../../../../../../services/verificationService/verificationService";
import { midGrey } from "../../../../../../themeColors";
import { NameFin } from "./NameFin";
import { profileTypeEnum } from "../../../../profileTypeEnum";

interface HeaderInformationProps {
  status: number;
  photo: string;
  fin: string;
  name: string;
  workpassType: any;
  profileSelected: number;
}

export const HeaderInformation = ({
  status,
  photo,
  fin,
  name,
  workpassType,
  profileSelected
}: HeaderInformationProps) => {
  const [isDialogVisible, setVisible] = useState(false);
  const showQrCodeBool =
    workpassType === profileTypeEnum.STORED &&
    status === verificationStatusEnum.VALID;

  return (
    <View style={styles.textContainer}>
      <NameFin status={status} fin={fin} name={name} />
      {showQrCodeBool ? (
        <TouchableOpacity
          style={styles.shareContainer}
          onPress={() => setVisible(true)}
        >
          <AntDesign name="qrcode" size={30} color={midGrey} />
          <Text style={styles.shareText}>SHARE ID</Text>
          <SharePageContainer
            photo={photo}
            name={name}
            isVisible={isDialogVisible}
            setVisible={setVisible}
            profileSelected={profileSelected}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
