import React, { useEffect, useRef,useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from "@/src/supabase/supabase.js";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import like from '@/assets/images/like.png';
import dislike from '@/assets/images/dislike.png';
import Swiper from "react-native-deck-swiper";

const sampleData = [
  {
    name: 'Alex',
    id: 1,
    age: 21,
    uni: 'NUS',
    course: 'Business Analytics',
    bio: 'Hi, currently doing bt1101 and am looking for a study buddy.'

  },

  {
    name: 'Emma',
    id: 7,
    age: 22,
    uni: 'NTU',
    course: 'Computer Science',
    bio: "Hey there! I am taking CS2100 and would love a study group."
  },
  {
    name: 'John',
    id: 3,
    age: 20,
    uni: 'SMU',
    course: 'Economics',
    bio: "Hello! Currently enrolled in EC101, looking for someone to study with."
  },
  {
    name: 'Sophia',
    id: 4,
    age: 23,
    uni: 'NUS',
    course: 'Mechanical Engineering',
    bio: "Hi everyone! I am in ME2135 this semester and would love to find a study buddy."
  }
];





const HomePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkSession = async () => {

      {
        const { data, error } = await supabase.auth.refreshSession()
        const { session, user } = data
        console.log("session1 =", session);
        if (!session) router.replace("/");
      }

      const { data: allData, error:other } = await supabase
       .rpc('get_user_metadata')
      setUserData(allData);

      const { data: { user }, error } = await supabase.auth.getUser();
      console.log("error=", error)
      let user_metadata;
      if (user) {
        user_metadata = user.user_metadata
        console.log('user metadata = ', user_metadata)
      }
      if (user_metadata && (user_metadata.new_user || !user_metadata.university)) router.push('/profileSettings/completeRegistration');

    };
    checkSession();
  }, [router]);

  const animRef = useRef(null);

  const left = (cardIdx) => {

  }
  const right = (cardIdx) => {
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>SELECT A SERVICE</Text>


          <TouchableOpacity
            onPress={() => router.push('services/meetStudents')}
            style={styles.input}>
            <FontAwesome5 name="user-friends" size={24} color="#D3D3D3" />
            <Text style={styles.service1}>Filter Students</Text>
            <AntDesign name="right" size={24} color="#D3D3D3" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('services/chatFriends')}
            style={styles.input2}>
            <AntDesign name="wechat" size={24} color="#D3D3D3" />
            <Text style={styles.service2}>Chat With Friends</Text>
            <AntDesign name="right" size={24} color="#D3D3D3" />

          </TouchableOpacity>

          <Text style={styles.title}>DISCOVER</Text>

        </View>

        <View>

          <Swiper
            ref={animRef}
            cards={userData ? userData:[]}
            containerStyle={{ backgroundColor: 'transparent' }}
            cardIndex={0}
            animateCardOpacity
            stackSize={4}
            verticalSwipe={false}
            onSwipedLeft={(cardIdx) => {
              left(cardIdx)
            }}
            onSwipedRight={(cardIdx) => {
              right(cardIdx)
            }}
            renderCard={(card) => {
              if (card) {
                return (
                  <View key={card.sub} style={styles.card}>
                    <View style={styles.cardDet}>
                      <Text style={styles.name}>{card.first_name} {card.last_name}</Text>

                      <Text style={styles.space}></Text>
                      <Text style={styles.course}>{card.university} • {card.course}</Text>
                      <Text style={styles.space}></Text>
                      <Text style={styles.bio}>{card.bio}</Text>

                    </View>
                  </View>
                );
              }
              return (
                <View style={styles.noCards}>
                  <Text style={styles.noText}>No More Students :(</Text>
                </View>

              );
            }}
          />
        </View>

        <View style={styles.like}>
          <TouchableOpacity onPress={() => animRef.current.swipeLeft()}>
            <Image source={dislike} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => animRef.current.swipeRight()}>
            <Image source={like} style={styles.image} />
          </TouchableOpacity>
        </View>

      </ScrollView>


    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  service1: {
    marginLeft: 20,
    marginRight: 100,
    fontSize: 18,
    color: '#D3D3D3',
  },
  service2: {
    marginLeft: 20,
    marginRight: 80,
    fontSize: 18,
    color: '#D3D3D3'
  },
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 0,
    paddingTop: 20,
    paddingHorizontal: 20,
    color: '#D3D3D3'
  },
  space: {
    margin: 5
  },
  input: {
    flexDirection: 'row',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    paddingVertical: 20,
    marginTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  input2: {
    flexDirection: 'row',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  box: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 40,
    marginHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  course: {
    fontSize: 24,
  },
  bio: {
    fontSize: 15,

  },
  like: {
    marginTop: 420,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    height: 100,
    width: 100,
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: 'beige',
    height: '40%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: -10
  },
  noCards: {
    backgroundColor: 'beige',
    height: '40%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: -10

  },
  cardDet: {
    position: 'absolute',
    backgroundColor: 'beige',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,


  },
  noText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 20,
  }
});

export default HomePage;
