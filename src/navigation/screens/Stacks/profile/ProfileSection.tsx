import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import AppContext from "../../../../components/AppStore";
import LevelOneDetails from "./LevelOneDetails";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#00BFFF",
    height: 200
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  name1: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  }
});

export default class Profile extends Component {
  state = {
    displayLevel1: false,
    displayLevel2: false,
    displayLevel3: false
  };

  componentWillMount() {
    this.data = this.context.certificate.document.data;
    this.fin = this.data.recipient.fin;
    this.fin = /:string:(.+)/.exec(this.fin)[1];

    this.name = this.data.recipient.name;
    this.name = /:string:(.+)/.exec(this.name)[1];

    this.profilepicture = this.data.recipient.photo;
    this.profilepicture = /:string:(.+)/.exec(this.profilepicture)[1];
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
          </View>
        </View>
      </ScrollView>
    );
  }
}
