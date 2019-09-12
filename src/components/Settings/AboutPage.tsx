import React, { useContext, Component } from "react";
import { ScrollView, Button, View, TouchableOpacity, Alert, Text, Image, StyleSheet } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import Constants from "expo-constants";
import { styles } from "./styles";
import { StateContext } from "../../state";
import * as Font from 'expo-font';
import Hyperlink from 'react-native-hyperlink';

const imageSource = require("../../assets/rsz_mom-logo-share-hd.png");

interface IAboutPageProps {
  navigation: any;
}

Font.loadAsync({
  'arial-regular': require('../../assets/Fonts/arial.ttf'),
  'calibri-regular': require('../../assets/Fonts/calibri.ttf'),
})

const AboutPage = (props: IAboutPageProps) => {
  const goBack = () => props.navigation.goBack();
  return (
    <ScrollView
      contentContainerStyle={{ marginTop: Constants.statusBarHeight }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{fontSize: 16, fontFamily: 'calibri-regular', textAlign: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 24}}>
          {'\n'}{'\n'}SGWorkPass{'\n'}{'\n'}
          </Text>
          <Text style={{color: '#C0C0C0'}}>
            Launched in September 2017{'\n'}
            Version 1.0.8{'\n'}{'\n'}
          </Text>
          Brought to you by{'\n'}
          <Image source={imageSource} style={{ resizeMode: "center" }}/>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}
          SGWorkPass is a free service by the Singapore{'\n'}Government for users to check the validity of passes{'\n'}issued by the Ministry of Manpower.{'\n'}{'\n'}
          To give us feedback, visit </Text><Hyperlink linkDefault={true} linkStyle={ { color: '#2963b9', fontSize: 16, fontFamily: 'calibri-regular' } }><Text>https://www.mom.gov.sg/contact</Text></Hyperlink><Text>{'\n'}{'\n'}
          {'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}
          <Text style={{color: '#D3D3D3', fontSize: 16, fontFamily: 'calibri-regular', textAlign: 'center'}}>
            &copy; 2019 Ministry of Manpower (MOM).{'\n'}
            All rights reserved.
          </Text>
        </Text>
      </View>
      
      <Button title="Go Back to Settings Page" onPress={goBack} />
    </ScrollView>
  );
};

export default withNavigation(AboutPage);
