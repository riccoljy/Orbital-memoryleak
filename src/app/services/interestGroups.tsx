import { StyleSheet, Text, TouchableOpacity, View,TextInput, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router';
import { Ionicons,FontAwesome6 ,Entypo} from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const interestGroups = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.header}> 
        <TouchableOpacity onPress={()=>navigation.goBack()}> 
            <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Find Interst / Study Groups</Text>
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
  })