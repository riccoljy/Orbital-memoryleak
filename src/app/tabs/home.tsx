import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { supabase } from "@/src/supabase/supabase.js";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const HomePage = () => {
  const router = useRouter();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SELECT A SERVICE</Text>


      <TouchableOpacity 
        onPress={() =>router.push('services/meetStudents')} 
        style = {styles.input}> 
          <FontAwesome5 name="user-friends" size={24} color="black" />
          <Text style = {{marginLeft: 20, marginRight:180}}>Meet New Students</Text>
          <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>

      <br></br>

      <TouchableOpacity 
        onPress={() =>router.push('services/chatFriends')} 
        style = {styles.input}> 
          <AntDesign name="wechat" size={24} color="black" />
          <Text style = {{marginLeft: 20, marginRight:195}}>Chat With Friends</Text>
          <AntDesign name="right" size={24} color="black" />

      </TouchableOpacity>


      <Text style={styles.title}>DISCOVER</Text>

      <View style = {styles.box}>
        <Text style = {styles.name}>Alex, 21</Text>
        <br></br>
        <Text style = {styles.course}>NUS • Business analytics </Text>
        <br></br>
        <Text style = {styles.bio}>Hi, currently doing bt1101 and am looking for a study buddy to get through this mod together.</Text>
      </View>
      


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
    borderRadius:20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    padding: 20,
  },
  input: {
    height: 40,
    flexDirection: 'row',
    width: '50%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 50,
    paddingHorizontal:20,
    alignItems:'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  course: {
    fontSize: 24,
  },
  bio: {
    fontSize: 18,
    lineHeight: 25,
  },
  box: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30
    
  }
});

export default HomePage;