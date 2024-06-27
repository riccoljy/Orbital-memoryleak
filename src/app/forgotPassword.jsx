import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, Appearance, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import unibudslogo from '@/assets/images/unibuds.png';
import { supabase } from "@/src/supabase/supabase.js";
import { useRouter } from "expo-router";


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const router = useRouter();
    async function resetPassword() {
        /**
         * Step 1: Send the user an email to get a password reset token.
         * This email contains a link which sends the user back to your application.
         */
        const { data, error } = await supabase.auth
            .resetPasswordForEmail('limricco2002@gmail.com')
            console.log("data, err=", data,error);

        /**
         * Step 2: Once the user is redirected back to your application,
         * ask the user to reset their password.
         */
    }
    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("test");
            if (event == "PASSWORD_RECOVERY") {
                const newPassword = prompt("What would you like your new password to be?");
                const { data, error } = await supabase.auth
                    .updateUser({ password: newPassword })

                if (data) alert("Password updated successfully!")
                if (error) alert("There was an error updating your password.")
            }
        })
    }, [])
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='handled' style={styles.container}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, }}>
                    <Image source={unibudslogo} style={styles.logo} />
                    <Text style={{
                        color: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginBottom: 20,
                    }}>Reset Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#888"
                        onChangeText={setEmail}
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Button title="Register" onPress={resetPassword} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Appearance.getColorScheme() === 'dark' ? '#161622' : '#e7e7e8',
        padding: 16,
    },

    input: {
        color: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
        height: 40,
        width: '50%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
});

export default ForgotPassword;