import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import AppContext from "../../../../components/AppStore";
import LevelOneDetails from "./LevelOneDetails";
import styles from "../../styles";
import QrCodeGenerator from "../../../../components/QrGenerator";

export default class Profile extends Component {
  state = {
    displayLevel1: false,
    displayLevel2: false,
    displayLevel3: false,
    isDialogVisible: false
  };

  showQrDialog = () => {
    this.setState({ isDialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ isDialogVisible: false });
  }

  componentWillMount() {
    this.data = this.context.certificate.document.data;

    // Object Destructuring
    const { fin, name, photo: profilepicture } = this.data.recipient;

    this.fin = fin;
    this.name = name;
    this.profilepicture = profilepicture;

    [, this.fin] = /:string:(.+)/.exec(this.fin);

    [, this.name] = /:string:(.+)/.exec(this.name);

    [, this.profilepicture] = /:string:(.+)/.exec(this.profilepicture);
  }

  // Links this Component with Appstore
  static contextType = AppContext;

  toggleOption1() {
    this.setState({ displayLevel1: !this.state.displayLevel1 });
  }

  toggleOption2() {
    this.setState({ displayLevel2: !this.state.displayLevel2 });
  }

  toggleOption3() {
    this.setState({ displayLevel3: !this.state.displayLevel3 });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}></View>
        <Image
          style={styles.avatar}
          source={{ uri: `data:image/gif;base64,${this.profilepicture}` }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.info}>{this.fin}</Text>
            <Text style={styles.name}>{this.name}</Text>

            <LevelOneDetails
              data={this.data}
              toggle={() => this.toggleOption1()}
              state={this.state.displayLevel1}
            />

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.toggleOption2()}
            >
              <Text>Level 2 Information</Text>
            </TouchableOpacity>
            {this.state.displayLevel2 && <Text> Hi there! </Text>}

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.toggleOption3()}
            >
              <Text>Level 3 Information</Text>
            </TouchableOpacity>
            {this.state.displayLevel3 && <Text> Top Secret </Text>}
            <View style={styles.page}>
              <View style={[styles.contentScreen]}>
                <Button title="show qr" onPress={this.showQrDialog} />
                <QrCodeGenerator isVisible={this.state.isDialogVisible} handleCancel={this.handleCancel} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
