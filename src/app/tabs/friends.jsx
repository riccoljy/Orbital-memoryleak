import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from "@/src/supabase/supabase.js";
import { useRouter } from "expo-router";
import { getDistance } from 'geolib';
import Ionicons from '@expo/vector-icons/Ionicons';

const Friends = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndFriends = async () => {
      // Fetch user ID
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error(userError);
        setLoading(false);
        return;
      }
      setUserData(user);

      // Fetch Friends/Matches
      const { data: friendData, error: friendError } = await supabase
        .from('matches')
        .select('swiper_id, swiped_id')
        .or(`swiper_id.eq.${user.id},swiped_id.eq.${user.id}`);

      if (friendError) {
        console.error(friendError);
        setLoading(false);
        return;
      }

      let friendsArr = [];
      for (let pair of friendData) {
        if (pair.swiper_id !== user.id) friendsArr.push(pair.swiper_id);
        if (pair.swiped_id !== user.id) friendsArr.push(pair.swiped_id);
      }

      const friendsData = [];
      for (let friend of friendsArr) {
        let { data, error } = await supabase
          .rpc('get_user_by_id', { input_user_id: friend });
        if (error) {
          console.error(error);
        } else if (data[0]) {
          friendsData.push(data[0].raw_user_meta_data);
        }
      }

      setFriends(friendsData);
      setLoading(false);
    };

    fetchUserAndFriends();
  }, []);

  const test = async (friendID) => {
    const { data: chatData, error: chatError } = await supabase
      .from('chats')
      .select('*')
      .contains('participant_ids', [userData.id])
      .contains('participant_ids', [friendID])
      ;
    if (chatError) console.error(chatError);
    else {
      router.push({ pathname: 'services/chat', params: { chatid: chatData[0].id, chatName: chatData[0].chat_name } })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Friends List</Text>
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : friends.length === 0 ? (
          <Text style={styles.noFriendsText}>No friends found</Text>
        ) : (
          <FlatList
            data={friends}
            keyExtractor={(item) => item.sub} // Assuming 'sub' is a unique identifier
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.itemText}>
                    Name: {item.first_name} {item.last_name}
                  </Text>
                  {userData.user_metadata.location && item.location ? 
                  <Text style={styles.distanceText}>
                    {getDistance(
                      { longitude: userData.user_metadata.location.longitude, latitude: userData.user_metadata.location.latitude },
                      { longitude: item.location.longitude, latitude: item.location.latitude }
                    )} km away
                  </Text> : 
                  <></>}
                </View>
                <TouchableOpacity
                  onPress={() => test(item.sub)}
                  style={styles.chatIcon}
                >
                  <Ionicons name="chatbox" size={32} color="white" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  header: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#161622',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    marginLeft: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center', // Align items vertically centered
  },
  textContainer: {
    flex: 1, // Take available space
  },
  itemText: {
    fontSize: 20, // Larger text size
    color: 'white',
  },
  distanceText: {
    fontSize: 16,
    color: '#b0b0b0', // Slightly grey color
  },
  chatIcon: {
    marginLeft: 10, // Space between text and icon
  },
  noFriendsText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

export default Friends;
