import React from 'react';
import {FlatList, View, Text, StyleSheet, RefreshControl} from 'react-native';
import {OrderCard} from '../../components/OrderCard';
import {useSocket} from '../../../hooks/useSocket';
import {useSelector} from 'react-redux';
import {authState} from '../../../store/slices/auth';
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from '@store/services/orders/ordersApi';

export const OrdersScreen = () => {
  const {data, refetch, isLoading, isFetching} = useGetOrdersQuery();
  const {user} = useSelector(authState);
  const [updateOrder, {isLoading: updateOrderLoader}] =
    useUpdateOrderMutation();

  useSocket(refetch);

  const handleUpdateOrder = async (id: number, status: string) => {
    await updateOrder({
      id,
      body: {
        status,
        courier: {
          id: user?.id,
          username: `${user?.first_name}  ${user?.last_name}`,
          phone_number: user?.phone,
        },
      },
    }).unwrap();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <OrderCard
            order={item}
            isLoading={updateOrderLoader}
            onAccept={() => handleUpdateOrder(item.id, 'prepare')}
            onDecline={() => handleUpdateOrder(item.id, 'canceled')}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Пока нет новых заказов</Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={isFetching || isLoading}
            onRefresh={refetch}
            colors={['#FFA500']}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 70,
  },
  list: {
    padding: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
    fontSize: 16,
  },
  buttonWrapper: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFF',
    borderTopRightRadius: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
