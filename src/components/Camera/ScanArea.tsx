import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0
  },
  viewfinder: {
    alignItems: "center",
    justifyContent: "center"
  },
  topLeftCorner: {
    position: "absolute",
    top: 0,
    left: 0
  },
  topRightCorner: {
    position: "absolute",
    top: 0,
    right: 0
  },
  bottomLeftCorner: {
    position: "absolute",
    bottom: 0,
    left: 0
  },
  bottomRightCorner: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  topMask: {
    position: "absolute",
    top: 0
  },
  leftMask: {
    position: "absolute",
    left: 0
  },
  rightMask: {
    position: "absolute",
    right: 0
  },
  bottomMask: {
    position: "absolute",
    bottom: 0
  }
});

export class ScanArea extends Component {
  state = {
    topWidth: 0,
    topHeight: 0,
    leftWidth: 0
  };

  measureTotalSize(e) {
    let totalSize = e.layout;
    this.setState({
      topWidth: totalSize.width
    });
  }

  measureRectPosition(e) {
    let rectSize = e.layout;
    this.setState({
      topHeight: rectSize.y,
      leftWidth: rectSize.x
    });
  }

  getTopMaskHeight() {
    return this.state.topHeight + 240;
  }

  getBottomMaskHeight() {
    return this.state.topHeight + 240;
  }

  getSideMaskHeight() {
    return 240;
  }

  getSideMaskWidth() {
    return this.state.leftWidth;
  }

  getBottomMenuHeight() {
    return {
      bottom: 0
    };
  }

  getScanBarMargin() {
    return {
      marginRight: 6,
      marginLeft: 6
    };
  }

  getScanImageWidth() {
    return 240 - 12;
  }

  render() {
    return (
      <View
        onLayout={({ nativeEvent: e }) => this.measureTotalSize(e)}
        style={[styles.container, this.getBottomMenuHeight()]}
      >
        <View
          style={[styles.viewfinder, { height: 240, width: 240 }]}
          onLayout={({ nativeEvent: e }) => this.measureRectPosition(e)}
        >
          {/*扫描框边线*/}
          <View
            style={{
              height: 240,
              width: 240
            }}
          ></View>

          {/*扫描框转角-左上角*/}
          <View
            style={[
              { borderColor: "#fff", height: 20, width: 20 },
              styles.topLeftCorner,
              {
                borderLeftWidth: 4,
                borderTopWidth: 4
              }
            ]}
          />

          {/*扫描框转角-右上角*/}
          <View
            style={[
              { borderColor: "#fff", height: 20, width: 20 },
              styles.topRightCorner,
              {
                borderRightWidth: 4,
                borderTopWidth: 4
              }
            ]}
          />

          {/*扫描框转角-左下角*/}
          <View
            style={[
              { borderColor: "#fff", height: 20, width: 20 },
              styles.bottomLeftCorner,
              {
                borderLeftWidth: 4,
                borderBottomWidth: 4
              }
            ]}
          />

          {/*扫描框转角-右下角*/}
          <View
            style={[
              { borderColor: "#fff", height: 20, width: 20 },
              styles.bottomRightCorner,
              {
                borderRightWidth: 4,
                borderBottomWidth: 4
              }
            ]}
          />
        </View>

        <View
          style={[
            { backgroundColor: "rgba(255, 255, 255, 0.5)" },
            styles.topMask,
            {
              bottom: this.getTopMaskHeight(),
              width: this.state.topWidth
            }
          ]}
        />

        <View
          style={[
            { backgroundColor: "rgba(255, 255, 255, 0.5)" },
            styles.leftMask,
            {
              height: this.getSideMaskHeight() + 0.5,
              width: this.getSideMaskWidth()
            }
          ]}
        />

        <View
          style={[
            { backgroundColor: "rgba(255, 255, 255, 0.5)" },
            styles.rightMask,
            {
              height: this.getSideMaskHeight() + 0.5,
              width: this.getSideMaskWidth()
            }
          ]}
        />

        <View
          style={[
            { backgroundColor: "rgba(255, 255, 255, 0.5)" },
            styles.bottomMask,
            {
              top: this.getBottomMaskHeight(),
              width: this.state.topWidth
            }
          ]}
        />
      </View>
    );
  }
}
