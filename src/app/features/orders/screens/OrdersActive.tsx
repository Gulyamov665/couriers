import React from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import { authState } from "../../../../store/slices/auth";
import { AcceptedCard } from "../components/AcceptedCard";
import { ActivityIndicator } from "react-native-paper";
import { useGetCourierOrdersQuery, useUpdateOrderMutation } from "@store/services/orders/ordersApi";
import { useTheme } from "hooks/useTheme";
import ThemedView from "app/components/ThemedView";

export const OrdersActive = () => {
  const { user } = useSelector(authState);
  const skip = { skip: !user?.user_id };
  const { data, isLoading, refetch } = useGetCourierOrdersQuery(user?.user_id ?? 0, skip);
  const [updateOrder, { isLoading: mutationLoading }] = useUpdateOrderMutation();
  const [pendingId, setPendingId] = React.useState<number | null>(null);

  const { theme } = useTheme();

  if (!data)
    return (
      <View style={[styles.centered, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );

  const handleUpdateOrder = async (id: number, status: string) => {
    setPendingId(id);
    await updateOrder({
      id,
      body: {
        status,
      },
    }).unwrap();
  };

  return (
    <ThemedView safe style={[styles.container]}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <AcceptedCard
            order={item}
            onTheWay={() => handleUpdateOrder(item.id, "on_the_way")}
            pendingId={pendingId}
            isLoading={mutationLoading}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.colors.onBackground }]}>Нет активных заказов</Text>
        }
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} colors={["#FFA500"]} />}
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
    paddingBottom: 90,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
