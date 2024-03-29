import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Header } from "../Layout/Header";
import { styles } from "./styles";
import { cyan, white, blue, yellow, black } from "../../themeColors";

const tabs = [
  {
    icon: <AntDesign name="edit" size={30} color={yellow} />,
    title: "Dev Settings",
    link: "DevDebug"
  },
  {
    icon: <AntDesign name="questioncircle" size={30} color="#000" />,
    title: "Terms & Conditions",
    link: null
  },
  {
    icon: (
      <MaterialCommunityIcons
        name="shield"
        size={30}
        color={white}
        style={{ backgroundColor: cyan, borderRadius: 5 }}
      />
    ),
    title: "Privacy Policy",
    link: null
  },
  {
    icon: <AntDesign name="infocirlce" size={30} color={blue} />,
    title: "About Us",
    link: null
  }
];

interface SettingsTemplateProps {
  navigation: any;
}

const SettingsTemplate = (props: SettingsTemplateProps) => {
  const { navigate } = props.navigation;
  return (
    <ScrollView>
      <Header text={"Settings"} />
      <View style={{ marginTop: Constants.statusBarHeight + 35 }}>
        {tabs.map(tab => (
          <TouchableOpacity
            style={styles.container}
            key={tab.title}
            onPress={() => navigate(tab.link)}
          >
            <View style={styles.iconContainer}>
              {tab.icon}
              <Text style={styles.textContainer}>{tab.title}</Text>
            </View>
            <AntDesign
              name="right"
              size={20}
              color={black}
              style={styles.right}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default withNavigation(SettingsTemplate);
