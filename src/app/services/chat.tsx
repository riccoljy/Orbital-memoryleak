import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View,TextInput,Button,Keyboard,Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons,FontAwesome6 } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const chat = () => {
    const navigation = useNavigation();
    const [messages,sendMessage] = useState([]);
    const [input,setInput] = useState("");
    const {age,name,chat} = useLocalSearchParams();

    return (
        <SafeAreaView style = {styles.container}>
            <View style={styles.header}> 
                <TouchableOpacity onPress={()=>navigation.goBack()}> 
                <Ionicons name="chevron-back" size={30} color="white"/>
                </TouchableOpacity>
                <FontAwesome6 name="circle-user" size={30} color="white" style={{marginLeft:10}}/>
                <View style={{flexDirection:'column',marginLeft:5}}>
                  <Text style={styles.headerText}>{name}, {age} </Text>                  
                </View>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{bottom:-540}}
                keyboardVerticalOffset={10}>
  
                <View style={styles.inputBox}>
                    <TextInput style={styles.input}
                        placeholder='Type Message...'
                        onChangeText={setInput}
                        value={input}/>
                    <Button title="Send"/>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default chat

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#161622',
      },
      headerText: {
        fontSize: 30,
        color:'white',
        marginLeft:5,
        fontWeight:700
      },
      
      header:{
        marginTop:10,
        flexDirection:'row',
        backgroundColor:'#161622',
        borderBottomColor:'grey',
        borderBottomWidth:1,
        alignItems:'center',
        paddingBottom:15
        
      },
      inputBox: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderTopWidth:1,
        borderTopColor:'black',
        backgroundColor:'beige',
        paddingHorizontal:22,
        paddingVertical:12
      },
      input: {
        flex:1,
        height:35,
        fontSize:18
      }
})