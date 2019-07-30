import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 26,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#A9A9A9",
    backgroundColor: "#fff"
  },
  header: { color: "#808080", fontWeight: "bold", fontSize: 13 }
});

interface DetailSectionProps {
  title: string;
  children: any;
}

interface DetailSectionHeaderProps {
  title: string;
}

const DetailSectionHeader = (props: DetailSectionHeaderProps) => {
  if (props.title) {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{props.title}</Text>
      </View>
    );
  }
  return null;
};

export const DetailSection = (props: DetailSectionProps) => {
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <DetailSectionHeader title={props.title} />
      {props.children}
    </View>
  );
};
