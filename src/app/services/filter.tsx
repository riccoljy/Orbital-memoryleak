import { StyleSheet, Text,TouchableOpacity, TextInput, View, Appearance } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router';
import { Ionicons} from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const filter = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const colorScheme = Appearance.getColorScheme();
  const placeholderColor = colorScheme === 'dark' ? '#ccc' : '#888';
  const [course, setCourse] = useState('');
  const [mod, setMod] = useState('');
  const [uni, setUni] = useState('');

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#161622',}}>
      <View style={styles.header}> 
        <TouchableOpacity onPress={()=>navigation.goBack()}> 
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Filter Options</Text>
        <TouchableOpacity style={styles.button2} 
            onPress={() => router.push({pathname:'tabs/home',params:{
                  Course:'',
                  Module:'',
                  University:'',
                },})} >
            <Text style={{fontSize: 18,fontWeight:'600'}}>Clear Filters</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginHorizontal:20}}>
          
        <Text style={styles.label}>Course</Text>
            <TextInput
              style={styles.input}
              placeholder="Course name e.g. 'Business Analytics'"
              placeholderTextColor={placeholderColor}
              value={course}
              autoCapitalize='none'
              onChangeText={setCourse}
            />
            {/* <Text style={styles.label}>Module</Text>
            <TextInput
              style={styles.input}
              placeholder="Module code name e.g. 'BT1101'"
              placeholderTextColor={placeholderColor}
              value={mod}
              autoCapitalize='none'
              onChangeText={setMod}
            />*/}
          
          
          <Text style={styles.label}>University</Text>
            <TextInput
              style={styles.input}
              placeholder="University name e.g. 'nus'"
              placeholderTextColor={placeholderColor}
              value={uni}
              autoCapitalize='none'
              onChangeText={setUni}
            />
          <TouchableOpacity style={styles.button} 
            onPress={() => router.push({pathname:'tabs/home',params:{
                  Course:course,
                  Module:mod,
                  University:uni,
                },})} >
            <Text style={{fontSize: 18,fontWeight:'600'}}>Apply Filters</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default filter

const styles = StyleSheet.create({
  container: {
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
    marginBottom:50
    
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
button2: {
  marginLeft:40,
  paddingVertical:10,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',
  padding:10,
  borderRadius:20,
  backgroundColor:'#D3D3D3',
}
})