import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Card} from 'react-native-paper';

export const CourierDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Привет, Алексей 👋</Text>

      <Card style={styles.card}>
        <Card.Title title="Текущий заказ" />
        <Card.Content>
          <Text>📍 Адрес: Ул. Ленина, 10</Text>
          <Text>⏰ До сдачи: 12 мин</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => {}}>
            Я на месте
          </Button>
        </Card.Actions>
      </Card>

      <View style={styles.stats}>
        <Text style={styles.statsText}>🚚 3 заказа • 7.6 км • 1200₽</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  greeting: {fontSize: 22, fontWeight: '600', marginBottom: 20},
  card: {marginBottom: 16},
  stats: {marginTop: 'auto', alignItems: 'center'},
  statsText: {fontSize: 16, color: '#555'},
});
