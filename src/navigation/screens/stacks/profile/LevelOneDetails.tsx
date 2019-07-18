import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
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

export default class LevelOneDetails extends React.Component {
  componentWillMount() {
    this.country = this.props.data.recipient.country;
    this.country = /:string:(.+)/.exec(this.country)[1];

    this.dob = this.props.data.recipient.dob;
    this.dob = /:string:(.+)/.exec(this.dob)[1];
    this.dob = /(.+)T/.exec(this.dob)[0];

    this.address = this.props.data.recipient.address.streetAddress;
    this.address = /:string:(.+)/.exec(this.address)[1];
  }

  render() {
    return (
      <>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.toggle()}
        >
          <Text>Level 1 Information</Text>
        </TouchableOpacity>

        {this.props.state && (
          <>
            <Text> Date of Birth: {this.dob} </Text>
            <Text> Nationality: {this.country}</Text>
            <Text> Passport Number: Placeholder</Text>
            <Text> Address: {this.address} </Text>
          </>
        )}
      </>
    );
  }
}
