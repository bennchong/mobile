import React from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { styles } from "../SharePageStyles";
import {
  profileSelector,
  handleObfuscation
} from "../../../../../../../../services/obfuscation/obfuscationHandler";

interface ProfileSelectorModalProps {
  setPage: Function;
  showQR: Function;
  selectedWorkpass: Object;
}

const handleProfileSelector = (
  profile,
  detailsShown,
  showQR,
  selectedWorkpass
) => {
  const { obfuscatedDoc, detailsString } = handleObfuscation(
    detailsShown,
    selectedWorkpass
  );

  Alert.alert(
    `Share the following details with ${profile}`,
    `${detailsString}`,
    [
      {
        text: "No"
      },
      {
        text: "Yes",
        onPress: () => {
          showQR(obfuscatedDoc);
        }
      }
    ],
    { cancelable: false }
  );
};

/* eslint-disable no-unused-vars */
export enum pageEnum {
  PROFILE_SELECTOR,
  CUSTOM_FIELDS,
  QR_GENERATOR
}
/* eslint-enable */

export const ProfileSelectorModal = ({
  setPage,
  showQR,
  selectedWorkpass
}: ProfileSelectorModalProps) => {
  return (
    <View>
      <Text style={styles.infoText}>Select profile to share with</Text>
      <View style={{ padding: 16 }}>
        {profileSelector.map(item => (
          <TouchableOpacity
            key={item.profile}
            style={styles.profileSelector}
            onPress={() => {
              handleProfileSelector(
                item.profile,
                item.detailsShown,
                showQR,
                selectedWorkpass
              );
            }}
          >
            <Text style={styles.profileSelectorText}>{item.profile}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.profileSelector}
          onPress={() => setPage(pageEnum.CUSTOM_FIELDS)}
        >
          <Text style={styles.profileSelectorText}>
            Select customized field
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
