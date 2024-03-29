import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row"
  },
  greyCircle: {
    width: 10,
    height: 10,
    backgroundColor: "#ddd",
    position: "relative",
    borderRadius: 20,
    marginRight: 4,
    overflow: "hidden"
  },
  redCircle: {
    width: 10,
    height: 10,
    position: "relative",
    marginRight: 4,
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "tomato"
  }
});

interface ProfileIndicatorProps {
  items: any;
  profileSelected: number;
}

export const ProfileIndicator = ({
  items,
  profileSelected
}: ProfileIndicatorProps) => {
  return (
    <View style={styles.background}>
      {items
        ? items.map((i, index) => {
            // Possible problem when main pass is null
            if (i.workpass === null) return null;
            return (
              <View
                style={
                  index === profileSelected
                    ? styles.redCircle
                    : styles.greyCircle
                }
                key={index}
              />
            );
          })
        : null}
    </View>
  );
};
