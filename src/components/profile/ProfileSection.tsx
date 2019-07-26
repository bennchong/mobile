import React, { useState } from "react";
import { View, Image, ScrollView, Text } from "react-native";
import { getData } from "@govtechsg/open-attestation";
import { styles, ProfileStyle } from "../../styles";

interface ProfileImageProps {
  uri: any;
}

const ProfileImage = ({ uri }: ProfileImageProps) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={ProfileStyle.avatarBackground} />
      <View
        style={[ProfileStyle.avatarBackground, { backgroundColor: "gray" }]}
      />
      <View style={ProfileStyle.avatarContainer}>
        <Image
          style={ProfileStyle.avatar}
          source={{ uri: `data:image/gif;base64,${uri}` }}
        />
      </View>
    </View>
  );
};

interface ProfileSectionProps {
  isPreview: boolean;
  workpass: any;
}

export const ProfileSection = ({
  /* isPreview */
  workpass
}: ProfileSectionProps) => {
  /* eslint-disable */
  const cleanDocument = getData(workpass);
  const { pass, recipient, employer } = cleanDocument;
  const [isLevelOneVisible, setLevelOneVisible] = useState(true);
  const [isLevelTwoVisible, setLevelTwoVisible] = useState(false);
  const [isLevelThreeVisible, setLevelThreeVisible] = useState(false);
  const [isQrVisible, setQrVisible] = useState(false);
  /* eslint-enable */
  return (
    <ScrollView>
      <ProfileImage uri={recipient.photo} />
      {/* <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.info}>{recipient.fin}</Text>
          <Text style={styles.name}>{recipient.name}</Text>



          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {setLevelTwoVisible(!isLevelTwoVisible)}}
          >
            <Text>Level 2 Information</Text>
          </TouchableOpacity>
          {this.state.displayLevel2 && <Text> Hi there! </Text>}

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {setLevelThreeVisible(!isLevelThreeVisible)}}
          >
            <Text>Level 3 Information</Text>
          </TouchableOpacity>
          {this.state.displayLevel3 && <Text> Top Secret </Text>}
          <View style={styles.page}>
            <View style={[styles.contentScreen]}>
              <Button title="show qr" onPress={this.showQrDialog} />
              <QrCodeGenerator
                isVisible={this.state.isDialogVisible}
                handleCancel={this.handleCancel}
              />
            </View>
          </View>
        </View>
      </View> */}
    </ScrollView>
  );
};
