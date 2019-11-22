import React, { useState, useContext } from "react";
import { ScrollView, View } from "react-native";
import { NavigationContext } from "react-navigation";
import { getData } from "@govtechsg/open-attestation";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import { ProfileHeaderContainer } from "./ProfileHeaderContainer";
import { ProfileDetailSection } from "./ProfileDetailSection";
import { white } from "../../../../themeColors";
import { VerifyProfile } from "../../../Preview/VerifyProfile";
import { VerifyModal } from "../../../Modals/VerifyModal";
import { profileTypeEnum } from "../../profileTypeEnum";

interface ProfilePageSectionsProps {
  status: number;
  workpass: any;
  workpassType: any;
  previewTimeVerified: string;
  profileSelected: number;
  changeProfileSelected: Function;
}

const ProfilePageSections = ({
  status,
  workpass,
  workpassType,
  previewTimeVerified,
  profileSelected,
  changeProfileSelected
}: ProfilePageSectionsProps) => {
  const cleanWorkpass = getData(workpass);
  const { recipient } = cleanWorkpass;
  const navigation = useContext(NavigationContext);

  const [modal, setModal] = useState(false);

  const onSwipe = gestureName => {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    if (status !== 0) {
      switch (gestureName) {
        case SWIPE_RIGHT:
          changeProfileSelected("prev");
          break;
        case SWIPE_LEFT:
          changeProfileSelected("next");
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
        <ProfileHeaderContainer
          status={status}
          recipient={recipient}
          workpassType={workpassType}
          previewTimeVerified={previewTimeVerified}
          profileSelected={profileSelected}
          onSwipe={onSwipe}
        />
      </GestureRecognizer>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: white }}>
          <ProfileDetailSection workpass={cleanWorkpass} status={status} />
          {workpassType === profileTypeEnum.PREVIEW && (
            <View>
              <VerifyProfile
                handleShowModal={() => setModal(true)}
                handleExit={() => navigation.goBack()}
              />
              <VerifyModal
                showModal={modal}
                handleCloseModal={() => {
                  setModal(false);
                  navigation.goBack();
                  navigation.navigate("Profile", {});
                }}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export { ProfilePageSections };
