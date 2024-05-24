import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from "expo-router";
import { AntDesign,Ionicons,Entypo,MaterialIcons } from '@expo/vector-icons';


const more = () => {
  
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.title}>Settings</Text>
      </View>
 
      <View style ={styles.container}>
        <Text style={styles.setTitle}>Account Settings</Text>
        <TouchableOpacity 
            onPress={() =>router.push('settings/editProf')} 
            style = {styles.editPro}> 
              <AntDesign name="user" size={24} color="white" />
              <Text style = {styles.setting}>Edit Profile</Text>

        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() =>router.push('settings/notif')} 
            style = {styles.setbox}> 
              <Ionicons name="notifications" size={24} color="white" />
              <Text style = {styles.setting}>Notifications</Text>

        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() =>router.push('settings/privacy')} 
            style = {styles.setbox}> 
              <Entypo name="lock" size={24} color="white" />
              <Text style = {styles.setting}>Privacy</Text>

        </TouchableOpacity>

        <Text style={styles.space}></Text>

        <Text style={styles.setTitle}>Support & About</Text>
        <TouchableOpacity 
            onPress={() =>router.push('settings/help')} 
            style = {styles.editPro}> 
              <Entypo name="help-with-circle" size={24} color="white" />
              <Text style = {styles.setting}>Help & Support</Text>

        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() =>router.push('settings/terms')} 
            style = {styles.setbox}> 
              <Ionicons name="information-circle-sharp" size={30} color="white" />
              <Text style = {styles.setting}>Terms & Policies</Text>

        </TouchableOpacity>

        <Text style={styles.space}></Text>

        <Text style={styles.setTitle}>Actions</Text>
        <TouchableOpacity 
            onPress={() =>router.push('settings/report')} 
            style = {styles.editPro}> 
              <Entypo name="flag" size={24} color="white" />
              <Text style = {styles.setting}>Report a Bug</Text>

        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() =>router.push('settings/deleteAcc')} 
            style = {styles.setbox}> 
              <MaterialIcons name="delete" size={24} color="white" />
              <Text style = {styles.setting}>Delete Account</Text>

        </TouchableOpacity>
      </View>

      

    </SafeAreaView>
  )
}

export default more

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#161622',
  },
  
  title: {
    fontSize: 28,
    fontWeight:800,
    alignItems:'center',
    paddingTop:10,
    color:'white',
    paddingBottom:10,
    
  },
  space: {
    margin:10
  },
  setTitle: {
    fontSize: 20,
    fontWeight:700,
    color:'white',
    paddingLeft:20,
    marginTop:20
  },
  setting: {
    fontSize: 17,
    color:'white',
    paddingLeft:20
  },
  editPro: {
    height: 40,
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 1,
    paddingVertical: 30,
    paddingHorizontal:20,
    alignItems:'center',
     marginTop:10
  },
  setbox: {
    height: 40,
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 1,
    paddingVertical: 30,
    paddingHorizontal:20,
    alignItems:'center',
  },
})