import React, { createRef } from "react";
import { Alert, Animated, Image, Text, View } from "react-native";
import CodeFiled from "react-native-confirmation-code-field";
import { StateContext } from "../../../state";
import { getCurrentDateAndTime } from "../../../services/date/date";
import { storeTime, storePasscode } from "../../../services/fileSystem";
import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR
} from "./PassCodeStyles";

interface PassCodeProps {
  showSuccess: any;
}

const codeLength = 4;

const source = {
  uri:
    "https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png"
};

export class RegisterPassCode extends React.Component<PassCodeProps> {
  static contextType = StateContext;

  state = {
    firstCode: "",
    showSecondCode: false
  };

  animationsColor = [...new Array(codeLength)].map(() => new Animated.Value(0));

  animationsScale = [...new Array(codeLength)].map(() => new Animated.Value(1));

  handleWorkpassConfirmation = async code => {
    const [, dispatch] = this.context;
    await storeTime();
    await storePasscode(code);
    dispatch({
      type: "SET_WORKPASS_ACCEPTED",
      time: getCurrentDateAndTime()
    });
    this.props.showSuccess();
  };

  enterCode = async code => {
    if (!this.state.showSecondCode) {
      this.codeInputRef.current.clear();
      return this.setState({ firstCode: code }, () =>
        this.setState({ showSecondCode: true })
      );
    }
    if (this.state.firstCode !== code) {
      return Alert.alert("Codes do not match", "Try again", [{ text: "OK" }], {
        cancelable: false
      });
    }
    return this.handleWorkpassConfirmation(code);
  };

  animateCell({ hasValue, index, isFocused }) {
    Animated.parallel([
      Animated.timing(this.animationsColor[index], {
        toValue: isFocused ? 1 : 0,
        duration: 250
      }),
      Animated.spring(this.animationsScale[index], {
        toValue: hasValue ? 0 : 1
        // duration: 250
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
        <Text style={styles.inputLabel}>Verification</Text>
        <Image style={styles.icon} source={source} />
        <Text style={styles.inputSubLabel}>
          {!this.state.showSecondCode
            ? "Please enter a passcode"
            : "Confirm passcode"}
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
