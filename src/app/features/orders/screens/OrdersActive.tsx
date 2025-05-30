import React from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import { authState } from "../../../../store/slices/auth";
import { AcceptedCard } from "../components/AcceptedCard";
import { ActivityIndicator } from "react-native-paper";
import { useGetCourierOrdersQuery, useUpdateOrderMutation } from "@store/services/orders/ordersApi";

export const OrdersActive = () => {
  const { user } = useSelector(authState);
  const skip = { skip: !user?.user_id };
  const { data, isLoading, refetch } = useGetCourierOrdersQuery(user?.user_id ?? 0, skip);
  const [updateOrder] = useUpdateOrderMutation();

  if (!data)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );

  const handleUpdateOrder = async (id: number, status: string) => {
    await updateOrder({
      id,
      body: {
        status,
      },
    }).unwrap();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <AcceptedCard order={item} onTheWay={() => handleUpdateOrder(item.id, "on_the_way")} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Нет активных заказов</Text>}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} colors={["#FFA500"]} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  list: {
    padding: 16,
    paddingBottom: 90,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
    fontSize: 16,
  },
  buttonWrapper: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFF",
    borderTopRightRadius: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
