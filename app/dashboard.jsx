import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';

const Dashboard = () => {
  const categories = [
    { id: 1, title: 'Health', color: '#FF6B6B' },
    { id: 2, title: 'Work', color: '#4ECDC4' },
    { id: 3, title: 'Finance', color: '#45B7D1' },
    { id: 4, title: 'Social', color: '#96CEB4' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Here is your daily summary</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: '#EEF2FF' }]}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Tasks</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#FFF7ED' }]}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Events</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.grid}>
        {categories.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.categoryCard, { backgroundColor: item.color }]}
          >
            <Text style={styles.categoryText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Link href="/" style={styles.backLink}>
        <Text style={styles.linkText}>← Back to Intro</Text>
      </Link>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  statLabel: {
    color: '#64748B',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#1E293B',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backLink: {
    marginTop: 20,
    marginBottom: 40,
    alignSelf: 'center',
  },
  linkText: {
    color: '#6366F1',
    fontWeight: '600',
  },
});
