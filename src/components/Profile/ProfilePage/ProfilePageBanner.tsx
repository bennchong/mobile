import React from "react";
import { NoWifiBar, ValidationBar } from "./ProfilePageBanners";
import { profileTypeEnum } from "../profileTypeEnum";
import { MessageBar } from "./ProfilePageBanners/MessageBar";
import { View } from "react-native";

interface ProfilePageBannerProps {
  internetConnected: boolean;
  workpassType: any;
  status: number;
}

export const ProfilePageBanner = ({
  internetConnected,
  workpassType,
  status
}: ProfilePageBannerProps) => {
  return (
    <View>
      {!internetConnected && <NoWifiBar />}
      {internetConnected && workpassType !== profileTypeEnum.PREVIEW && (
        <ValidationBar status={status} workpassType={workpassType} />
      )}
      {workpassType === profileTypeEnum.PREVIEW && <MessageBar />}
    </View>
  );
};
