import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View,TextInput,Button,Keyboard,Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router';
import { Ionicons,FontAwesome6 } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const chat = () => {
    const navigation = useNavigation();
    const [messages,sendMessage] = useState([]);
    const [input,setInput] = useState("");

    return (
        <SafeAreaView style = {styles.container}>
            <View style={styles.header}> 
                <TouchableOpacity onPress={()=>navigation.goBack()}> 
                <Ionicons name="chevron-back" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Alex</Text>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{bottom:-680}}
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
        marginLeft:10,
        fontWeight:700
      },
      
      header:{
        marginTop:10,
        flexDirection:'row',
        backgroundColor:'#161622',
        
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