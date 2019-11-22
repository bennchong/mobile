import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { white, lightGrey, midGrey } from "../../../../../themeColors";

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: 26,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: lightGrey,
    backgroundColor: white
  },
  header: { color: midGrey, fontWeight: "bold", fontSize: 13 }
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
    <View style={{ backgroundColor: white }}>
      <DetailSectionHeader title={props.title} />
      {props.children}
    </View>
  );
};
