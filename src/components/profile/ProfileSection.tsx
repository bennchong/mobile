import React, { useState } from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";
import { getData } from "@govtechsg/open-attestation";
import { ProfileImage } from "./ProfileImage";
import { VerifyProfile } from "./VerifyProfile";
import { VerifyModal } from "../Modals/VerifyModal";
import { ProfileDetails } from "./ProfileDetails";

const ProfileSection = ({ status, workpass, isPreview }) => {
  const cleanWorkpass = getData(workpass);
  const { recipient } = cleanWorkpass;

  const [modal, setModal] = useState(false);
  return (
    <ScrollView style={{ flex: 1 }}>
      <ProfileImage
        status={status}
        recipient={recipient}
        isPreview={isPreview}
      />
      <ProfileDetails workpass={cleanWorkpass} />
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
  isPreview: PropTypes.bool,
  status: PropTypes.number
};
