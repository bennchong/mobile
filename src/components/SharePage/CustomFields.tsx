import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import {
  obfuscateFields,
  handleObfuscation
} from "../../services/obfuscation/obfuscationHandler";
import { styles } from "./SharePageStyles";

/* eslint-disable global-require */
// Global buffer is needed to handle the binary data when obfuscating a certain field
// and converting it to a hash using the obfuscateDocument method
global.Buffer = global.Buffer || require("buffer").Buffer;
/* eslint-enable global-require */

interface CustomFieldsProps {
  showQR: any;
  workpass: object;
}

interface renderItemProps {
  item: any;
}

export const CustomFields = ({ showQR, workpass }: CustomFieldsProps) => {
  const [detailsShown, setDetailsShown] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const selectItem = key => {
    let newArray;
    if (detailsShown.includes(key)) {
      newArray = detailsShown.filter(c => {
        return c !== key;
      });
    } else {
      detailsShown.push(key);
      newArray = detailsShown;
    }
    setDetailsShown(newArray);
    setRefresh(!refresh);
  };

  const renderItem = ({ item }: renderItemProps) => (
    <TouchableOpacity
      onPress={() => selectItem(item.key)}
      style={[
        {
          backgroundColor: detailsShown.includes(item.key)
            ? "#D52D2D"
            : "#f5f5f5"
        },
        styles.obfuscateContainer
      ]}
    >
      <Text
        style={{
          color: detailsShown.includes(item.key) ? "#fff" : "#000"
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const handleCustomFields = () => {
    const { obfuscatedDoc, detailsString } = handleObfuscation(
      detailsShown,
      workpass
    );

    Alert.alert(
      "Are you sure you want to share the following details",
      `${detailsString}`,
      [
        {
          text: "No"
        },
        {
          text: "Yes",
          onPress: () => {
            showQR(obfuscatedDoc);
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <Text style={styles.infoText}>Select fields to share below</Text>
      <FlatList
        style={styles.flatList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        data={obfuscateFields}
        extraData={refresh}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.button} onPress={handleCustomFields}>
        <Text style={styles.buttonText}>Generate QR Code</Text>
      </TouchableOpacity>
    </>
  );
};
