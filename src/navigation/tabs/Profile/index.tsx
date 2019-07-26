import React from "react";
import { View } from "react-native";
import { Profile } from "../../../components/profile/ProfileView";
import { NoProfile } from "../../../components/profile/NoProfile";
import { useStateValue } from "../../../state";
import { Header } from "../../../components/Layout/Header";

const ProfileTab = () => {
  const [{ workpass }] = useStateValue();
  return (
    <View style={{ flex: 1 }}>
      <Header text="MY PROFILE" />
      <View style={{ flex: 14 }}>
        {workpass ? <Profile workpass={workpass} /> : <NoProfile />}
      </View>
    </View>
  );
};

export { ProfileTab };
