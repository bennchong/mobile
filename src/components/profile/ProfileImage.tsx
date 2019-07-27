import React, { useContext } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import metrics from "../../config/metrics";
import { ProfileName } from "./ProfileName";
import { StateContext } from "../../state";

const ProfileImage = ({ recipient, navigation, isPreview }) => {
  const { photo, fin, name } = recipient;
  const context = useContext(StateContext);
  const { timeAccepted } = context[0];
  return (
    <>
      <View style={styles.container}>
        <View style={styles.background}>
          {timeAccepted.length == 0 ? null : (
            <Text style={{ paddingTop: 5 }}>Verified on {timeAccepted}</Text>
          )}
        </View>
        <ProfileName
          fin={fin}
          name={name}
          navigation={navigation}
          isPreview={isPreview}
        />
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `data:image/gif;base64,${photo}` }}
          />
        </View>
      </View>
      <View style={styles.margin} />
    </>
  );
};

export { ProfileImage };

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  image: {
    width: metrics.DIAMETER,
    height: metrics.DIAMETER,
    borderRadius: metrics.RADIUS,
    borderWidth: 4,
    borderColor: "#fff",
    alignSelf: "center"
  },
  imageContainer: {
    width: metrics.DIAMETER,
    height: metrics.DIAMETER,
    borderRadius: metrics.RADIUS,
    alignContent: "center",
    marginTop: metrics.RADIUS,
    position: "absolute",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 5,
      width: 5
    },
    elevation: 10
  },
  background: {
    backgroundColor: "#f5f5f5",
    height: metrics.DIAMETER,
    width: "100%",
    alignItems: "center"
  },
  margin: {
    marginHorizontal: 16,
    height: 55,
    borderBottomWidth: 1,
    borderColor: "#A9A9A9"
  }
});
