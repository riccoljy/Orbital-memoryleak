import { StyleSheet, Text, TouchableOpacity, View,TextInput, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router';
import { Ionicons,FontAwesome6 ,Entypo} from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const userChatData = [
  // Chat data for Alex, Emma, John, and Sophia
  {
    id: 1,
    name: "Alex",
    age: 21,
    isOnline: true,
    lastMessage: "Sure, let's meet there.",
    date: "2024-05-31",
    chat: [
      {
        sender: "me",
        message: "Hey Alex, how's it going?",
        timestamp: "9:00 AM",
      },
      {
        sender: "Alex",
        message: "Hey, I'm doing well. Just finished studying for EC101.",
        timestamp: "9:05 AM",
      },
      {
        sender: "me",
        message: "Nice! How was the study session?",
        timestamp: "9:10 AM",
      },
      {
        sender: "Alex",
        message: "It was productive. Got through most of the material.",
        timestamp: "9:15 AM",
      },
      {
        sender: "me",
        message: "That's great! Planning anything for the weekend?",
        timestamp: "9:20 AM",
      },
      {
        sender: "Alex",
        message: "Not yet. Maybe just relaxing at home. You?",
        timestamp: "9:25 AM",
      },
      {
        sender: "me",
        message: "I might go hiking. It's been a while since I've been outdoors.",
        timestamp: "9:30 AM",
      },
      {
        sender: "Alex",
        message: "Sounds like a plan. Let me know if you need company!",
        timestamp: "9:35 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Emma",
    age: 22,
    isOnline: false,
    lastMessage: "No worries, take your time.",
    date: "2024-05-30",
    chat: [
      {
        sender: "me",
        message: "Hi Emma, how's your day going?",
        timestamp: "11:00 AM",
      },
      {
        sender: "Emma",
        message: "Hey! It's going well, thanks for asking.",
        timestamp: "11:05 AM",
      },
      {
        sender: "me",
        message: "That's good to hear. Anything exciting happening?",
        timestamp: "11:10 AM",
      },
      {
        sender: "Emma",
        message: "Not really, just catching up on some readings.",
        timestamp: "11:15 AM",
      },
      {
        sender: "me",
        message: "Ah, the joys of student life! 😅",
        timestamp: "11:20 AM",
      },
      {
        sender: "Emma",
        message: "Indeed! How about you? Any plans?",
        timestamp: "11:25 AM",
      },
      {
        sender: "me",
        message: "I might grab lunch with a friend later.",
        timestamp: "11:30 AM",
      },
      {
        sender: "Emma",
        message: "Sounds nice. Enjoy your meal!",
        timestamp: "11:35 AM",
      },
    ],
  },
  {
    id: 3,
    name: "John",
    age: 20,
    isOnline: true,
    lastMessage: "Sure, let's meet at the library.",
    date: "2024-05-31",
    chat: [
      {
        sender: "me",
        message: "Hey John, how's it going?",
        timestamp: "8:00 AM",
      },
      {
        sender: "John",
        message: "Hey, I'm doing well. Just finished some readings for EC101.",
        timestamp: "8:05 AM",
      },
      {
        sender: "me",
        message: "Nice! How are you finding the course?",
        timestamp: "8:10 AM",
      },
      {
        sender: "John",
        message: "It's challenging but interesting. How about you?",
        timestamp: "8:15 AM",
      },
      {
        sender: "me",
        message: "I'm enjoying it too. Thinking of forming a study group.",
        timestamp: "8:20 AM",
      },
      {
        sender: "John",
        message: "Count me in! I could use some study buddies.",
        timestamp: "8:25 AM",
      },
      {
        sender: "me",
        message: "Great! Let's meet up tomorrow to discuss.",
        timestamp: "8:30 AM",
      },
      {
        sender: "John",
        message: "Sure, let's meet at the library.",
        timestamp: "8:35 AM",
      },
    ],
  },
  {
    id: 4,
    name: "Sophia",
    age: 23,
    isOnline: true,
    lastMessage: "Definitely! Looking forward to it.",
    date: "2024-05-30",
    chat: [
      {
        sender: "me",
        message: "Hey Sophia, how's your week been?",
        timestamp: "10:00 AM",
      },
      {
        sender: "Sophia",
        message: "It's been busy but good. How about you?",
        timestamp: "10:05 AM",
      },
      {
        sender: "me",
        message: "Mine's been quite hectic too, but managing.",
        timestamp: "10:10 AM",
      },
      {
        sender: "Sophia",
        message: "That's good to hear. Any exciting plans for the weekend?",
        timestamp: "10:15 AM",
      },
      {
        sender: "me",
        message:
          "Not yet, but I'm thinking of checking out that new restaurant downtown. You?",
        timestamp: "10:20 AM",
      },
      {
        sender: "Sophia",
        message:
          "I'm planning to go hiking with some friends. You should join us sometime!",
        timestamp: "10:25 AM",
      },
    ],
  },
];


const chatFriends = () => {
  const navigation = useNavigation();
  const router = useRouter();
  return (
    <SafeAreaView style = {styles.container}>
      {/*Chats header */}
      <View style={styles.header}> 
        <TouchableOpacity onPress={()=>navigation.goBack()}> 
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chats</Text>
      </View>

      {/*search */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder='Search'
          placeholderTextColor={'gray'}
          style={styles.textInput}
        />
        <TouchableOpacity style={{marginRight:8,marginBottom:10,}}>
          <Entypo name="magnifying-glass" size={24} color="black" />
        </TouchableOpacity>
        
      </View>

      {/* chatview */}
      <View style={{paddingHorizontal:20}}>
        <FlatList
            data={userChatData}
            keyExtractor={(val) => val.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity style={{paddingVertical:20,width:'100%',flexDirection:'row',
              borderBottomColor:'grey',borderBottomWidth:1,alignItems:'center'}}
                onPress={() => router.push({pathname:'services/chat',params:{
                  age:item.age,
                  chat:JSON.stringify(item.chat),
                  name:item.name,
                },})}  
              >
                <FontAwesome6 name="circle-user" size={40} color="white" />
                <View style={{flexDirection:'column',marginLeft:20}}>
                  <Text style={styles.name}>{item.name}, {item.age} {item.isOnline && (
                    <View style={{width:5,backgroundColor:'yellow',height:5,borderRadius:3,
                    marginBottom:4}}></View>)} </Text>
                  
                  <Text style={{color:'white',marginTop:5}}>{item.lastMessage}</Text>
                </View>
              </TouchableOpacity>
            )}
        />
      </View>
      
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
    marginHorizontal:20,
    marginTop:30,
    paddingLeft:15,
    paddingVertical:20,
    backgroundColor:'white',
    borderRadius:10,
    
  },
  name: {
    fontWeight:600,
    fontSize:20,
    color:'white'
  },
  searchBox: {
    marginTop:20,
    marginHorizontal:20,
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    borderRadius:20,
    backgroundColor:'#003153',
    
  },
  textInput: {
    fontSize:18,
    flex:1,
    marginBottom:5,
    paddingLeft:5,
    
  }
})