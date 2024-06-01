import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import unibudslogo from '@/assets/images/unibuds.png';
import { supabase } from "@/src/supabase/supabase.js";
import { useRouter } from "expo-router";



const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("session =", session);
      if (session) {
        router.replace("/tabs/home");
      }
    };
    checkSession();
  }, [router]);



  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    console.log('hi', email, password, data, error);
    if (error) Alert.alert(error.message);
    else router.replace("/tabs/home");
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
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.signupText}>Don't have an account? Create account</Text>
      </TouchableOpacity>

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
    width: '50%',
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
  signupText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginPage;