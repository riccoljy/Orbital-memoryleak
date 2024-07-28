import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { supabase } from "@/supabase/supabase";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';

interface Name {
    id: any,
    name: any
}


const joinGroup = () => {
    const { descrip, name, id, user_name } = useLocalSearchParams();
    const navigation = useNavigation();
    const [nameData, setNameData] = useState<Name[] | null>(null);
    const [userData, setUserData] = useState(null);
    const [grpId, setGrpId] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const join = async () => {

        if (grpId && user_name) {
            const { data: curData, error: nil } = await supabase
                .from('join_group')
                .select('name')
                .eq('group_id', grpId);

            console.log(curData);

            let { data: chats, error } = await supabase
                .from('chats')
                .select('*')
                .eq('group_id', grpId);

            console.log("Chaqweqwets, grpId-", chats[0].id, grpId);

            if (!curData?.map(val => val.name).includes(user_name)) {
                console.log("Here1")
                await supabase.rpc('join_group', { grp_id: grpId, creator: id, user_name: user_name })
                setRefresh(!refresh)
                console.log("Here2");

                let { data: chats, error } = await supabase
                    .from('chats')
                    .select('*')
                    .eq('group_id', grpId);

                console.log("Chats, grpId-", chats, grpId);

                if (chats && !chats.length && userData) {
                    await supabase.rpc('createchat', {
                        chat_name: name,
                        group_id: grpId,
                        participant_ids: [userData.id]
                    })
                    console.log("Created Grp Chat")
                }

                else if (chats && chats.length && userData) {
                    await supabase
                        .rpc('appendparticipants', {
                            chat_id: chats[0].id,
                            new_participant_ids: [userData.id]
                        })
                    console.log("Added to Grp Chat")
                }


                Alert.alert('Joined group successfully.')
            }
            else {
                Alert.alert('You are already in the group.') //Change to dont even give the option to click button if already in group
            }
        }



    }

    useEffect(() => {
        const checkSession = async () => {

            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError || !user) {
                console.error(userError);
                return;
            }
            setUserData(user);

            const { data: grp_id, error: n } = await supabase
                .from('create_group')
                .select('id2')
                .eq('name', name)
                .eq('description', descrip)
                .single();

            console.log(grp_id?.id2)
            setGrpId(grp_id?.id2)
        };
        checkSession();
    }, [name, descrip]);

    useEffect(() => {
        const getName = async () => {

            if (grpId) {
                const { data: name2, error } = await supabase
                    .from('join_group')
                    .select('id, name')
                    .eq('group_id', grpId);
                console.log(name2)
                setNameData(name2)
            }

        };
        getName();
    }, [grpId, refresh]);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={50} color="white" />
                </TouchableOpacity>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.headerText}>{name} </Text>

                </View>
            </View>

            <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                <Text style={styles.title}>Group Description</Text>
                <Text style={{ color: 'white', marginTop: 5, lineHeight: 24, textAlign: 'justify', }}
                >{descrip}</Text>
                <Text style={{ marginTop: 20 }}></Text>
                <Collapsible title='View Members:' >
                    <View>
                        <FlatList
                            data={nameData}
                            keyExtractor={(val) => val.id}
                            renderItem={({ item }) => (

                                <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                    <Text style={{ color: 'white' }}>{item.name} </Text>

                                </View>
                            )}
                        />
                    </View>

                </Collapsible>
                <Text style={{ marginTop: 20 }}></Text>

                <TouchableOpacity style={styles.button}
                    onPress={join} >
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>Join Group</Text>
                </TouchableOpacity>

            </View>


        </SafeAreaView>
    )
}

export default joinGroup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161622',
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 5,
    },

    header: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: '#161622',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingBottom: 15,
        marginHorizontal: 20

    },
    title: {
        fontSize: 26,
        paddingTop: 10,
        color: '#D3D3D3',
        flexDirection: 'row',
        marginBottom: 20,
        fontWeight: 'bold',

    },
    button: {
        marginTop: 20,
        marginHorizontal: 50,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
    },
})
