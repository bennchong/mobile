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
import { styles } from "./SharePageStyles";

/* eslint-disable global-require */
const imageSource = require("../../assets/blur2.jpg");
global.Buffer = global.Buffer || require("buffer").Buffer;
/* eslint-enable global-require */

interface SharePageContainerProps {
  isVisible: boolean;
  handleCancel: Function;
  photo: string;
  name: string;
}

export class SharePageContainer extends React.Component<
  SharePageContainerProps
> {
  static contextType = StateContext;

  state = {
    detailsShown: [],
    fields: obfuscateFields,
    showQR: false,
    workpass: null
  };

  handleCancel = () => {
    this.props.handleCancel();
    this.setState({ detailsShown: [], showQR: false });
  };

  selectItem = item => {
    const { detailsShown } = this.state;
    let newArray;
    if (detailsShown.includes(item)) {
      newArray = detailsShown.filter(c => {
        return c !== item;
      });
    } else {
      detailsShown.push(item);
      newArray = detailsShown;
    }
    this.setState({ detailsShown: newArray });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.selectItem(item)}
      style={[
        {
          backgroundColor: this.state.detailsShown.includes(item)
            ? "#D52D2D"
            : "#f5f5f5"
        },
        styles.obfuscateContainer
      ]}
    >
      <Text
        style={{
          color: this.state.detailsShown.includes(item) ? "#fff" : "#000"
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  handleObfuscation = () => {
    const [{ workpass }] = this.context;

    const obfuscatedDetails = [];
    this.state.fields.forEach(item => {
      if (!this.state.detailsShown.includes(item)) {
        obfuscatedDetails.push(item);
      }
    });

    let obfuscatedDoc = workpass;
    obfuscatedDetails.forEach(item => {
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
        <Image source={imageSource} style={styles.overlay} />
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
              <Text style={styles.name}>{this.props.name}</Text>
            </View>

            {this.state.showQR ? (
              <QrGenerator obfuscatedWorkpass={this.state.workpass} />
            ) : (
              <>
                <Text style={styles.infoText}>
                  Select fields to share below
                </Text>
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
                  <Text style={styles.generateText}>Generate QR Code</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }
}
