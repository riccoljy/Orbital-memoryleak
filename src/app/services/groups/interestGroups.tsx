import { Alert,StyleSheet, Text,TouchableOpacity, TextInput, View, Button, Appearance, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { supabase } from "@/src/supabase/supabase.js";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router';
import { Ionicons,FontAwesome6 ,Entypo} from '@expo/vector-icons';
import { useRouter,useLocalSearchParams } from 'expo-router';

const interestGroups = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const {name,descrip} = useLocalSearchParams(); 
    const [id,setId] = useState(null);

    useEffect(() => {
      const getUser = async() => {
          const { data: { user }, error } = await supabase.auth.getUser();
          console.log(user?.email)
          setId(user?.id);

          if (name && descrip &&id) {
            const { data, error } = await supabase 
              .rpc('create_group',{group_id:id,name:name,descrip:descrip})
            Alert.alert('Group created successfully.')
          }
      }
      getUser();
      
      },[name,descrip,id])
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.header}> 
          <TouchableOpacity onPress={()=>navigation.goBack()}> 
              <Ionicons name="chevron-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Find Interest Groups</Text>
        </View>

        <View>
          <TouchableOpacity style={styles.button} 
            onPress={() => router.push({pathname:'services/groups/createGroup'})} >
            <Text style={{fontSize: 18,fontWeight:'600'}}>Create a New Group</Text>
          </TouchableOpacity>

        </View>
        
    </SafeAreaView>
  )
}

export default interestGroups

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
      
    },
    button: {
      marginTop:50,
      marginHorizontal:50,
      paddingVertical:15,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      padding:10,
      borderRadius:20,
      backgroundColor:'#D3D3D3',
  },
  })