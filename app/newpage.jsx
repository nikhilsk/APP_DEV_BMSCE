import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { Switch } from 'react-native'
import React, { useState } from 'react'

const Newpage = () => {
    const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Newpage</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
  <Link href="/">Go to Home</Link>
</View>
  )
}

export default Newpage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    switchLabel: {
        marginRight: 10,
        fontSize: 18,
    },
})