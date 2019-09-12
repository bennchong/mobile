import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { withNavigation } from "react-navigation";
import Constants from "expo-constants";
import PDFReader from 'rn-pdf-reader-js' 

interface IPrivacyPageProps {
  navigation: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
})

const TermsPage = (props: IPrivacyPageProps) => {
  const goBack = () => props.navigation.goBack();
  return (
    <View style={styles.container}>
      <PDFReader
          source={{
            uri: 'https://github.com/sgworkpass/mobile/raw/about_button/src/assets/PDFs/sgworkpass-terms-of-use.pdf',
          }}
        />
      <Button title="Go Back to Settings Page" onPress={goBack} />
    </View>
  );
};

export default withNavigation(TermsPage);
