import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootNavigator';
import {useGetOrderByIdQuery} from '../services/orders/ordersApi';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {ActivityIndicator} from 'react-native-paper';

type OrderDetailsRouteProp = RouteProp<RootStackParamList, 'OrderDetails'>;

const statusColor = {
  new: '#FFA500',
  delivered: '#4CAF50',
  cancelled: '#F44336',
};

export const OrderDetailsScreen = () => {
  const route = useRoute<OrderDetailsRouteProp>();
  const {id} = route.params;
  const {data: order} = useGetOrderByIdQuery(id);

  if (!order) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.title}>Заказ №{order.id}</Text>

        <View style={styles.row}>
          <FontAwesome5
            name="user"
            size={18}
            color="#6B7280"
            style={styles.icon}
          />
          <View>
            <Text style={styles.label}>Клиент</Text>
            <Text style={styles.text}>{order.created_by}</Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Entypo
            name="location-pin"
            size={20}
            color="#6B7280"
            style={styles.icon}
          />
          <View>
            <Text style={styles.label}>Адрес доставки</Text>
            <Text style={styles.text}>Улица Мустакиллик</Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <FontAwesome5
            name="money-bill-wave"
            size={18}
            color="#6B7280"
            style={styles.icon}
          />
          <View>
            <Text style={styles.label}>Сумма</Text>
            <Text style={[styles.text, styles.price]}>
              {order.total_price} ₽
            </Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <MaterialIcons
            name="local-shipping"
            size={20}
            color="#6B7280"
            style={styles.icon}
          />
          <View>
            <Text style={styles.label}>Статус</Text>
            <Text style={[styles.text, {color: statusColor['new']}]}>
              {order.status === 'new'
                ? 'Новый'
                : order.status === 'delivered'
                ? 'Доставлен'
                : 'Отменён'}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <MaterialIcons
            name="event"
            size={20}
            color="#6B7280"
            style={styles.icon}
          />
          <View>
            <Text style={styles.label}>Дата заказа</Text>
            <Text style={styles.text}>
              {new Date(order.created_at).toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />

        <View>
          <Text style={styles.label}>Состав заказа</Text>
          {order.products.map(product => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productRow}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productQty}>x{product.quantity}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FAFB',
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    marginBottom: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    color: '#111827',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  text: {
    fontSize: 16,
    color: '#111827',
  },
  price: {
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productCard: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  productName: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productQty: {
    fontSize: 15,
    color: '#6B7280',
  },
});
