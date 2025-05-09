import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigator';
import {OrdersType} from '@store/services/orders/types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type OrderCardProps = {
  order: OrdersType;
  onAccept: () => void;
  onDecline: () => void;
  isLoading: boolean;
};

export const OrderCard = ({
  order,
  onAccept,
  onDecline,
  isLoading,
}: OrderCardProps) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigate('OrderDetails', {id: String(order.id)})}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.orderId}>Заказ #{order.id}</Text>
          <Text style={styles.price}>
            {Number(order.total_price).toLocaleString()} сум
          </Text>
        </View>
        <View style={styles.infoBox}>
          <MaterialIcons name="person" size={20} />
          <Text style={styles.customer}> {order.created_by}</Text>
        </View>
        <View style={styles.infoBox}>
          <MaterialIcons name="location-on" size={20} />
          <Text style={styles.address}>{order.location.address}</Text>
        </View>
        <View style={styles.infoBox}>
          <MaterialIcons name="social-distance" size={20} />
          <Text style={styles.address}>{order.destination?.distance}</Text>
        </View>
        <View style={styles.infoBox}>
          <MaterialIcons name="access-time" size={20} />
          <Text style={styles.address}>{order.destination?.duration}</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.accept,
              isLoading && styles.buttonDisabled,
            ]}
            onPress={onAccept}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Принять</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.decline]}
            onPress={onDecline}>
            <Text style={styles.buttonText}>Отклонить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // elevation: 3,
    // shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  customer: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.48,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  accept: {
    backgroundColor: '#34C759',
  },
  decline: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
    backgroundColor: '#85E0A3',
  },
  infoBox: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 3,
  },
});
