import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import unibudslogo from '@/assets/images/unibuds.png';
import { supabase } from "@/src/supabase/supabase.js";


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    //WIP -- Supabase/MongoDB user authentication
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    console.log('hi', error);
    if (error) Alert.alert(error.message)

    Alert.alert('Login Failed', 'Invalid email or password. Please try again.');

  };

  return (
    <View style={styles.container}>
      <Image source={unibudslogo} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default LoginPage;