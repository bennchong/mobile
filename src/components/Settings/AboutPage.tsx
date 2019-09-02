import React, { useContext } from "react";
import { ScrollView, Button, View, TouchableOpacity, Alert, Text } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import Constants from "expo-constants";
import { styles } from "./styles";
import { StateContext } from "../../state";

interface IAboutPageProps {
  navigation: any;
}

const AboutPage = (props: IAboutPageProps) => {
  const goBack = () => props.navigation.goBack();
  return (
    <ScrollView
      contentContainerStyle={{ marginTop: Constants.statusBarHeight }}
    >
      <Text>MOM</Text>
      <Button title="Go Back to Settings Page" onPress={goBack} />
    </ScrollView>
  );
};

export default withNavigation(AboutPage);
