import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' }} 
          style={styles.avatar} 
        />
        <Text style={styles.name}>Alex Johnson</Text>
        <Text style={styles.bio}>Product Designer & Enthusiast</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>alex@example.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location</Text>
          <Text style={styles.infoValue}>New York, NY</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <Link href="/dashboard" style={styles.link}>
        <Text style={styles.linkText}>Go to Dashboard</Text>
      </Link>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#F1F5F9',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  bio: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 4,
  },
  infoSection: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  infoLabel: {
    color: '#64748B',
    fontWeight: '500',
  },
  infoValue: {
    color: '#0F172A',
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#0F172A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    alignSelf: 'center',
  },
  linkText: {
    color: '#6366F1',
  },
});
