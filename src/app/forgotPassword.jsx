import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, Appearance, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import unibudslogo from '../../assets/images/unibuds.png';
import { supabase } from "../supabase/supabase";
import { useRouter } from "expo-router";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const router = useRouter();

    async function resetPassword() {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        console.log("data, error=", data, error);
        if (error) {
            Alert.alert("Error", error.message);
        } else {
            Alert.alert("Success", "Password reset email sent!");
        }
    }

    // useEffect(() => {
    //     const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
    //         console.log("auth state change", event, session);
    //         if (event === "PASSWORD_RECOVERY") {
    //             const newPassword = await new Promise((resolve) => {
    //                 Alert.prompt("New Password", "Enter your new password", [
    //                     {
    //                         text: "Cancel",
    //                         style: "cancel"
    //                     },
    //                     {
    //                         text: "OK",
    //                         onPress: (password) => resolve(password)
    //                     }
    //                 ]);
    //             });

    //             if (newPassword) {
    //                 const { data, error } = await supabase.auth.updateUser({ password: newPassword });

    //                 if (data) Alert.alert("Success", "Password updated successfully!");
    //                 if (error) Alert.alert("Error", "There was an error updating your password.");
    //                 console.log('password update', data, error);
    //             }
    //         }
    //     });

    //     // Cleanup listener on component unmount
    //     return () => {
    //         if (authListener) authListener.subscription.unsubscribe();
    //     };
    // }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='handled'
                style={styles.container}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                    <Image source={unibudslogo} style={styles.logo} />
                    <Text style={{
                        color: Appearance.getColorScheme() === 'dark' ? '#fff' : '#000',
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginBottom: 20,
                    }}>
                        Reset Password
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#888"
                        onChangeText={setEmail}
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Button title="Confirm reset password" onPress={resetPassword} />
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
