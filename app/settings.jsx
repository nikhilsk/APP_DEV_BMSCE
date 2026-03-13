import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const Settings = () => {
  const options = [
    { id: '1', title: 'Notifications', description: 'Manage push alerts' },
    { id: '2', title: 'Privacy', description: 'Control your data' },
    { id: '3', title: 'Security', description: 'Passwords and 2FA' },
    { id: '4', title: 'Help & Support', description: 'FAQs and contact us' },
    { id: '5', title: 'About', description: 'Version 1.0.4' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.optionItem}>
      <View>
        <Text style={styles.optionTitle}>{item.title}</Text>
        <Text style={styles.optionDesc}>{item.description}</Text>
      </View>
      <Text style={styles.chevron}>→</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <FlatList
        data={options}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <Link href="/profile" style={styles.backLink}>
        <Text style={styles.linkText}>Back to Profile</Text>
      </Link>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 20,
    color: '#1A1A1A',
  },
  list: {
    paddingHorizontal: 20,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  optionDesc: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: '#CCC',
  },
  backLink: {
    padding: 30,
    alignSelf: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
  },
});
