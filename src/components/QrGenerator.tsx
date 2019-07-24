import React, { Component } from "react";
import QRCode from "react-native-qrcode-svg";

import {
  Dimensions,
  StyleSheet,
  View,
  Modal,
  Button,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from "react-native";

// https://github.com/dumbest/react-native-qrcode-svg-expo

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 10,
    width: "70%",
    justifyContent: "flex-start"
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5
  },

  modal: {},

  qrCode: {
    backgroundColor: "red",
    borderColor: "black",
    borderWidth: 20
  },

  smallText: {
    fontSize: 16,
    textAlign: "center",
    margin: 5
  },

  text: {
    color: "black",
    fontSize: 24,
    textAlign: "center",
    textAlignVertical: "center",
    margin: 10
  },

  touchable: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  }
});

interface QrGeneratorModalProps {
  isVisible: boolean;
}

export default class QrGeneratorModal extends Component<QrGeneratorModalProps> {
  state = {
    isVisible: false,
    text: "asd"
  };

  handleCancel = () => {
    this.setState({ isVisible: false });
    this.props.handleCancel();
  };

  refreshQr = () => {
    // fetch api here
    this.setState({ text: `${this.state.text}asd` });
  };

  async componentWillReceiveProps(props) {
    this.setState({ text: `${this.state.text}asd` });
    this.setState({ isVisible: props.isVisible });
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isVisible}
      >
        <TouchableHighlight
          onPress={this.handleCancel}
          style={styles.touchable}
        >
          <View style={styles.box}>
            <Text style={styles.text}>Share Workpass</Text>
            <TouchableOpacity onPress={this.refreshQr}>
              <QRCode
                value={this.state.text}
                size={Dimensions.get("screen").width * 0.6}
              />
            </TouchableOpacity>
            <Text style={styles.smallText}>tap the qr to refresh</Text>
            <Text style={styles.smallText}>tap anywhere to exit</Text>
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }
}
