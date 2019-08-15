import React, { createRef } from "react";
import { Alert, Animated, Image, Text, View } from "react-native";
import CodeFiled from "react-native-confirmation-code-field";
import { StateContext } from "../../../state";
import { getPasscode } from "../../../services/fileSystem";
import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR
} from "../VerifyProfile/PassCodeStyles";

interface PassCodeProps {
  showSuccess: any;
}

const codeLength = 4;

const source = {
  uri:
    "https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png"
};

export class VerifyPassCode extends React.Component<PassCodeProps> {
  static contextType = StateContext;

  animationsColor = [...new Array(codeLength)].map(() => new Animated.Value(0));

  animationsScale = [...new Array(codeLength)].map(() => new Animated.Value(1));

  enterCode = async code => {
    const storedCode = await getPasscode();

    if (storedCode !== code) {
      return Alert.alert("Invalid passcode", "Try again", [{ text: "OK" }], {
        cancelable: false
      });
    }
    return this.props.showSuccess();
  };

  animateCell({ hasValue, index, isFocused }) {
    Animated.parallel([
      Animated.timing(this.animationsColor[index], {
        toValue: isFocused ? 1 : 0,
        duration: 250
      }),
      Animated.spring(this.animationsScale[index], {
        toValue: hasValue ? 0 : 1
      })
    ]).start();
  }

  cellProps = ({ hasValue, index, isFocused }) => {
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? this.animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR]
          })
        : this.animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR]
          }),
      borderRadius: this.animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS]
      }),
      transform: [
        {
          scale: this.animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1]
          })
        }
      ]
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      this.animateCell({ hasValue, index, isFocused });
    }, 0);

    return {
      style: [styles.input, animatedCellStyle]
    };
  };

  containerProps = { style: styles.inputWrapStyle };

  codeInputRef = createRef();

  render() {
    return (
      <View style={styles.inputWrapper}>
        <Image style={styles.icon} source={source} />
        <Text style={styles.inputSubLabel}>
          Enter your passcode to view more information
        </Text>
        <CodeFiled
          ref={this.codeInputRef}
          maskSymbol=" "
          variant="clear"
          codeLength={codeLength}
          keyboardType="numeric"
          cellProps={this.cellProps}
          containerProps={this.containerProps}
          onFulfill={this.enterCode}
          CellComponent={Animated.Text}
        />
      </View>
    );
  }
}
