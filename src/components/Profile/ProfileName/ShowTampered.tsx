import React from "react"
import { verificationStatusEnum } from "../../../services/verificationService/verificationService"
import { View, Text } from "react-native";
import { styles } from "./ProfileNameStyles";

export const ShowTampered = ({status, fin, name}) => {
  
  const isTampered = status === verificationStatusEnum.TAMPERED;

  return(
    <View style={{ alignItems: 'center'}}>
      { isTampered ? <Text style={{fontSize: 16}}> This is tampered! Report immediately to relevant authorities </Text> :
      <View>
        {fin ? <Text style={styles.fin}>{fin}</Text> : null}
        <Text style={styles.name}>{name}</Text>
      </View> }
    </View>
  )
}