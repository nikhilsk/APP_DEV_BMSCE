import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';

const Contact = () => {
  const [message, setMessage] = useState('');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Get in Touch</Text>
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={styles.input}
          placeholder="Type something nice..."
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
        />
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>

        <Link href="/settings" style={styles.link}>
          <Text style={styles.linkText}>Check Settings</Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 40,
    color: '#1E293B',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6366F1',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 30,
    alignSelf: 'center',
  },
  linkText: {
    color: '#64748B',
  },
});
