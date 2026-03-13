import { StyleSheet, Text, View, Image } from 'react-native'
import { Link } from 'expo-router'
import Logo from '../assets/icon.png'

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Link href="/dashboard" style={styles.navLink}>Go to Dashboard</Link>
        <Link href="/profile" style={styles.navLink}>View Profile</Link>
        <Link href="/settings" style={styles.navLink}>Settings</Link>
        <Link href="/contact" style={styles.navLink}>Contact Us</Link>
        <Link href="/form" style={styles.navLink}>📝 Register Form</Link>
        <Link href="/submissions" style={styles.navLink}>📋 Submissions</Link>
        <Link href="/newpage" style={styles.navLink}>New Page</Link>
      </View>
    </View>
  )
}

export default Home

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
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  card: {
    width: 200,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  cardText: {
    fontSize: 18,
  },
  navigation: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  navLink: {
    fontSize: 18,
    color: '#6366F1',
    marginVertical: 8,
    fontWeight: '500',
  },
})