import React from "react";
import { ScrollView, View } from "react-native";
import { getData } from "@govtechsg/open-attestation";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import { ProfileImage } from "./ProfileImage";
import { ProfileDetails } from "./ProfileDetails";
import { useStateValue } from "../../state";
import { white } from "../../themeColors";

interface ProfileSectionProps {
  status: number;
  workpass: any;
  isPreview: boolean;
  previewTimeVerified: string;
  profileSelected: number;
  changeProfileSelected: Function;
}

const ProfileSection = ({
  status,
  workpass,
  isPreview,
  previewTimeVerified,
  profileSelected,
  changeProfileSelected
}: ProfileSectionProps) => {
  const cleanWorkpass = getData(workpass);
  const { recipient } = cleanWorkpass;

  // const [modal, setModal] = useState(false);
  const [{ dpWorkpassArray }] = useStateValue();

  const onSwipe = gestureName => {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    if (status !== 0) {
      switch (gestureName) {
        case SWIPE_RIGHT:
          if (profileSelected > 0) changeProfileSelected(profileSelected - 1);
          break;
        case SWIPE_LEFT:
          if (profileSelected < dpWorkpassArray.length)
            changeProfileSelected(profileSelected + 1);
          break;
        default:
          break;
      }
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 100
  };

  return (
    <>
      <GestureRecognizer
        onSwipe={direction => onSwipe(direction)}
        config={config}
        style={{ flex: 1 }}
      >
        <ProfileImage
          status={status}
          recipient={recipient}
          isPreview={isPreview}
          previewTimeVerified={previewTimeVerified}
          profileSelected={profileSelected}
          onSwipe={onSwipe}
        />
      </GestureRecognizer>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: white }}>
          <ProfileDetails workpass={cleanWorkpass} status={status} />
          {/* <VerifyProfile
            isPreview={isPreview}
            handleShowModal={() => setModal(true)}
            profileSelected={profileSelected}
          />
          <VerifyModal
            showModal={modal}
            handleCloseModal={() => setModal(false)}
          /> */}
        </ScrollView>
      </View>
    </>
  );
};

export { ProfileSection };
