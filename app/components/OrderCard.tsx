// import React from 'react'
// import { View, Text, StyleSheet } from 'react-native'
// import { Order } from '../types/order'
// import { useNavigation } from '@react-navigation/native'
// import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// import { RootStackParamList } from '../navigation/RootNavigator'
// import { TouchableOpacity } from 'react-native'

// interface Props {
//   order: Order
// }

// const statusColor = {
//   new: '#FFA500',
//   delivered: '#4CAF50',
//   cancelled: '#F44336',
// }

// export const OrderCard = ({ order }: Props) => {
//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootStackParamList>>()
//   return (
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate('OrderDetails', { id: String(order.id) })
//       }
//     >
//       <View style={styles.card}>
//         <Text style={styles.name}>Номер заказа №{order.id}</Text>
//         <Text style={styles.name}>{order.created_by}</Text>
//         <Text>{'Ул. Мустакллик 1-84'}</Text>
//         <Text style={styles.price}>Сумма: {order.total_price} ₽</Text>
//         <Text style={{ color: statusColor['new'] }}>
//           Статус:{' '}
//           {order.status === 'new'
//             ? 'Новый'
//             : order.status === 'delivered'
//             ? 'Доставлен'
//             : 'Отменён'}
//         </Text>
//         <Text style={styles.date}>
//           {new Date(order.created_at).toLocaleString()}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   )
// }

// const styles = StyleSheet.create({
//   card: {
//     padding: 16,
//     borderRadius: 12,
//     backgroundColor: '#fff',
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   name: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   price: {
//     marginTop: 4,
//     fontWeight: '600',
//   },
//   date: {
//     marginTop: 4,
//     fontSize: 12,
//     color: '#888',
//   },
// })

// components/OrderCard.tsx

import React, { useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native'
import { Order } from '../types/order'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/RootNavigator'

type OrderCardProps = {
  order: Order
  onAccept: () => void
  onDecline: () => void
}

export const OrderCard = ({ order, onAccept, onDecline }: OrderCardProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const translateY = useRef(new Animated.Value(0)).current

  const handlePressIn = () => {
    Animated.spring(translateY, {
      toValue: -4, // немного приподнимаем
      useNativeDriver: true,
      speed: 50,
      bounciness: 5,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      speed: 50,
      bounciness: 5,
    }).start()
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('OrderDetails', { id: String(order.id) })
      }
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.orderId}>Заказ #{order.id}</Text>
          <Text style={styles.price}>{order.total_price} сум</Text>
        </View>

        <Text style={styles.customer}>{order.created_by}</Text>
        <Text style={styles.address}>{'order.address'}</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, styles.accept]}
            onPress={onAccept}
          >
            <Text style={styles.buttonText}>Принять</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.decline]}
            onPress={onDecline}
          >
            <Text style={styles.buttonText}>Отклонить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

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
    shadowOffset: { width: 0, height: 4 },
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
})
