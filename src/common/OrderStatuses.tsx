import React from "react";
import { StyleSheet, Text } from "react-native";

interface OrderStatusProps {
  status: string;
}

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  switch (status) {
    case "new":
      return <Text style={styles.statusBadgeNew}>Новый</Text>;
    case "completed":
      return <Text style={styles.statusBadgeCompleted}>Готово</Text>;
    case "on_the_way":
      return <Text style={styles.statusBadgeCompleted}>Доставляется</Text>;
    case "awaiting_courier":
      return <Text style={styles.statusBadgeWait}>Ожидание курьера</Text>;
    case "canceled":
      return <Text style={styles.statusBadgeCanceled}>Отменен</Text>;
    case "prepare":
      return <Text style={styles.statusBadgeWait}>Готовиться</Text>;
    default:
      return <Text style={styles.statusBadgeNew}>"Неизвестно"</Text>;
  }
};

const styles = StyleSheet.create({
  statusBadgeNew: {
    color: "#F0F0F0",
    backgroundColor: "#4CAF50",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: "500",
  },
  statusBadgeCompleted: {
    color: "#ffff",
    backgroundColor: "blueviolet",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: "500",
  },
  statusBadgeWait: {
    color: "#ffff",
    backgroundColor: "#FFA500",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: "500",
  },
  statusBadgeCanceled: {
    color: "#ffff",
    backgroundColor: "red",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: "500",
  },
});
