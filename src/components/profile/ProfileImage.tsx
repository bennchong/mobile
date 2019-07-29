import React from "react";
import { AsyncStorage, View, Image, Text } from "react-native";
import { ProfileName } from "./ProfileName";
import { StateContext } from "../../state";
import { styles } from "./Styles/ProfileImageStyles";

interface ProfileImageProps {
  recipient: any;
  navigation: any;
  isPreview: boolean;
}

class ProfileImage extends React.Component<ProfileImageProps> {
  static contextType = StateContext;

  async componentDidMount() {
    const [, dispatch] = this.context;

    const storedTimeAccepted = await AsyncStorage.getItem(
      "@storedTimeAccepted"
    );
    if (storedTimeAccepted) {
      dispatch({
        type: "SET_WORKPASS_ACCEPTED",
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
            {data.timeAccepted.length === 0 ? null : (
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
