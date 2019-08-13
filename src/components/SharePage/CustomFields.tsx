import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { obfuscateDocument } from "@govtechsg/open-attestation";
import { obfuscateFields } from "./obfuscateFields";
import { styles } from "./sharePageStyles";

/* eslint-disable global-require */
global.Buffer = global.Buffer || require("buffer").Buffer;
/* eslint-enable global-require */

// https://github.com/dumbest/react-native-qrcode-svg-expo

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

  const selectItem = item => {
    let newArray;
    if (detailsShown.includes(item)) {
      newArray = detailsShown.filter(c => {
        return c !== item;
      });
    } else {
      detailsShown.push(item);
      newArray = detailsShown;
    }
    setDetailsShown(newArray);
    setRefresh(!refresh);
  };
  const renderItem = ({ item }: renderItemProps) => (
    <TouchableOpacity
      onPress={() => selectItem(item)}
      style={[
        {
          backgroundColor: detailsShown.includes(item) ? "#D52D2D" : "#f5f5f5"
        },
        styles.obfuscateContainer
      ]}
    >
      <Text
        style={{
          color: detailsShown.includes(item) ? "#fff" : "#000"
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const handleObfuscation = () => {
    const details = [];
    detailsShown.forEach(i => details.push(i.title));
    const detailsString = details.join(", ");

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
            const obfuscatedDetails = obfuscateFields.filter(o => {
              return !detailsShown.some(o2 => o.title === o2.title);
            });
            let obfuscatedDoc = workpass;
            obfuscatedDetails.forEach(item => {
              obfuscatedDoc = obfuscateDocument(obfuscatedDoc, item.key);
            });

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
      <TouchableOpacity style={styles.button} onPress={handleObfuscation}>
        <Text style={styles.buttonText}>Generate QR Code</Text>
      </TouchableOpacity>
    </>
  );
};
