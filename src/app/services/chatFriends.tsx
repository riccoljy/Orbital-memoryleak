import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router';
import { Ionicons,FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const chatFriends = () => {
  const navigation = useNavigation();
  const router = useRouter();
  return (
    <SafeAreaView style = {styles.container}>
      <View style={styles.header}> 
        <TouchableOpacity onPress={()=>navigation.goBack()}> 
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chats</Text>
      </View>

      <TouchableOpacity style={styles.row} onPress={() =>router.push('services/chat')}>
        <FontAwesome6 name="circle-user" size={40} color="black" />
        <View style={{flexDirection:'column',marginLeft:20}}>
          <Text style={styles.name}>Alex</Text>
          <Text>Say Hi</Text>
        </View>
        
        
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default chatFriends

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#161622',
  },
  headerText: {
    fontSize: 30,
    color:'white',
    marginLeft:10
  },
  
  header:{
    marginTop:10,
    flexDirection:'row',
    backgroundColor:'#161622',
    
  },
  row: {
    flexDirection:'row',
    marginHorizontal:10,
    marginTop:30,
    paddingLeft:15,
    paddingVertical:20,
    backgroundColor:'beige',
    borderRadius:10,
    
  },
  name: {
    fontWeight:600,
    fontSize:20
  }
})