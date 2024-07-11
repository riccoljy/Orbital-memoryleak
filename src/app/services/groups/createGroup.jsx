import { StyleSheet, Text,TouchableOpacity, TextInput, View, Button, Appearance, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { supabase } from "@/src/supabase/supabase.js";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router';
import { Ionicons,FontAwesome6 ,Entypo} from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const createGroup = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const colorScheme = Appearance.getColorScheme();
    const placeholderColor = colorScheme === 'dark' ? '#ccc' : '#888';
    const [name, setName] = useState('');
    const [descrip,setDescrip] = useState('');
   

    

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}> 
          <TouchableOpacity onPress={()=>navigation.goBack()}> 
              <Ionicons name="chevron-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Create Group</Text>
        </View>

        <View style={{marginHorizontal:20}}>
            <Text style={styles.label}>Group Name</Text>
                <TextInput
                style={styles.input}
                placeholder="Group Name e.g. 'CS1010 Study Group'"
                placeholderTextColor={placeholderColor}
                value={name}
                autoCapitalize='none'
                onChangeText={setName}
            />
            <Text style={{marginVertical:10}}></Text>

            <Text style={styles.label}>Description</Text>
                <TextInput
                style={styles.input2}
                placeholder="Brief Description e.g. 'Weekly study sessions every wed at CLB.'"
                placeholderTextColor={placeholderColor}
                value={descrip}
                autoCapitalize='none'
                onChangeText={setDescrip}
                multiline
            />

            <TouchableOpacity style={styles.button} 
                onPress={() => {
                    navigation.goBack();
                    navigation.goBack();
                    router.push({
                        pathname:'services/groups/interestGroups',
                        params:{
                            name:name,
                            descrip:descrip,
                        },
                    })
                } } >
                <Text style={{fontSize: 18,fontWeight:'600'}}>Create Group</Text>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
  )
}

export default createGroup

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#161622',
        flex:1
      },
      headerText: {
        fontSize: 27,
        color:'white',
        marginLeft:10
      },
      
      header:{
        marginTop:10,
        flexDirection:'row',
        backgroundColor:'#161622',
        marginBottom:40
        
      },
      label: {
        fontSize: 16,
        marginBottom: 8,
        color: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        color: '#000',
    },
    input2: {
        height: 80,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        color: '#000',
    },
    button: {
        marginTop:50,
        marginHorizontal:50,
        paddingVertical:30,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        borderRadius:20,
        backgroundColor:'#D3D3D3',
    },
})