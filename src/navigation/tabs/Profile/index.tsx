import React from "react";
import { View } from "react-native";
import { Profile } from "../../../components/profile/Profile";
import { NoProfile } from "../../../components/profile/NoProfile";
import { useStateValue } from "../../../state";
import { styles } from "../../../styles";
import { Header } from "../../../components/Layout/Header";

const ProfileTab = () => {
  const [{ certificate }] = useStateValue();
  return (
    <View style={styles.contentScreen}>
      <Header text="MY PROFILE" />
      
      {certificate ? <Profile workpass={certificate} /> : <NoProfile />}
      
    </View>
  );
};

export { ProfileTab };
