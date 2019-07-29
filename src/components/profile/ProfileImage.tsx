import React from "react";
import { AsyncStorage, View, Image, Text, StyleSheet } from "react-native";
import metrics from "../../config/metrics";
import { ProfileName } from "./ProfileName";
import { StateContext } from "../../state";

interface ProfileImageProps {
  recipient: any;
  navigation: any;
  isPreview: boolean;
}

class ProfileImage extends React.Component<ProfileImageProps> {
  static contextType = StateContext;

  async componentDidMount() {
    const [, dispatch] = this.context;

    let storedTimeAccepted = await AsyncStorage.getItem("@storedTimeAccepted");
    if (storedTimeAccepted) {
      console.log("Fetched data: ", storedTimeAccepted);
      dispatch({
        type: "FIRST_VERIFY_WORKPASS",
        time: storedTimeAccepted
      });
    }
  }

  render() {
    const data = this.context[0];

    const { recipient, navigation, isPreview } = this.props;
    const { photo, fin, name } = recipient;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.background}>
            {data.timeAccepted.length == 0 ? null : (
              <Text style={{ paddingTop: 5 }}>
                Verified on {data.timeAccepted}
              </Text>
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
  }
}

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
