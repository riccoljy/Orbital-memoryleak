import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { supabase } from "@/src/supabase/supabase.js";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from "expo-router";
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import like from '@/assets/images/like.png';
import dislike from '@/assets/images/dislike.png';
import Swiper from "react-native-deck-swiper";
import * as Location from 'expo-location';

const HomePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any[]>([]);
  const [swip, setSwiper] = useState('');
  const [swipName, setSwiperName] = useState(null);
  const { Course = '', Module = '', University = '' } = useLocalSearchParams();
  const [cardIdx, setCardIdx] = useState(0);
  const [oldCards, setOldCards] = useState<any[]>([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const swiper = async () => {
      const { data: allData, error } = await supabase
        .rpc('get_user_metadata', { useid: swip })

      const { data: user_likes, error: n } = await supabase
        .from('likes')
        .select('swiped_id')
        .eq('swiper_id', swip)
      let final_likes: string | any[];
      if (user_likes) {
        final_likes = user_likes.map(val => val.swiped_id)

      }
      {/*!final_passes?.includes(u.id) &&
        const { data: user_passes, error: nil } = await supabase
        .from('passes')
        .select('swiped_id')
        .eq('swiper_id', swip)
      const final_passes = user_passes.map(val => val.swiped_id)
         */}
      if (allData) {
        const filtered = allData.filter((u: { id: any; }) => !final_likes?.includes(u.id))
        let filtered2;
        if (Course || Module || University) {
          filtered2 = filtered.filter((u: { course: { toString: () => string; }; bio: { toString: () => string | string[]; }; university: { toString: () => string; }; }) => (u.course.toString().toLowerCase()
            == Course.toString().toLowerCase() || Course == '') &&
            (u.bio.toString().includes(Module.toString().toUpperCase()) || Module == '') &&
            (u.university.toString().toLowerCase()
              == University.toString().toLowerCase() || University == ''))
        }
        if (filtered2) {
          setUserData(filtered2)
        }
        else {
          setUserData(filtered);
        }
      }
    }

    const checkSession = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission to access location was denied");
      }
      else {
        let { coords } = await Location.getCurrentPositionAsync();
        setLocation(coords);
        const { data, error } = await supabase.auth.updateUser({
          data: { location: coords }
        })
        if (error) console.log(error);
      }

      {
        const { data, error } = await supabase.auth.refreshSession()
        const { session, user } = data
        if (!session) router.replace("/");
      }

      const { data: { user }, error } = await supabase.auth.getUser();
      if (user && user.id) {
        setSwiper(user?.id);

      }
      setSwiperName(user?.user_metadata.first_name);
      let user_metadata;
      if (user) {
        user_metadata = user.user_metadata
        swiper();
      }
      if (user_metadata && (user_metadata.new_user || !user_metadata.university)) router.push('/profileSettings/completeRegistration');
    };
    checkSession();
  }, [router, swip]);

  const animRef = useRef(null);

  const left = async (idx: number) => {
    if ((userData && !userData[idx])) return;
    if (userData) {
      setOldCards(old => [...old, userData[idx]])
      const { data, error } = await supabase
        .from('passes')
        .insert([{ swiper_id: swip, swiped_id: userData[idx].id, swiper_name: swipName }])
      console.log('swipeleft: ', swipName);
    }
  }

  const swipedAll = () => {
    setCardIdx(0);
    setUserData(old => [...old, ...oldCards]);
    setOldCards([]);
  }

  const right = async (idx: number) => {
    if (userData && !userData[idx]) return;
    const { data, error } = await supabase
      .from('likes')
      .insert([{ swiper_id: swip, swiped_id: userData[idx].id, swiper_name: swipName }])
    console.log('swiperight: ', swipName);

    const { data: matches, error: matchError } = await supabase
      .from("likes")
      .select('*')
      .eq("swiper_id", userData[idx].id)
      .eq("swiped_id", swip)
      .single();

    if (matches && userData) {
      await supabase
        .from('matches')
        .insert([{ swiper_id: swip, swiped_id: userData[idx].id, swiper_name: swipName }])
      router.push({
        pathname: 'services/match', params: {
          swipername: swipName,
          swipedname: userData[idx].first_name,
          matchedUser: userData,
        },
      })
      let chatName = `${swipName} & ${userData[idx].first_name}`;
      await supabase.rpc('createchat', {
        chat_name: chatName,
        participant_ids: [userData[idx].id, swip]
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>SELECT A SERVICE</Text>


          <TouchableOpacity
            onPress={() => router.push('services/groups/interestGroups')}
            style={styles.input}>
            <FontAwesome5 name="user-friends" size={24} color="#D3D3D3" />
            <Text style={styles.service1}>Interest Groups</Text>
            <AntDesign name="right" size={24} color="#D3D3D3" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('services/chatFriends')}
            style={styles.input2}>
            <AntDesign name="wechat" size={24} color="#D3D3D3" />
            <Text style={styles.service2}>Chat With Friends</Text>
            <AntDesign name="right" size={24} color="#D3D3D3" />

          </TouchableOpacity>


        </View>

        <View style={styles.title}>
          <Text style={styles.title}>DISCOVER</Text>
          <TouchableOpacity style={{ paddingTop: 18, paddingLeft: 100 }}
            onPress={() => router.push('services/filter')}>
            <Ionicons name="filter-circle-sharp" size={40} color="#D3D3D3" />
          </TouchableOpacity>
        </View>


        <View>

          <Swiper
            ref={animRef}
            cards={userData ? userData : []}
            containerStyle={{ backgroundColor: 'transparent' }}
            cardIndex={0}
            animateCardOpacity
            stackSize={3}
            verticalSwipe={false}
            onSwipedAll={swipedAll}
            onSwipedLeft={(cardIndex) => {
              left(cardIndex)
            }}
            onSwipedRight={(cardIndex) => {
              right(cardIndex)
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
          <TouchableOpacity onPress={() => {
            if (animRef && animRef.current) {
              animRef.current.swipeLeft()
            }
          }}>
            <Image source={dislike} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            if (animRef && animRef.current) {
              animRef.current.swipeRight()
            }
          }}>
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
    color: '#D3D3D3',
    flexDirection: 'row'
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
