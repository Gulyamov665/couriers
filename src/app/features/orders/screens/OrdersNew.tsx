import React from "react";
import { FlatList, View, Text, StyleSheet, RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "@store/services/orders/ordersApi";
import { useUpdateOrderMutation } from "@store/services/orders/ordersApi";
import { authState } from "@store/slices/auth";
import { useSocket } from "hooks/useSocket";
import { OrderCard } from "app/components/OrderCard";
import { useTheme } from "hooks/useTheme";
import ThemedView from "app/components/ThemedView";

export const OrdersNew = () => {
  const { userInfo } = useSelector(authState);
  const skip = { skip: !userInfo?.id };
  const { data, refetch, isLoading, isFetching } = useGetOrdersQuery({ id: String(userInfo?.id) }, skip);
  const [updateOrder, { isLoading: mutationLoading }] = useUpdateOrderMutation();
  const [pendingId, setPendingId] = React.useState<number | null>(null);
  const { theme } = useTheme();

  useSocket(refetch);

  const handleUpdateOrder = async (id: number, status: string) => {
    setPendingId(id);
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
  };

  return (
    <ThemedView safe style={[styles.container]}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            isLoading={mutationLoading}
            pendingId={pendingId}
            onAccept={() => handleUpdateOrder(item.id, "prepare")}
            onDecline={() => handleUpdateOrder(item.id, "canceled")}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.colors.onBackground }]}>Пока нет новых заказов</Text>
        }
        refreshControl={
          <RefreshControl refreshing={isFetching || isLoading} onRefresh={refetch} colors={["#FFA500"]} />
        }
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
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
