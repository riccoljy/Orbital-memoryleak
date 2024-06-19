import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Keyboard, Platform } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { supabase } from "@/src/supabase/supabase.js";


const chat = () => {

  const navigation = useNavigation();
  const [messages, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState(null);
  const { chatid, userid } = useLocalSearchParams();

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
      const { data: messages, error: err } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatid)

      if (err) { console.error(err); return; }
      let renderedMsgs = [];
      for (const message of messages) {
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
          // system?: boolean
          // sent?: boolean
          // received?: boolean
          // pending?: boolean
          // quickReplies?: QuickReplies
        }
        renderedMsgs.push(chatObj);
      }
      setMessage(renderedMsgs);
    };
    fetchUserAndMessages();
  }, []);

  async function onSend(messages) {
    for (const message of messages) {
      console.log("Sending message=", message);
      const { _id, text, user: { _id: sender_id } } = message;
      const { data, error } = await supabase.rpc('sendMessage');
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
          <Text style={styles.headerText}>{chatid} </Text>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: (userData ? userData.id : null),
        }}
      />
    </SafeAreaView>
  )
}

export default chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#161622',
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