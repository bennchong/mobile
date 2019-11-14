import React from "react";
import { View, Text } from "react-native";
import { verificationStatusEnum } from "../../../services/verificationService/verificationService";
import { styles } from "./ProfileNameStyles";

interface NameFinProps {
  status: any;
  fin: string;
  name: string;
}

// If tampered, indicate that profile is tampered
export const NameFin = ({ status, fin, name }: NameFinProps) => {
  const isTampered = status === verificationStatusEnum.TAMPERED;

  return (
    <View>
      {isTampered ? (
        <Text style={styles.name}>
          This is tampered! Report immediately to relevant authorities
        </Text>
      ) : (
        <View>
          {fin ? <Text style={styles.fin}>{fin}</Text> : null}
          <Text style={styles.name}>{name}</Text>
        </View>
      )}
    </View>
  );
};
