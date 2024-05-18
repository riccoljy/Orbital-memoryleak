
import { Stack } from "expo-router";
import { Text, View } from '@/components/Themed';

export default function RootLayout() {
  return (
    
    <Stack>
      <Stack.Screen name="sign-in" 
      options={({title: 'Sign in'})}
      />
      <Stack.Screen name="signup"
      options={({title: 'Registration'})}></Stack.Screen>
    </Stack>
  );
}
