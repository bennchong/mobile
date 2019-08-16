import React, { createRef, useState } from "react";
import { Alert, Animated, Image, Text, View } from "react-native";
import CodeFiled from "react-native-confirmation-code-field";
import { useStateValue } from "../../state";
import {
  getPasscode,
  storeTime,
  storePasscode
} from "../../services/fileSystem";
import { getCurrentDateAndTime } from "../../services/date/date";
import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR
} from "./AuthenticationStyles";

interface PassCodeProps {
  showSuccess: any;
  register: boolean;
}

const codeLength = 4;

const source = {
  uri:
    "https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png"
};

export const PassCode = ({ showSuccess, register }: PassCodeProps) => {
  const [, dispatch] = useStateValue();
  const [firstCode, setFirstCode] = useState("");
  const [showSecondCode, setShowSecond] = useState(false);

  const containerProps = { style: styles.inputWrapStyle };

  const codeInputRef = createRef();

  const animationsColor = [...new Array(codeLength)].map(
    () => new Animated.Value(0)
  );

  const animationsScale = [...new Array(codeLength)].map(
    () => new Animated.Value(1)
  );

  const animateCell = ({ hasValue, index, isFocused }) => {
    Animated.parallel([
      Animated.timing(animationsColor[index], {
        toValue: isFocused ? 1 : 0,
        duration: 250
      }),
      Animated.spring(animationsScale[index], {
        toValue: hasValue ? 0 : 1
      })
    ]).start();
  };

  const cellProps = ({ hasValue, index, isFocused }) => {
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR]
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR]
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS]
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1]
          })
        }
      ]
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return {
      style: [styles.input, animatedCellStyle]
    };
  };

  const unlockInfo = async code => {
    const storedCode = await getPasscode();

    if (storedCode !== code) {
      codeInputRef.current.clear();
      return Alert.alert("Invalid passcode", "Try again", [{ text: "OK" }], {
        cancelable: false
      });
    }
    return showSuccess();
  };

  const handleWorkpassConfirmation = async code => {
    if (!showSecondCode) {
      codeInputRef.current.clear();
      setFirstCode(code);
      return setShowSecond(true);
    }
    if (firstCode !== code) {
      codeInputRef.current.clear();
      return Alert.alert("Codes do not match", "Try again", [{ text: "OK" }], {
        cancelable: false
      });
    }
    await storeTime();
    await storePasscode(code);
    dispatch({
      type: "SET_WORKPASS_ACCEPTED",
      time: getCurrentDateAndTime()
    });
    return showSuccess();
  };

  const enterCode = async code => {
    if (register) {
      return handleWorkpassConfirmation(code);
    }
    return unlockInfo(code);
  };

  let subLabel;
  if (register && !showSecondCode) {
    subLabel = "Please enter a passcode";
  } else if (register && showSecondCode) {
    subLabel = "Confirm passcode";
  } else {
    subLabel = "Enter your passcode to view more information";
  }

  return (
    <View style={styles.inputWrapper}>
      {register ? <Text style={styles.inputLabel}>Verification</Text> : null}
      <Image
        style={[styles.icon, { width: 217 / 2.4, height: 158 / 2.4 }]}
        source={source}
      />
      <Text style={styles.inputSubLabel}>{subLabel}</Text>
      <CodeFiled
        ref={codeInputRef}
        maskSymbol=" "
        variant="clear"
        codeLength={codeLength}
        keyboardType="numeric"
        cellProps={cellProps}
        containerProps={containerProps}
        onFulfill={enterCode}
        CellComponent={Animated.Text}
      />
    </View>
  );
};
