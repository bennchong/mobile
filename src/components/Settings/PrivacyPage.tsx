import React, { useContext } from "react";
import { ScrollView, Button, View, TouchableOpacity, Alert, Text } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import Constants from "expo-constants";
import { styles } from "./styles";
import { StateContext } from "../../state";

interface IPrivacyPageProps {
  navigation: any;
}

const PrivacyPage = (props: IPrivacyPageProps) => {
  const goBack = () => props.navigation.goBack();
  return (
    <ScrollView
      contentContainerStyle={{ marginTop: Constants.statusBarHeight }}
    >
      <Text>
          Privacy statement about the Ministry of Manpower's SGWorkPass Mobile App.
      </Text>
      <Button title="Go Back to Settings Page" onPress={goBack} />
    </ScrollView>
  );
};

export default withNavigation(PrivacyPage);
