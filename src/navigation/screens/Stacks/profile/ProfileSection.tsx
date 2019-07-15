import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Profile extends Component {
	
	state = {
		displayLevel1: false,
		displayLevel2: false,
		displayLevel3: false,
	}

	toggleOption1() {
		this.setState({displayLevel1: !this.state.displayLevel1});
	}

	toggleOption2() {
		this.setState({displayLevel2: !this.state.displayLevel2});
	}

	toggleOption3() {
		this.setState({displayLevel3: !this.state.displayLevel3});
	}

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.info}>UX Designer / Mobile developer</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
              
              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.toggleOption1()}>
                <Text>Level 1 Information</Text>  
              </TouchableOpacity>
							{this.state.displayLevel1 && <Text> I'm Displayed! </Text>}

              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.toggleOption2()}>
                <Text>Level 2 Information</Text> 
              </TouchableOpacity>
							{this.state.displayLevel2 && <Text> Hi there! </Text>}

              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.toggleOption3()}>
                <Text>Level 3 Information</Text> 
              </TouchableOpacity>
							{this.state.displayLevel3 && <Text> Top Secret </Text>}
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});