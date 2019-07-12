import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

interface MyProps{
  status: String
}
interface MyState{}

export default class VerifyingBar extends React.Component<MyProps, MyState> {
  render() {
    if (this.props.status === 'validating'){
        return (
            <View style={[styles.validating]}> 
              <ActivityIndicator size="large" color="white" />
              <Text style={styles.text}> Verifying Certificate </Text>
            </View> 
        )
    }
    else if(this.props.status === 'validated'){
        return (
            <View style={[styles.verified]}> 
              <Text style={styles.text}> Valid </Text>
            </View> 
        )
    }
    else {
        return (
            <View style={[styles.invalid]}> 
              <Text style={styles.text}> Invalid </Text>
            </View> 
        )
    }

  }
}

const styles = StyleSheet.create({
    
    validating: {
      flex:0.075,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'baseline',
      backgroundColor: 'red',
      marginTop: 5,
    },

    verified: {      
      flex:0.075,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'baseline',
      backgroundColor: 'green',
      marginTop: 5,
    },

    invalid: {      
      flex:0.075,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'baseline',
      backgroundColor: 'red',
      marginTop: 5,
    },

    text: {
        color: 'white',
     },
  })