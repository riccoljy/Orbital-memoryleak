
import { Alert, StyleSheet, Text, View, TouchableOpacity, ScrollView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from "expo-router";
import { AntDesign, Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { supabase } from "@/src/supabase/supabase.js";


const more = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>('');

  useEffect(() => {
    const getUserData = async () => {
      const {data} = await supabase.auth.getUser();
      if (data && data.user && data.user.user_metadata) {
        const {user_metadata} = data.user;
        setUserData(user_metadata);
        console.log("userMD=", user_metadata);
      }
    };
    getUserData();
  }, []);

  async function logout() {
    const { error } = await supabase.auth.signOut()
    let sessionObject = await supabase.auth.getSession();
    if (!sessionObject.data.session) router.replace('/');
  }

  const confirmLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel" },
        { text: "Logout", onPress: logout }
      ]
    );
  };

  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action is IRREVERSIBLE!\nAre you sure you want to proceed?",
      [
        {
          text: "CONFIRM DELETE!", onPress: async () => {
            Alert.prompt(
              "Are you sure you want to leave Unibuds? :(",
              "Enter your password to proceed with deletion",
              [{ text: 'Cancel' },
              {
                text: 'Submit', onPress: async password => {
                  const { data, error } = await supabase.auth.signInWithPassword({
                    email: userData.email,
                    password: password,
                  })
                  if (error) Alert.alert("Incorrect password", userData.email);
                  else {
                    const { data, error } = await supabase.rpc('deleteUser', userData.sub)
                    if (error) console.warn(error);
                    else router.replace('/');
                  }
                }
              },
              ],
              'secure-text'
            )
          }
        }, { text: "Cancel" }
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.title}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.container}>
          <View>

            <Text style={styles.setTitle}>Account Settings</Text>
            <TouchableOpacity
              onPress={() => router.push('profileSettings/completeRegistration')}
              // onPress={() => router.push('settings/editProf')}
              style={styles.editPro}>
              <AntDesign name="user" size={24} color="white" />
              <Text style={styles.setting}>Edit Profile</Text>

            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('settings/notif')}
              style={styles.setbox}>
              <Ionicons name="notifications" size={24} color="white" />
              <Text style={styles.setting}>Notifications</Text>

            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('settings/privacy')}
              style={styles.setbox}>
              <Entypo name="lock" size={24} color="white" />
              <Text style={styles.setting}>Privacy</Text>

            </TouchableOpacity>

            <Text style={styles.space}></Text>
          </View>
          <View>
            <Text style={styles.setTitle}>Support & About</Text>
            <TouchableOpacity
              onPress={() => router.push('settings/help')}
              style={styles.editPro}>
              <Entypo name="help-with-circle" size={24} color="white" />
              <Text style={styles.setting}>Help & Support</Text>

            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('settings/terms')}
              style={styles.setbox}>
              <Ionicons name="information-circle-sharp" size={30} color="white" />
              <Text style={styles.setting2}>Terms & Policies</Text>

            </TouchableOpacity>

            <Text style={styles.space}></Text>
          </View>
          <View>
            <Text style={styles.setTitle}>Actions</Text>
            <TouchableOpacity
              onPress={() => router.push('settings/report')}
              style={styles.editPro}>
              <Entypo name="flag" size={24} color="white" />
              <Text style={styles.setting}>Report a Bug</Text>

            </TouchableOpacity>
            <TouchableOpacity
              onPress={deleteAccount}
              style={styles.setbox}>
              <MaterialIcons name="delete" size={24} color="white" />
              <Text style={styles.setting}>Delete Account</Text>

            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmLogout}
              style={styles.setbox}>
              <MaterialIcons name="logout" size={24} color="white" />
              <Text style={styles.setting}>Log out</Text>

            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default more

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },

  title: {
    fontSize: 28,

    fontWeight: 'bold',
    alignItems: 'center',
    paddingTop: 10,
    color: 'white',
    paddingBottom: 10,

  },
  space: {
    margin: 10
  },
  setTitle: {
    fontSize: 20,

    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 20,
    marginTop: 20
  },
  setting: {
    fontSize: 17,
    color: 'white',
    paddingLeft: 20
  },
  setting2: {
    fontSize: 17,
    color: 'white',
    paddingLeft: 16
  },
  editPro: {
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 1,

    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 10
  },
  setbox: {
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 1,

    paddingVertical: 10,
    paddingHorizontal: 13,
    alignItems: 'center',
  },
})