
import { Stack } from "expo-router";
import { Text, View } from '@/components/Themed';

export default function RootLayout() {
  return (
    
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" 
      options={({title: 'Sign in'})}
      />
      <Stack.Screen name="signup"
      options={({title: 'Registration'})}></Stack.Screen>
      <Stack.Screen name="forgotPassword"
      options={({title: 'Forgot Password'})}></Stack.Screen>
    </Stack>
  );
}
