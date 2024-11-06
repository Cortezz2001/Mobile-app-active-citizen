import { Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import FormField from "@/components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import CustomButton from "@/components/CustomButton";
import { registerUser } from '@/lib/AuthService'; 
import { Link, router } from "expo-router";

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      };
    // Функция регистрации
    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        else if (!isValidEmail(email)){
            Alert.alert('Registration Error', 'Please enter a valid email.');
            return;
        }

        try {
            await registerUser(email, password, name);
            Alert.alert('Success!', 'Registration successful!', [{ onPress: () => {
                router.replace("/sign-in");
              }}]);
        } catch (error) {
            if (error.message.includes('A user with the same id, email, or phone already exists')) {
                Alert.alert('Registration Error', 'A user with this email already exists.');
            } else if (error.message.includes('Password must be between 8 and 265 characters long')) {
                Alert.alert('Registration Error', 'Password is too short or too simple. Please use a stronger password.');
            } else {
                Alert.alert('Registration Error', 'An error occurred during registration. Please try again.');
            }
            console.error("Registration Error:", error);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white justify-center px-6">
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
                <Text className="text-3xl font-mbold text-black text-center mb-2">
                    Sign up
                </Text>
                <Text className="text-gray-500 text-center mb-8">
                    Create an account to get started
                </Text>

                <Text className="text-black font-msemibold text-left mb-2">Name</Text>
                <FormField title="Name" placeholder="Name" handleChangeText={setName} />

                <Text className="text-black font-msemibold text-left mb-2">Email Address</Text>
                <FormField title="Email" placeholder="name@email.com" handleChangeText={setEmail} />

                <Text className="text-black font-msemibold text-left mb-2">Password</Text>
                <FormField title="Password" placeholder="Create a password" handleChangeText={setPassword} />

                <FormField
                    title="Password"
                    placeholder="Confirm password"
                    handleChangeText={setConfirmPassword}
                    containerStyle="mb-8"
                />

                <CustomButton title="Sign up" handlePress={handleSignUp} containerStyles="rounded-lg py-3" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
