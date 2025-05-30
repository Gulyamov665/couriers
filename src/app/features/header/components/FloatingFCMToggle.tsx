import { authState } from "@store/slices/auth";
import React, { useState } from "react";
import { StyleSheet, Switch, Animated, PanResponder } from "react-native";
import { useSelector } from "react-redux";

const FloatingFCMToggle = () => {
  const [enabled, setEnabled] = useState(false);
  const position = React.useRef<Animated.ValueXY>(new Animated.ValueXY({ x: 250, y: 500 })).current;
  const { isAuthenticated } = useSelector(authState);

  if (!isAuthenticated) return;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      position.setOffset({
        x: (position.x as any).__getValue(),
        y: (position.y as any).__getValue(),
      });
      position.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], { useNativeDriver: false }),
    onPanResponderRelease: () => {
      position.flattenOffset();
    },
  });

  return (
    <Animated.View
      style={[styles.floatingButton, { transform: [{ translateX: position.x }, { translateY: position.y }] }]}
      {...panResponder.panHandlers}
    >
      {/* <Switch
        value={enabled}
        onValueChange={val => {
          setEnabled(val);
          // Твой FCM логика здесь
        }}
        trackColor={{false: '#ccc', true: '#34C759'}}
        thumbColor={'#fff'}
      /> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    zIndex: 999,
    width: 60,
    height: 60,
    backgroundColor: "#34C759",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default FloatingFCMToggle;
