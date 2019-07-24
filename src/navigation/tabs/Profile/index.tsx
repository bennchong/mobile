import React from "react";
import { View } from "react-native";
import { Profile } from "./profile/Profile";
import { NoProfile } from "./profile/NoProfile";
import { useStateValue } from "../../../state";
import { styles } from "../../../styles";
import { TitleBar } from "../../../components/TitleBar";

const ProfileTab = () => {
  const [{ certificate }] = useStateValue();
  return (
    <View style={styles.page}>
      <TitleBar text="MY PROFILE" />
      <View style={{ flex: 14 }}>
        {certificate ? <Profile /> : <NoProfile />}
      </View>
    </View>
  );
};

export { ProfileTab };
