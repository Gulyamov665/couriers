import React from "react";
import { OrdersType } from "@store/services/orders/types";
import { View, Text, Linking, Platform, Pressable, ActivityIndicator } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { OrderStatus } from "common/OrderStatuses";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "app/navigation/RootNavigator";
import { useTheme } from "hooks/useTheme";

export type AcceptedCardProps = {
  order: OrdersType;
  onTheWay: () => Promise<void>;
  pendingId?: number | null;
  isLoading?: boolean;
};

export const AcceptedCard: React.FC<AcceptedCardProps> = ({ order, onTheWay, isLoading, pendingId }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();

  const handleCall = () => {
    Linking.openURL(`tel:${order.user_phone_number}`);
  };

  const handleOpenMap = () => {
    const { lat, long } = order.location;

    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${lat},${long}`,
      android: `geo:${lat},${long}?q=${lat},${long}`,
    });
    if (url) Linking.openURL(url);
  };

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
          <Text style={[styles.orderNumber, { color: theme.colors.onBackground }]}>Заказ #{order.id}</Text>
          <OrderStatus status={order.status} />
        </View>

        <Text style={[styles.client, { color: theme.colors.onBackground }]}>Клиент: {order.created_by}</Text>
        <Text style={[styles.address, { color: theme.colors.onBackground }]}>{order.location.address}</Text>

        {order.status === "prepare" && (
          <Pressable style={styles.ButtonGetOrder} onPress={onTheWay} disabled={isLoading && order.id === pendingId}>
            {isLoading && order.id === pendingId ? (
              <ActivityIndicator size={22} style={styles.ButtonText} color={theme.customColors.white} />
            ) : (
              <Text style={[styles.ButtonText, { color: theme.customColors.white }]}>Доставить</Text>
            )}
          </Pressable>
        )}

        {order.status === "on_the_way" && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: theme.customColors.btnGreen }]}
              onPress={handleCall}
            >
              <Text style={[styles.actionText, { color: theme.customColors.white }]}>📞 Позвонить</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: theme.customColors.orange }]}
              onPress={handleOpenMap}
            >
              <Text style={[styles.actionText, { color: theme.customColors.white }]}>📍 Маршрут</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
  },
  statusBadge: {
    color: "#F0F0F0",
    backgroundColor: "#4CAF50",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: "500",
  },
  client: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
  address: {
    marginTop: 2,
    fontSize: 14,
    color: "#666",
  },
  status: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "500",
    color: "#388E3C",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 14,
  },
  actionBtn: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    width: "40%",
  },
  actionText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10,
  },
  ButtonGetOrder: {
    flex: 1,
    backgroundColor: "#FFA500",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginTop: 26,
    marginBottom: 3,
  },
  ButtonText: {
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: "center",
  },
});
