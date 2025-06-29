import { useTheme } from "hooks/useTheme";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ViewStyle, ViewProps } from "react-native";

interface ThemedViewProps extends ViewProps {
  style?: ViewStyle | ViewStyle[];
  safe?: boolean;
}

const ThemedView = ({ style, safe = false, ...props }: ThemedViewProps) => {
  const { theme } = useTheme();

  if (!safe) return <View style={[{ backgroundColor: theme.colors.background }, style]} {...props} />;

  const insets = useSafeAreaInsets();
  

  return (
    <View
      style={[
        {
          backgroundColor: 'transparent',
          paddingTop: insets.top + 10,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedView;
