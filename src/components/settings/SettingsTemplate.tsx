import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { Header } from "../Layout/Header";
import { styles } from "./styles";

const tabs = [
  {
    icon: <AntDesign name="edit" size={30} color="#ffdd42" />,
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
        color="#fff"
        style={{ backgroundColor: "#2cae", borderRadius: 5 }}
      />
    ),
    title: "Privacy Policy",
    link: null
  },
  {
    icon: <AntDesign name="infocirlce" size={30} color="#2C85DE" />,
    title: "About Us",
    link: null
  }
];

const SettingsTemplate = props => {
  const { navigate } = props.navigation;
  return (
    <ScrollView>
      <Header text={"Settings"} />
      <View style={{ marginTop: 5 }}>
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
              color="black"
              style={styles.right}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default withNavigation(SettingsTemplate);

SettingsTemplate.propTypes = {
  navigation: PropTypes.any
};
