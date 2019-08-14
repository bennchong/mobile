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

  const handleObfuscation = () => {
    const obfuscatedDetails = obfuscateFields.filter(o => {
      return !detailsShown.some(o2 => o.key === o2);
    });

    const details = [];
    obfuscateFields.map(o => {
      detailsShown.some(o2 => {
        if (o.key === o2) {
          details.push(o.title);
        }
      });
    });
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
