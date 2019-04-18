import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PushNotification from 'react-native-push-notification';
import Installation from "./Installation";

export default class App extends Component {
  componentDidMount() {
    PushNotification.configure({
        onRegister({ token }) {
            Installation(token);
        },
        onNotification(notification) {
            console.log( 'NOTIFICATION:', notification );
        },
        permissions: {
        alert: true,
        badge: true,
        sound: true
        },
        requestPermissions: true
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Parse Push Notification example.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  picker: {
    width: 100,
  },
});
