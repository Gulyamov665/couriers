import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { OrdersType } from "@store/services/orders/types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "hooks/useTheme";

type OrderCardProps = {
  order: OrdersType;
  onAccept: () => void;
  onDecline: () => void;
  isLoading: boolean;
  pendingId?: number | null;
};

export const OrderCard = ({ order, onAccept, onDecline, isLoading, pendingId }: OrderCardProps) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={() =>
        navigate("OrderDetails", {
          id: String(order.id),
        })
      }
    >
      <View style={[styles.card, { backgroundColor: theme.colors.onPrimary }]}>
        <View style={styles.header}>
          <Text style={[styles.orderId, { color: theme.colors.onBackground }]}>Заказ #{order.id}</Text>
          <Text style={[styles.price, { color: theme.colors.onBackground }]}>
            {Number(order.total_price).toLocaleString()} сум
          </Text>
        </View>
        <View style={styles.infoBox}>
          <MaterialIcons name="person" size={20} color={theme.colors.onBackground} />
          <Text style={[styles.customer, { color: theme.colors.onBackground }]}>{order.created_by}</Text>
        </View>
        <View style={styles.infoBox}>
          <MaterialIcons name="location-on" size={20} color={theme.colors.onBackground} />
          <Text style={[styles.address, { color: theme.colors.onBackground }]}>{order.location.address}</Text>
        </View>
        <View style={styles.distance}>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="social-distance" size={20} color={theme.colors.onBackground} />
            <Text style={[styles.address, { color: theme.colors.onBackground }]}>{order.destination?.distance}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="access-time" size={20} color={theme.colors.onBackground} />
            <Text style={[styles.address, , { color: theme.colors.onBackground }]}>{order.destination?.duration}</Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, styles.accept, isLoading && order.id === pendingId && styles.buttonDisabled]}
            onPress={onAccept}
            disabled={isLoading && order.id === pendingId}
          >
            {isLoading && order.id === pendingId ? (
              <ActivityIndicator style={styles.buttonText} color={theme.customColors.orange} />
            ) : (
              <Text style={styles.buttonText}>Принять</Text>
            )}
          </TouchableOpacity>

          {/* <TouchableOpacity style={[styles.button, styles.decline]} onPress={onDecline}>
            <Text style={styles.buttonText}>Отклонить</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // elevation: 3,
    // shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  customer: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 5,
  },
  address: {
    fontSize: 14,
    color: "#888",
    marginBottom: 12,
    marginRight: 10,
    marginLeft: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  accept: {
    backgroundColor: "#34C759",
  },
  decline: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
    backgroundColor: "#85E0A3",
  },
  infoBox: {
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
    marginBottom: 3,
  },
  distance: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
