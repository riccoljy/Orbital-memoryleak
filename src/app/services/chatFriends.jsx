import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router';
import { Ionicons, FontAwesome6, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '@/src/supabase/supabase';

const chatFriends = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchUserAndChats = async () => {
      // Fetch user ID
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error(userError);
        return;
      }

      setUserData(user);
      console.log("user=", user)

      // Fetch chats
      const { data: chatData, error: chatError } = await supabase
        .from('chats')
        .select('*')
        .contains('participant_ids', [user.id]);

      if (chatError) console.error(chatError);
      else setChats(chatData);
    };
    fetchUserAndChats();
  }, []);

  useEffect(() => {
    if (chats[0]) console.log("Updated chats state:", chats);
  }, [chats]);

  return (
    <SafeAreaView style={styles.container}>
      {/*Chats header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chats</Text>
      </View>

      {/* search */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder='Search'
          placeholderTextColor={'gray'}
          style={styles.textInput}
        />
        <TouchableOpacity style={{ marginRight: 8, marginBottom: 10, }}>
          <Entypo name="magnifying-glass" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {chats.length === 0 ? (
          <Text style={styles.emptyStateText}>No chats available</Text>
        ) : (
          <FlatList
            data={chats}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.chatItem}
                onPress={() => router.push({ pathname: 'services/chat', params: { chatid: item.id, chatName: item.chat_name } })}>
                <Text style={styles.name}>
                  <Text>Chat ID: {item.id}</Text>
                  <Text>Chat name: {item.chat_name}</Text>
                  <Text>Participants: {item.participant_ids.join(', ')}</Text>
                  <Text>Created At: {new Date(item.created_at).toLocaleString()}</Text>
                  <Text>Last Chatted at: {item.latest_message_timestamp}</Text>
                </Text>

                {/* <Text style={styles.name}>{item.chat_name}{item.latest_message_timestamp}
                    {item.isOnline && (
                  <View style={{
                    width: 5, backgroundColor: 'yellow', height: 5, borderRadius: 3,
                    marginBottom: 4
                  }}></View>)} 
                  </Text> */}
              </TouchableOpacity>
            )} />
        )}
      </View>

      {/* <View style={{ paddingHorizontal: 20 }}>
        <FlatList
          data={chats}
          keyExtractor={(val) => val.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={{
              paddingVertical: 20, width: '100%', flexDirection: 'row',
              borderBottomColor: 'grey', borderBottomWidth: 1, alignItems: 'center'
            }}
              onPress={() => router.push({
                pathname: 'services/chat', params: {
                  age: item.age,
                  chat: JSON.stringify(item.chat),
                  name: item.name,
                },
              })}
            >
              <FontAwesome6 name="circle-user" size={40} color="white" />
              <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                <Text style={styles.name}>{item.name}, {item.age} {item.isOnline && (
                  <View style={{
                    width: 5, backgroundColor: 'yellow', height: 5, borderRadius: 3,
                    marginBottom: 4
                  }}></View>)} </Text>

                <Text style={{ color: 'white', marginTop: 5 }}>{item.lastMessage}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View> */}

    </SafeAreaView>
  )
}

export default chatFriends

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    marginLeft: 10
  },

  header: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#161622',

  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 30,
    paddingLeft: 15,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderRadius: 10,

  },
  name: {
    fontWeight: 600,
    fontSize: 20,
    color: 'white'
  },
  searchBox: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#003153',

  },
  textInput: {
    fontSize: 18,
    flex: 1,
    marginBottom: 5,
    paddingLeft: 5,

  },
  emptyStateText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888',
  },
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
})