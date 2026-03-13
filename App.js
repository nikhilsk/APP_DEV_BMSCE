import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <StatusBar style="auto" />
        <Text style={styles.text}>Homeeee</Text>
        <Text style={styles.text}>Line number 1</Text>
        <Text style={{marginTop: 50}}>Line number 2</Text>

        <View style={styles.card}>
      <Text style={styles.cardText}>Card Contentt</Text>
    </View>

    <Image source={Logo} style={styles.image} />
    <Image source={{ uri: 'https://s3.us-east-1.amazonaws.com/cdn.designcrowd.com/blog/25-famous-app-logos-to-keep-you-amused/Snapchat.png' }} style={styles.image} />
          
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
