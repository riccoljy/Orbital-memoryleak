import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Appearance, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from "expo-router";
import { supabase } from "@/src/supabase/supabase.js";
import DateTimePicker from '@react-native-community/datetimepicker';


const CompleteRegistration = () => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [firstname, setFirstName] = useState('');
    const [lastname, setlastName] = useState('');
    const [birthdate, setBirthdate] = useState(new Date(Date.now()));
    const [university, setUniversity] = useState('');
    const [course, setCourse] = useState('');
    const [bio, setBio] = useState('');
    const colorScheme = Appearance.getColorScheme();
    const placeholderColor = colorScheme === 'dark' ? '#ccc' : '#888';

    useEffect(() => {
        const getName = async () => {
            let { data: { user: { user_metadata } } } = await supabase.auth.getUser();
            setUserData(user_metadata);
            setFirstName(user_metadata.first_name);
            setlastName(user_metadata.last_name);
            if (user_metadata.birthdate) setBirthdate(new Date(user_metadata.birthdate));
            if (user_metadata.university) setUniversity(user_metadata.university);
            if (user_metadata.course) setCourse(user_metadata.course);
            if (user_metadata.bio) setBio(user_metadata.bio);

        };

        getName();
    }, []);

    const handleSubmit = async () => {
        console.log({ firstname, lastname, birthdate, university, course, bio });
        const { data, error } = await supabase.auth.updateUser({
            data: {
                first_name: firstname,
                last_name: lastname,
                birthdate: birthdate,
                university: university,
                course: course,
                bio: bio,
                new_user: false,
            },
        })
        if (!error && router.canGoBack()) router.back();
        else console.log(`data=${data}, \nerror=${error}`)
    };

    const universities = [
        { label: 'National University of Singapore', value: 'nus' },
        { label: 'Nanyang Technological University', value: 'ntu' },
        { label: 'Singapore Management University', value: 'smu' },
        { label: 'Singapore University of Social Sciences', value: 'suss' },
        { label: 'Singapore Institute of Technology', value: 'sit' },
        { label: 'Singapore University of Technology and Design	', value: 'sutd' },
        { label: 'University of the Arts Singapore', value: 'uas' },
        { label: 'Others', value: 'others' },
    ];

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthdate;
        setBirthdate(currentDate);
    };

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* <SafeAreaView style={styles.container}> */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='handled' style={styles.container}
            >
                <View style={{flex: 1}}>
                    <Text style={styles.label}>First name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="First name"
                        placeholderTextColor={placeholderColor}
                        value={firstname}
                        onChangeText={setFirstName}
                    />
                    <Text style={styles.label}>Last name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Last name"
                        placeholderTextColor={placeholderColor}
                        value={lastname}
                        onChangeText={setlastName}
                    />
                    <Text style={styles.label}>Birthdate</Text>
                    {/* <Button title="Select Birthdate" 
                onPress={() => {setShowDatePicker(true)}} 
                />
                {showDatePicker &&  */}
                    <View style={{ alignSelf: 'flex-start', marginBottom: 20, }}>
                        <DateTimePicker
                            value={birthdate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    </View>
                    {/* } */}
                    <Text style={styles.label}>University</Text>
                    <Dropdown
                        style={styles.dropdown}
                        containerStyle={styles.dropdownContainer}
                        data={universities}
                        labelField="label"
                        valueField="value"
                        placeholder="Select University"
                        placeholderStyle={{ color: placeholderColor }}
                        selectedTextStyle={{ color: '#000' }}
                        value={university}
                        onChange={item => setUniversity(item.value)}
                    />
                    {university === 'others' && (
                        <TextInput
                            style={styles.input}
                            placeholder="Please specify your university"
                            placeholderTextColor={placeholderColor}
                            value={university}
                            onChangeText={setUniversity}
                        />
                    )}
                    <Text style={styles.label}>Course</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Course"
                        placeholderTextColor={placeholderColor}
                        value={course}
                        onChangeText={setCourse}
                    />
                    <Text style={styles.label}>Bio</Text>
                    <TextInput
                        style={[styles.input, styles.bioInput]}
                        placeholder="Tell us about yourself"
                        placeholderTextColor={placeholderColor}
                        value={bio}
                        onChangeText={setBio}
                        multiline
                    />
                    <Button title="Submit" onPress={handleSubmit} />
                </View>
            </ScrollView>
        {/* </SafeAreaView> */}
        </KeyboardAvoidingView>
    );
};

export default CompleteRegistration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Appearance.getColorScheme() === 'dark' ? '#161622' : '#e7e7e8',
        padding: 16,
        paddingTop: 40
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        color: '#000',
    },
    bioInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    dropdown: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    dropdownContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
    },

});
