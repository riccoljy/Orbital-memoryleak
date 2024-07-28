import { StyleSheet, Text, TouchableOpacity, View, Alert, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { supabase } from "@/supabase/supabase";

const Notif = () => {
  const [telegramID, setTeleID] = useState(null);
  const [userData, setUserData] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getName = async () => {
      let { data: { user: { user_metadata } } } = await supabase.auth.getUser();
      setUserData(user_metadata);
      if (user_metadata.telegram_id) {
        setTeleID(user_metadata.telegram_id);
        setNotificationsEnabled(user_metadata.notifications_enabled);
      }
    };
    getName();
  }, []);

  const handleDelink = () => {
    Alert.alert(
      "Confirm Delink",
      "Are you sure you want to delink your Telegram account?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            await supabase.auth.updateUser({ data: { telegram_id: null } });
            setTeleID(null);
          }
        }
      ]
    );
  };

  const toggleNotifications = async () => {
    const newStatus = !notificationsEnabled;
    setNotificationsEnabled(newStatus);
    await supabase.auth.updateUser({ data: { notifications_enabled: newStatus } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <View style={styles.content}>
        {telegramID === null ? (
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>Go to Telegram</Text>
            <Text style={styles.instructionText}>Find @UnibudsBot on Telegram and /link_account</Text>
            <Text style={styles.instructionText}>Follow instructions</Text>
          </View>
        ) : (
          <View style={styles.linkedContainer}>
            <TouchableOpacity style={styles.button} onPress={handleDelink}>
              <FontAwesome name="unlink" size={20} color="white" />
              <Text style={styles.buttonText}>Delink Telegram Account</Text>
            </TouchableOpacity>
            <View style={styles.notificationContainer}>
              <View style={styles.notificationRow}>
                <Text style={styles.notificationText}>
                  Telegram Notifications
                </Text>
                <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
                  <Ionicons name="information-circle-outline" size={20} color="white" />
                </TouchableOpacity>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={toggleNotifications}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={notificationsEnabled ? "#ffffff" : "#f4f3f4"}
                />
                
              </View>
              {showInfo && (
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    These notifications will be sent via Telegram, not in-app notifications.
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    padding: 16,
    paddingTop: 40
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
  content: {
    marginTop: 20,
  },
  instructionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  linkedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
  notificationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '80%',
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  notificationText: {
    fontSize: 16,
    color: 'white',
  },
  infoBox: {
    backgroundColor: '#1e1e1e',
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
  infoText: {
    color: 'white',
    fontSize: 14,
  },
});

export default Notif;
