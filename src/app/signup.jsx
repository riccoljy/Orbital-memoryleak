import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, Appearance, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import unibudslogo from '@/assets/images/unibuds.png';
import { supabase } from "@/src/supabase/supabase.js";
import { useRouter } from "expo-router";


const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const router = useRouter();

  async function handleRegister() {

    if (password !== password2) {
      Alert.alert("Error", "Passwords don't match");
      return;
    }
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    const { data, error } = await supabase.auth.signUp({

      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          new_user: true,
        }
      }
    })
    if (!error) {
      Alert.alert("Please check your inbox for verification");
      router.back();
    }
    
    else Alert.alert(error.message)

  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled' style={styles.container}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, }}>
          <Image source={unibudslogo} style={styles.logo} />
          <Text style={{
            color: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="First name"
            placeholderTextColor="#888"
            onChangeText={setFirstName}
            value={firstName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            placeholderTextColor="#888"
            onChangeText={setLastName}
            value={lastName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password again"
            placeholderTextColor="#888"
            onChangeText={setPassword2}
            value={password2}
            secureTextEntry
          />
          <Button title="Register" onPress={handleRegister} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Appearance.getColorScheme() === 'dark' ? '#161622' : '#e7e7e8',
    padding: 16,
  },

  input: {
    color: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
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
});

export default Registration;