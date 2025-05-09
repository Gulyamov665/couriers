// import React from 'react';
// import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
// import {OrdersType} from '../../services/orders/types';

// export type AcceptedCardProps = {
//   order: OrdersType;
// };

// export const AcceptedCard: React.FC<AcceptedCardProps> = ({order}) => {
//   const handleCall = () => {
//     Linking.openURL(`tel:${998934733223}`);
//   };

//   const handleOpenMap = () => {
//     const query = encodeURIComponent(order.location.address);
//     Linking.openURL(`geo:0,0?q=${query}`);
//   };

//   return (
//     <View style={styles.card}>
//       <View style={styles.header}>
//         <Text style={styles.orderNumber}>Заказ #{order.id}</Text>
//         <Text style={styles.statusBadge}>Принят</Text>
//       </View>

//       <Text style={styles.client}>Клиент: {order.created_by}</Text>
//       <Text style={styles.address}>{order.location.address}</Text>
//       <Text style={styles.status}>Статус: В пути</Text>

//       <View style={styles.actions}>
//         <TouchableOpacity style={styles.actionBtn} onPress={handleCall}>
//           <Text style={styles.actionText}>📞 Позвонить</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionBtn} onPress={handleOpenMap}>
//           <Text style={styles.actionText}>📍 Маршрут</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#ffff', // светло-зелёный фон
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   orderNumber: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#212121',
//   },
//   statusBadge: {
//     backgroundColor: '#E8F5E9',
//     color: '#fff',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   client: {
//     marginTop: 6,
//     color: '#333',
//   },
//   address: {
//     color: '#757575',
//     marginBottom: 4,
//   },
//   status: {
//     color: '#388E3C',
//     fontWeight: '500',
//     marginBottom: 10,
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   actionBtn: {
//     backgroundColor: '#C8E6C9',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//   },
//   actionText: {
//     color: '#2E7D32',
//     fontWeight: '600',
//   },
// });
import {OrdersType} from '@store/services/orders/types';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';

export type AcceptedCardProps = {
  order: OrdersType;
};

export const AcceptedCard: React.FC<AcceptedCardProps> = ({order}) => {
  const handleCall = () => {
    Linking.openURL(`tel:${+998934733223}`);
  };

  const handleOpenMap = () => {
    const query = encodeURIComponent(order.location.address);
    Linking.openURL(`geo:0,0?q=${query}`);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.orderNumber}>Заказ #{order.id}</Text>
        <Text style={styles.statusBadge}>Принят</Text>
      </View>

      <Text style={styles.client}>Клиент: {order.created_by}</Text>
      <Text style={styles.address}>{order.location.address}</Text>
      <Text style={styles.status}>Статус: В пути</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleCall}>
          <Text style={styles.actionText}>📞 Позвонить</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={handleOpenMap}>
          <Text style={styles.actionText}>📍 Маршрут</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: '#F0F0F0',
    color: '#4CAF50',
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
