import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, Appearance, ScrollView, KeyboardAvoidingView,Platform } from 'react-native';
import unibudslogo from '../../assets/images/unibuds.png';
import { supabase } from "@/supabase/supabase";
import { useRouter } from "expo-router";


const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
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
    if (error) Alert.alert(error.message);
    else router.replace("/tabs/home");
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
            {/* <Text style={styles.title}>Login</Text> */}
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
              secureTextEntry={!showPassword}
            />
            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={[styles.signupText, { marginTop: 40 }]}>Don't have an account? Create account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/forgotPassword")}>
              <Text style={[styles.signupText, { marginTop: 20 }]}>Forgot password</Text>
            </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
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
  signupText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
