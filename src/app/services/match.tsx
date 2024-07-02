import {Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View,TextInput,Button,Keyboard,Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useRouter } from "expo-router";
import { Ionicons,FontAwesome6 } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const match = () => {
  const router = useRouter();
  const {matchedUser, swipername,swipedname, chatData} = useLocalSearchParams();
  const navigation = useNavigation();
  console.log('tet', chatData);
  return (
    <SafeAreaView style = {styles.container}>
      <View style={styles.header}> 
        <TouchableOpacity onPress={()=>navigation.goBack()}> 
        <Ionicons name="chevron-back" size={30} color="white"/>
        </TouchableOpacity>                     
      </View>

      <View style={{alignItems:'center',justifyContent:'center'}}>
        <View style={{flexDirection:'row',}}>
          <Text style={{fontSize:57,fontStyle:'italic',fontWeight:'bold',color:'orange',marginBottom:20}}>It's a Match</Text>
        </View>

        <Text style={{marginVertical:12,color:'white'}}>You and {swipedname} are now friends.</Text>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <View style={{flexDirection:'column'}}>
            <FontAwesome6 name="circle-user" size={80} color="white" />
            <Text style={{marginHorizontal:10}}></Text>
            <Text style={styles.name}>
              {swipername}
            </Text>
          </View>

          <Text style={{marginHorizontal:30}}></Text>

          <View style={{flexDirection:'column'}}>
            <FontAwesome6 name="circle-user" size={80} color="white" />
            <Text style={{marginHorizontal:10}}></Text>
            <Text style={styles.name}>
              {swipedname}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={() => {
            navigation.goBack();
            // router.push({ pathname: 'services/chat', params: { chatid: item.id, chatName: item.chat_name } }) //Put ChatData into here
          }}
          style={{
            padding:30,
            borderRadius:40,
            marginTop:30,
            backgroundColor:'white'
          }}
          >
          <Text style={styles.msg}>Send a Message</Text>
        </TouchableOpacity>
      </View>
      

    </SafeAreaView>
  )
}

export default match

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#003153',
  },
  
  header:{
    marginTop:10,
    flexDirection:'row',
    backgroundColor:'#003153',
    borderBottomColor:'white',
    borderBottomWidth:1,
    alignItems:'center',
    paddingBottom:15,
    marginBottom:140
    
  },
  name: {
    fontWeight:700,
    fontSize:32,
    color:'white',
    justifyContent:'center'

  },
  like: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    height: 40,
    width: 40,
  },
  msg: {
    fontWeight:'bold',
    fontSize:20,
    color:'black'
  }
})