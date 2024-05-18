import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from "@/src/supabase/supabase.js";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import like from '@/assets/images/like.png';
import dislike from '@/assets/images/dislike.png';


const HomePage = () => {
  const router = useRouter();
  const navigation = useNavigation();
  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
          <Text style={styles.title}>SELECT A SERVICE</Text>


          <TouchableOpacity 
            onPress={() =>router.push('services/meetStudents')} 
            style = {styles.input}> 
              <FontAwesome5 name="user-friends" size={30} color="#D3D3D3" />
              <Text style = {styles.service1}>Meet New Students</Text>
              <AntDesign name="right" size={30} color="#D3D3D3" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() =>router.push('services/chatFriends')} 
            style = {styles.input}> 
              <AntDesign name="wechat" size={30} color="#D3D3D3" />
              <Text style = {styles.service2}>Chat With Friends</Text>
              <AntDesign name="right" size={30} color="#D3D3D3" />

          </TouchableOpacity>

          <br></br>
          <Text style={styles.title}>DISCOVER</Text>

        <View style = {styles.box}>
            <Text style = {styles.name}>Alex, 21</Text>
            <br></br>
            <Text style = {styles.course}>NUS • Business analytics </Text>
            <br></br>
            <Text style = {styles.bio}>Hi, currently doing bt1101 and am looking for a study buddy to get through this mod together.</Text>
        </View> 

        <View style = {styles.like}>
            <TouchableOpacity>
              <Image source={like} style = {styles.image}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={dislike} style = {styles.image}/>
            </TouchableOpacity>
        </View>

      </ScrollView>


    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  service1: {
    marginLeft: 20,
     marginRight:300,
     fontSize:18,
     color:'#D3D3D3'
  },
  service2: {
    marginLeft: 20,
     marginRight:319,
     fontSize:18,
     color:'#D3D3D3'
  },
  container: {
    flex: 1,
    backgroundColor:'#161622',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    padding: 20,
    color:'#D3D3D3'
  },
  input: {
    height: 40,
    flexDirection: 'row',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal:20,
    paddingVertical: 50,
    paddingHorizontal:20,
    alignItems:'center',
  },
  box: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom:40,
    marginHorizontal:20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'#D3D3D3'
  },
  course: {
    fontSize: 24,
    color:'#D3D3D3'
  },
  bio: {
    fontSize: 18,
    lineHeight: 25,
    color:'#D3D3D3'
  },
  like: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 100,
    width: 100,
    marginHorizontal: 10,
  },
});

export default HomePage;