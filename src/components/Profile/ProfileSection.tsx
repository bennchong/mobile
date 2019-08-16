import React, { useState } from "react";
import { ScrollView } from "react-native";
import { getData } from "@govtechsg/open-attestation";
import { ProfileImage } from "./ProfileImage";
import { VerifyProfile } from "./VerifyProfile";
import { VerifyModal } from "../Modals/VerifyModal";
import { ProfileDetails } from "./ProfileDetails";

interface ProfileSectionProps {
  status: number;
  workpass: any;
  isPreview: boolean;
  previewTimeVerified: string;
}

const ProfileSection = ({
  status,
  workpass,
  isPreview,
  previewTimeVerified
}: ProfileSectionProps) => {
  const cleanWorkpass = getData(workpass);
  const { recipient } = cleanWorkpass;

  const [modal, setModal] = useState(false);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ProfileImage
        status={status}
        recipient={recipient}
        isPreview={isPreview}
        previewTimeVerified={previewTimeVerified}
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
