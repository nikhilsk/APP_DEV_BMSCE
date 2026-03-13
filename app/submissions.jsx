import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getSubmissions } from '../lib/appwrite';

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getSubmissions().then(setSubmissions);
  }, []);

  return (
    <FlatList
      data={submissions}
      keyExtractor={(item) => item.$id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<Text style={styles.title}>Submissions</Text>}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.sub}>{item.email}</Text>
          <Text style={styles.sub}>{item.course}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 24, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  card: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 16, marginBottom: 12 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  sub: { fontSize: 14, color: '#64748B', marginTop: 4 },
});
