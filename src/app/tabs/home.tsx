import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { supabase } from "@/src/supabase/supabase.js";
import Colors from '../../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const HomePage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SELECT A SERVICE</Text>


      <TouchableOpacity 
        onPress={() =>navigation.navigate('meetStudents')} 
        style = {styles.input}> 
          <FontAwesome5 name="user-friends" size={24} color="black" />
          <Text style = {{marginLeft: 20, marginRight:180}}>Meet New Students</Text>
          <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>

      <br></br>

      <TouchableOpacity 
        onPress={() =>navigation.navigate('chatFriends')} 
        style = {styles.input}> 
          <AntDesign name="wechat" size={24} color="black" />
          <Text style = {{marginLeft: 20, marginRight:180}}>Chat With Friends</Text>
          <AntDesign name="right" size={24} color="black" />

      </TouchableOpacity>


      <Text style={styles.title}>DISCOVER</Text>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
    borderRadius:20,
    backgroundColor:'lightpink'
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
});

export default HomePage;