import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { useGetOrderByIdQuery } from "@store/services/orders/ordersApi";
import { useUpdateOrderMutation } from "@store/services/orders/ordersApi";
import { authState } from "@store/slices/auth";
import { useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OrderStatus } from "common/OrderStatuses";
import { RootStackParamList } from "app/navigation/RootNavigator";
import { useTheme } from "hooks/useTheme";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";

type OrderDetailsRouteProp = RouteProp<RootStackParamList, "OrderDetails">;

export const OrderDetailsScreen = () => {
  const route = useRoute<OrderDetailsRouteProp>();
  const { id } = route.params;
  const { data: order } = useGetOrderByIdQuery(id);
  const [updateOrder] = useUpdateOrderMutation();
  const { userInfo } = useSelector(authState);
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();

  if (!order) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  const handleUpdateOrder = async (id: number, status: string) => {
    await updateOrder({
      id,
      body: {
        status,
        courier: {
          id: userInfo?.id,
          username: `${userInfo?.first_name}  ${userInfo?.last_name}`,
          phone_number: userInfo?.phone,
        },
      },
    }).unwrap();
    navigate("OrdersList");
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.card, { backgroundColor: theme.colors.onPrimary }]}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>Заказ №{order.id}</Text>

        <View style={styles.row}>
          <FontAwesome5 name="user" size={18} color={theme.colors.onBackground} style={styles.icon} />
          <View>
            <Text style={[styles.label, { color: theme.colors.onBackground }]}>Клиент</Text>
            <Text style={[styles.text, { color: theme.colors.onBackground }]}>{order.created_by}</Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Entypo name="location-pin" size={20} style={styles.icon} color={theme.colors.onBackground} />
          <View>
            <Text style={[styles.label, { color: theme.colors.onBackground }]}>Адрес доставки</Text>
            <Text style={[styles.text, { color: theme.colors.onBackground }]}>Улица Мустакиллик</Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <FontAwesome5 name="money-bill-wave" size={18} color={theme.colors.onBackground} style={styles.icon} />
          <View>
            <Text style={[styles.label, { color: theme.colors.onBackground }]}>Сумма</Text>
            <Text style={[styles.text, styles.price, , { color: theme.colors.onBackground }]}>
              {order.total_price} ₽
            </Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <MaterialIcons name="local-shipping" size={20} color={theme.colors.onBackground} style={styles.icon} />
          <View>
            <Text style={[styles.label, { color: theme.colors.onBackground }]}>Статус</Text>
            <OrderStatus status={order.status} />
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <MaterialIcons name="event" size={20} color={theme.colors.onBackground} style={styles.icon} />
          <View>
            <Text style={[styles.label, { color: theme.colors.onBackground }]}>Дата заказа</Text>
            <Text style={[styles.text, { color: theme.colors.onBackground }]}>
              {new Date(order.created_at).toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View>
          <Text style={[styles.label, { color: theme.colors.onBackground }]}>Состав заказа</Text>
          {order.products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productRow}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productQty}>x{product.quantity}</Text>
              </View>
            </View>
          ))}
        </View>
        {order.status === "awaiting_courier" && (
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.accept]}
              onPress={() => handleUpdateOrder(parseInt(id), "prepare")}
            >
              <Text style={styles.buttonText}>Принять</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.decline]}
              onPress={() => handleUpdateOrder(parseInt(id), "canceled")}
            >
              <Text style={styles.buttonText}>Отклонить</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,

    flexGrow: 1,
    marginBottom: 50,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 24,
    color: "#111827",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  text: {
    fontSize: 16,
    color: "#111827",
  },
  price: {
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productCard: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  productName: {
    fontSize: 15,
    color: "#1F2937",
    fontWeight: "500",
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productQty: {
    fontSize: 15,
    color: "#6B7280",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 0.48,
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
});
