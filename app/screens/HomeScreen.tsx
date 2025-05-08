import React from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {useGetCourierOrdersQuery} from '../services/orders/ordersApi';
import {useSelector} from 'react-redux';
import {authState} from '../../store/slices/auth';
import {AcceptedCard} from './orders/AcceptedCard';
import {ActivityIndicator} from 'react-native-paper';

export const HomeScreen = () => {
  const {user} = useSelector(authState);
  const {data, isLoading, refetch} = useGetCourierOrdersQuery(user?.id ?? 0, {
    skip: !user?.id,
  });

  if (!data)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <AcceptedCard order={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Нет новых заказов</Text>}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
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
