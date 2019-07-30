import React, { useState } from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";
import { getData } from "@govtechsg/open-attestation";
import { ProfileImage } from "./ProfileImage";
import { VerifyProfile } from "./VerifyProfile";
import { VerifyModal } from "../Modals/VerifyModal";
import { ProfileDetails } from "./ProfileDetails";

const ProfileSection = ({ workpass, navigation, isPreview }) => {
  const cleanDocument = getData(workpass);
  const { recipient } = cleanDocument;

  const [modal, setModal] = useState(false);
  return (
    <ScrollView style={{ flex: 1 }}>
      <ProfileImage
        recipient={recipient}
        navigation={navigation}
        isPreview={isPreview}
      />
      <ProfileDetails cleanDocument={cleanDocument}/>
      <VerifyProfile
        isPreview={isPreview}
        handleShowModal={() => setModal(true)}
      />
      <VerifyModal showModal={modal} handleCloseModal={() => setModal(false)} />
    </ScrollView>
  );
};

export { ProfileSection };

ProfileSection.propTypes = {
  workpass: PropTypes.object,
  navigation: PropTypes.any,
  isPreview: PropTypes.bool
};
