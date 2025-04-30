import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {OrderCard} from '../../components/OrderCard';
import {useSocket} from '../../../hooks/useSocket';
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from '../../services/orders/ordersApi';
import {ActivityIndicator} from 'react-native-paper';
// import {useFocusEffect} from '@react-navigation/native';
// import {useCallback} from 'react';
import {useSmartRefetch} from '../../../hooks/useSmartRefetch';

export const OrdersScreen = () => {
  const {data, refetch, isLoading} = useGetOrdersQuery();
  const [updateOrder, {isLoading: updateOrderLoader}] =
    useUpdateOrderMutation();

  useSocket(data => {
    refetch();
  });

  useSmartRefetch(refetch);
  // //Переотправляем запрос при фокусе
  // useFocusEffect(
  //   useCallback(() => {
  //     refetch();
  //     // если бы нужно было что-то при анфокусе сделать — вернули бы функцию
  //     return () => {};
  //   }, [refetch]),
  // );

  const handleUpdateOrder = async (id: number, status: string) => {
    await updateOrder({id, body: {status}}).unwrap();
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

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
        ListEmptyComponent={<Text style={styles.empty}>Нет новых заказов</Text>}
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
