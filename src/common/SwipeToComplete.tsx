import React, { useState } from "react";
import { Text, StyleSheet, View, Dimensions, Vibration } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS, interpolate } from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "hooks/useTheme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CONTAINER_PADDING = 24;
const CONTAINER_WIDTH = SCREEN_WIDTH - CONTAINER_PADDING * 2;
const SWIPE_THRESHOLD = CONTAINER_WIDTH - 80;
const THUMB_WIDTH = 53;

type SwipeToCompleteProps = {
  onComplete: () => void;
  label?: string;
  status?: boolean; // Добавлено для статуса завершения
};

export const SwipeToComplete: React.FC<SwipeToCompleteProps> = ({
  onComplete,
  label = "Свайпните для завершения",
  status = false,
}) => {
  const { theme } = useTheme();
  const [completed, setCompleted] = useState(status);
  const translateX = useSharedValue(status ? CONTAINER_WIDTH - THUMB_WIDTH : 0);

  const handleComplete = () => {
    if (!completed) {
      Vibration.vibrate(50);
      setCompleted(true);
      onComplete();
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (!completed) {
        translateX.value = Math.min(Math.max(0, event.translationX), CONTAINER_WIDTH - THUMB_WIDTH);
      }
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withSpring(CONTAINER_WIDTH - THUMB_WIDTH);
        runOnJS(handleComplete)();
      } else {
        translateX.value = withSpring(0);
      }
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    width: translateX.value + THUMB_WIDTH,
  }));

  const iconOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [1, 0]),
  }));

  const checkOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD * 0.8, SWIPE_THRESHOLD], [0, 0.2, 1]),
  }));

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
        <Animated.View style={[styles.fill, fillStyle, { backgroundColor: theme.colors.primary }]} />
        <Text style={[styles.label, { color: theme.colors.onSurface }]}>{completed ? "Завершено" : label}</Text>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.thumb, thumbStyle, { backgroundColor: theme.colors.primary }]}>
            <Animated.View style={[StyleSheet.absoluteFill, styles.iconCenter, iconOpacity]}>
              <MaterialCommunityIcons name="truck-outline" size={24} color="#fff" />
            </Animated.View>
            <Animated.View style={[StyleSheet.absoluteFill, styles.iconCenter, checkOpacity]}>
              <MaterialCommunityIcons name="check-bold" size={24} color="#fff" />
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // paddingHorizontal: CONTAINER_PADDING,
    // marginTop: 32,
    // backgroundColor: "black",
  },
  container: {
    width: "100%",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    borderRadius: 30,
    zIndex: 0,
  },
  label: {
    position: "absolute",
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "600",
    zIndex: 1,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    overflow: "hidden",
  },
  iconCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
});
