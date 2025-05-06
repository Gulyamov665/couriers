import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {Card} from 'react-native-paper';

const orders = [
  {id: '1', date: '06.05.2025', address: 'Ул. Ленина, 10', price: 350},
  {id: '2', date: '06.05.2025', address: 'Ул. Пушкина, 25', price: 450},
  {id: '3', date: '05.05.2025', address: 'Ул. Гагарина, 7', price: 500},
];

export const OrderHistory = () => {
  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      renderItem={({item}) => (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.address}>📍 {item.address}</Text>
            <Text style={styles.price}>💰 {item.price}₽</Text>
          </Card.Content>
        </Card>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 50,
  },
  card: {
    marginBottom: 12,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  address: {
    fontSize: 15,
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    color: 'green',
  },
});
