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
import Swiper from "react-native-deck-swiper";

const sampleData = [
  {
    name: 'Alex',
    id:1,
    age: 21,
    uni:'NUS',
    course: 'Business Analytics',
    bio: 'Hi, currently doing bt1101 and am looking for a study buddy to get through this mod together.'


  },
  ,
  {
    name: 'Emma',
    id:2,
    age: 22,
    uni: 'NTU',
    course: 'Computer Science',
    bio: 'Hey there! I am taking CS2100 and would love to form a study group. Let’s ace this together!'
  },
  {
    name: 'John',
    id:3,
    age: 20,
    uni: 'SMU',
    course: 'Economics',
    bio: 'Hello! Currently enrolled in EC101. Looking for someone to discuss and study with. Let’s help each other out!'
  },
  {
    name: 'Sophia',
    id:4,
    age: 23,
    uni: 'NUS',
    course: 'Mechanical Engineering',
    bio: 'Hi everyone! I am in ME2135 this semester and would love to find a study partner. Let’s tackle this module together!'
  }
]
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
              <Text style = {styles.service1}>Filter Students</Text>
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
        <View style={{flex:1}}>
        
          <Swiper
            cards={sampleData}
            containerStyle={{backgroundColor:'transparent'}}
            cardIndex={0}
            animateCardOpacity
            stackSize={5}
            verticalSwipe={false}
            renderCard={(card)=>{
              return card ? (
                <View key={card.id} style={styles.card}>
                  <View style={styles.cardDet}>
                    <Text style={styles.name}>{card.name},{card.age}</Text>
                    <br></br>
                    <Text style = {styles.course}>{card.uni} • {card.course}</Text>
                    <br></br>
                    <Text style = {styles.bio}>{card.bio}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.noCards}>
                  <Text style={styles.noText}>No More Students</Text>
                </View>

              )
            }}
          />
        </View>

        <View style = {styles.like}>
            <TouchableOpacity>
              <Image source={dislike} style = {styles.image}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={like} style = {styles.image}/>
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
  },
  course: {
    fontSize: 24,
  },
  bio: {
    fontSize: 18,
  },
  like: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 120,
    width: 120,
    marginHorizontal: 10,
  },
  card:{
    backgroundColor:'white',
    height:'40%',
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:20,
  },
  noCards: {
    backgroundColor: 'white',
    height: '40%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:20,
    
  },
  cardDet:{
    position:'absolute',
    backgroundColor:'white',
    width:'100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    
   
  },
  noText:{
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 20,
  }
});

export default HomePage;
