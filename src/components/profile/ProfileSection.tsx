import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { getData } from "@govtechsg/open-attestation";
import { StateContext } from "../../state";
import LevelOneDetails from "./LevelOneDetails";
import { styles, ProfileStyle } from "../../styles";

import QrCodeGenerator from "../QrGenerator";

const ProfileImage = ({ uri }) => {
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

const ProfileSection = ({ isPreview, certificate }) => {
  const cleanDocument = getData(certificate.document);
  const { pass, recipient, employer } = cleanDocument;
  const [isLevelOneVisible, setLevelOneVisible] = useState(true);
  const [isLevelTwoVisible, setLevelTwoVisible] = useState(false);
  const [isLevelThreeVisible, setLevelThreeVisible] = useState(false);
  const [isQrVisible, setQrVisible] = useState(false);

  return (
    <ScrollView>
      <ProfileImage uri={recipient.photo} />
      {/* <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.info}>{recipient.fin}</Text>
          <Text style={styles.name}>{recipient.name}</Text>

          <LevelOneDetails
            data={certificate.document.data}
            toggle={() => this.toggleOption1()}
            state={this.state.displayLevel1}
          />

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

export { ProfileSection };
