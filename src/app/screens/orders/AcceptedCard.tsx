import React from 'react';
import {OrdersType} from '@store/services/orders/types';
import {View, Text, Linking, Platform, Pressable} from 'react-native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {OrderStatus} from 'common/OrderStatuses';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'app/navigation/RootNavigator';

export type AcceptedCardProps = {
  order: OrdersType;
};

export const AcceptedCard: React.FC<AcceptedCardProps> = ({order}) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCall = () => {
    Linking.openURL(`tel:${'+998934733223'}`);
  };

  const handleOpenMap = () => {
    const {lat, long} = order.location;

    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${lat},${long}`,
      android: `geo:${lat},${long}?q=${lat},${long}`,
    });
    if (url) Linking.openURL(url);
  };

  return (
    <Pressable
      onPress={() =>
        navigate('OrderDetails', {
          id: String(order.id),
        })
      }>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.orderNumber}>Заказ #{order.id}</Text>
          <OrderStatus status={order.status} />
        </View>

        <Text style={styles.client}>Клиент: {order.created_by}</Text>
        <Text style={styles.address}>{order.location.address}</Text>
        {/* <Text style={styles.status}>Статус: В пути</Text> */}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleCall}>
            <Text style={styles.actionText}>📞 Позвонить</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={handleOpenMap}>
            <Text style={styles.actionText}>📍 Маршрут</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  statusBadge: {
    color: '#F0F0F0',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  client: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  address: {
    marginTop: 2,
    fontSize: 14,
    color: '#666',
  },
  status: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '500',
    color: '#388E3C',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
    marginTop: 14,
  },
  actionBtn: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  actionText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
  },
});
