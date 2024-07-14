import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { supabase } from "@/src/supabase/supabase.js";


const chat = () => {
  const navigation = useNavigation();
  const [messages, setMessage] = useState([]);
  const { chatid, userid, chatName: initialChatName } = useLocalSearchParams();
  const [chatName, setChatName] = useState(initialChatName);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndMessages = async () => {
      // Fetch user ID
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error(userError);
        return;
      }

      setUserData(user);

      // Fetch chats
      const { data: DBmessages, error: err } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatid)

      if (err) { console.error(err); return; }
      for (const message of DBmessages) {
        const { id, chat_id, content, created_at, sender_id } = message;
        if (!content) continue;
        let chatObj = {
          _id: id,
          text: content,
          createdAt: created_at,
          user: { _id: sender_id },
          // image?: string
          // video?: string
          // audio?: string
          // system: true,
          // sent: true,
          // received: true,
          // pending: true,
          // quickReplies?: QuickReplies
        }
        setMessage(messages => GiftedChat.append(messages, chatObj));
      }

      const subscriptions = supabase
        .channel('newMessages')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `chat_id=eq.${chatid}`,
          },
          (payload) => {
            const newMessage = payload.new;
            const chatObj = {
              _id: newMessage.id,
              text: newMessage.content,
              createdAt: newMessage.created_at,
              user: { _id: newMessage.sender_id },
            };
            setMessage(previousMessages => GiftedChat.append(previousMessages, [chatObj]));
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'chats',
            filter: `id=eq.${chatid}`,
          },
          (payload) => {
            const updatedChat = payload.new;
            setChatName(updatedChat.chat_name);
            console.log("newchatname", chatName);
          }
        )
        .subscribe();
      setLoading(false);
      return () => { supabase.removeChannel(subscriptions); };
    };
    fetchUserAndMessages();
  }, []);

  async function onSend(messages) {
    for (const message of messages) {
      const { text, user: { _id: sender_id } } = message;
      let { error } = await supabase.rpc('sendmessage', {
        p_chat_id: chatid,
        p_content: text,
        p_sender_id: sender_id,
      })
      if (error) console.error(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <FontAwesome6 name="circle-user" size={30} color="white" style={{ marginLeft: 10 }} />
        <View style={{ flexDirection: 'column', marginLeft: 5 }}>
          <Text style={styles.headerText}>{chatName} </Text>
        </View>
      </View>
      {loading ? 
      <ActivityIndicator /> 
      : <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: (userData ? userData.id : null),
          }}
        />
        }
    </SafeAreaView>
  )
}

export default chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    marginLeft: 5,
    fontWeight: 700
  },

  header: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#161622',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingBottom: 15

  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'black',
    backgroundColor: 'beige',
    paddingHorizontal: 22,
    paddingVertical: 12
  },
  input: {
    flex: 1,
    height: 35,
    fontSize: 18
  }
})