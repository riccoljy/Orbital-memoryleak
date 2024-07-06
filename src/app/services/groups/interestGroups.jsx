import { Alert, StyleSheet, Text, TouchableOpacity, TextInput, FlatList, View, Button, Appearance, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { supabase } from "@/src/supabase/supabase.js";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router';
import { Ionicons, FontAwesome6, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const interestGroups = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { name, descrip } = useLocalSearchParams();
  const getTop = () => (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Find Interest Groups</Text>
      </View>

      <View>
        <TouchableOpacity style={styles.button}
          onPress={() => router.push({ pathname: 'services/groups/createGroup' })} >
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Create a New Group</Text>
        </TouchableOpacity>

      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={styles.title}>Available Groups :</Text>
      </View>
    </View>
  );
  const [id, setId] = useState(null);
  const [joinData, setJoinData] = useState(null);
  const [userName, setUserName] = useState('');
  const cutText = (val, lim) => {
    const words = val.split(' ');
    if (words.length > lim) {
      return words.slice(0, lim).join(' ') + '...';
    }
    return val;
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      console.log(user?.email)
      setId(user?.id);
      setUserName(user?.user_metadata.first_name);

      if (name && descrip && id) {
        const { data: check, error: n } = await supabase
          .from('create_group')
          .select('name')
          .eq('name', name)
          .single();
        console.log(check)
        if (check) {
          Alert.alert('Group with name already exists.')
        }
        else {
          const { data, error } = await supabase
            .rpc('create_group', { creator: id, grp_name: name, description: descrip, user_name: user?.user_metadata.first_name })
          Alert.alert('Group created successfully.');

          await supabase.rpc('createchat', {
            chat_name: name,
            participant_ids: [id]
          })
          
        }
      }
      const { data, error: n } = await supabase
        .from('create_group')
        .select('*')
      setJoinData(data);
    }
    getUser();
  }, [name, descrip, id])
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={joinData}
        keyExtractor={(val) => val.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={getTop()}
        renderItem={({ item }) => (
          <TouchableOpacity style={{
            paddingVertical: 20, width: '100%', flexDirection: 'row',
            borderBottomColor: 'grey', borderBottomWidth: 1, alignItems: 'center', paddingHorizontal: 20
          }}
            onPress={() => router.push({
              pathname: 'services/groups/joinGroup', params: {
                descrip: item.description,
                name: item.name,
                id: id,
                user_name: userName
              },
            })}
          >
            <FontAwesome5 name="user-friends" size={40} color="#D3D3D3" />
            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
              <Text style={styles.name}>{cutText(item.name, 3)} </Text>

              <Text style={{ color: 'white', marginTop: 5 }}>{cutText(item.description, 3)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />


    </SafeAreaView>
  )
}

export default interestGroups

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161622',
    flex: 1,
    paddingHorizontal: 10
  },
  headerText: {
    fontSize: 27,
    color: 'white',
    marginLeft: 10

  },

  header: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#161622',

  },
  button: {
    marginTop: 30,
    marginHorizontal: 50,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#D3D3D3',
  },
  name: {
    fontWeight: 600,
    fontSize: 20,
    color: 'white'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 30,
    paddingRight: 20,
    color: '#D3D3D3',
    flexDirection: 'row'
  },
})