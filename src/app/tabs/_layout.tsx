
import { Stack } from "expo-router";
import { Text, View } from '@/components/Themed';

export default function RootLayout() {
  return (
    
    <Stack>
      <Stack.Screen name="home" 
      options={({title: 'Home'})}
      />
    </Stack>
  );
}
