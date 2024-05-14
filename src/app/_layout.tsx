import { Stack } from "expo-router";
import { Text, View } from '@/components/Themed';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" 
      options={({title: 'Login'})}
      />
      <Stack.Screen name="signup"></Stack.Screen>
    </Stack>
  );
}
