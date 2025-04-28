import React from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // Моментально показываем Alert на устройстве
    Alert.alert(
      'Ошибка',
      error.message || 'Что-то пошло не так',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('Пользователь закрыл алерт')
          },
        },
      ],
      { cancelable: true }
    )
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Что-то пошло не так :(</Text>
          <Text style={styles.message}>{this.state.error?.message}</Text>
          <Button title="Перезапустить" onPress={this.handleReload} />
        </View>
      )
    }

    return this.props.children
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#dc2626',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#334155',
  },
})
