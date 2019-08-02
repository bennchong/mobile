import React from "react";
import {
  View,
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import { obfuscateDocument } from "@govtechsg/open-attestation";
import { StateContext } from "../../state";
import { QrGenerator } from "./QrGenerator";
import { obfuscateFields } from "./obfuscateFields";
import { styles } from "./sharePageStyles";

/* eslint-disable global-require */
const imageSource = require("../../assets/blur2.jpg");
global.Buffer = global.Buffer || require("buffer").Buffer;
/* eslint-enable global-require */

// https://github.com/dumbest/react-native-qrcode-svg-expo

interface SharePageContainerProps {
  isVisible: boolean;
  handleCancel: Function;
  photo: string;
  name: string;
  fin: string;
}

export class SharePageContainer extends React.Component<
  SharePageContainerProps
> {
  static contextType = StateContext;

  state = {
    obfuscateDetails: [],
    fields: obfuscateFields,
    showQR: false,
    workpass: null
  };

  handleCancel = () => {
    this.props.handleCancel();
    this.setState({ obfuscateDetails: [], showQR: false });
  };

  selectItem = item => {
    const { obfuscateDetails } = this.state;
    let newArray;
    if (obfuscateDetails.includes(item)) {
      newArray = obfuscateDetails.filter(c => {
        return c !== item;
      });
    } else {
      obfuscateDetails.push(item);
      newArray = obfuscateDetails;
    }
    this.setState({ obfuscateDetails: newArray });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.selectItem(item)}
      style={[
        {
          backgroundColor: this.state.obfuscateDetails.includes(item)
            ? "#D52D2D"
            : "#f5f5f5"
        },
        styles.obfuscateContainer
      ]}
    >
      <Text
        style={{
          color: this.state.obfuscateDetails.includes(item) ? "#fff" : "#000"
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  handleObfuscation = () => {
    const [{ workpass }] = this.context;

    let obfuscatedDoc = workpass;
    this.state.obfuscateDetails.forEach(item => {
      obfuscatedDoc = obfuscateDocument(obfuscatedDoc, item.key);
    });
    this.setState({ showQR: true, workpass: obfuscatedDoc });
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isVisible}
      >
        <Image source={imageSource} style={{ resizeMode: "cover" }} />
        <Text style={styles.text}>Ask requestor to scan QR code</Text>

        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `data:image/gif;base64,${this.props.photo}` }}
          />
        </View>

        <TouchableHighlight
          onPress={this.handleCancel}
          style={styles.touchable}
        >
          <View style={styles.box}>
            <View style={styles.textContainer}>
              <Text style={styles.fin}>{this.props.fin}</Text>
              <Text style={styles.name}>{this.props.name}</Text>
            </View>

            <Text style={styles.infoText}>Tap on a field to hide it!</Text>
            {this.state.showQR ? (
              <QrGenerator obfuscatedWorkpass={this.state.workpass} />
            ) : (
              <>
                <FlatList
                  style={styles.flatList}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                  data={this.state.fields}
                  extraData={this.state}
                  renderItem={this.renderItem}
                />
                <TouchableOpacity
                  style={styles.generateButton}
                  onPress={this.handleObfuscation}
                >
                  <Text style={styles.generateText}>Genereate QR Code</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }
}
