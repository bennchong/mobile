import React, { useState } from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";
import { getData } from "@govtechsg/open-attestation";
import { ProfileImage } from "./ProfileImage";
import { ProfileBasicDetails } from "./ProfileBasicDetails";
import { ProfilePassDetails } from "./ProfilePassDetails";
import { VerifyProfile } from "./VerifyProfile";
import { VerifyModal } from "../Modals/VerifyModal";

const ProfileSection = ({ workpass, navigation, isPreview }) => {
  const { pass, recipient, employer } = getData(workpass);

  const [modal, setModal] = useState(false);
  return (
    <ScrollView style={{ flex: 1 }}>
      <ProfileImage
        recipient={recipient}
        navigation={navigation}
        isPreview={isPreview}
      />
      <ProfileBasicDetails recipient={recipient} />
      <ProfilePassDetails pass={pass} employer={employer} />
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
