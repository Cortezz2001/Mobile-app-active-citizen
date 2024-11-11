import { Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import FormField from "@/components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { useGlobalContext } from "@/lib/context";
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
    const { setUser, setIsLogged } = useGlobalContext();
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };
    // Функция регистрации
    const handleSignUp = async () => {
        const { name, email, password, confirmPassword } = form;
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        } else if (!isValidEmail(email)) {
            Alert.alert("Registration Error", "Please enter a valid email.");
            return;
        }
        setSubmitting(true);
        try {
            const result = await createUser(email, password, name);
            setUser(result);
            setIsLogged(true);
            router.replace("/home");
        } catch (error) {
            if (
                error.message.includes(
                    "A user with the same id, email, or phone already exists"
                )
            ) {
                Alert.alert(
                    "Registration Error",
                    "A user with this email already exists."
                );
            } else if (
                error.message.includes(
                    "Password must be between 8 and 265 characters long"
                )
            ) {
                Alert.alert(
                    "Registration Error",
                    "Password is too short or too simple. Please use a stronger password."
                );
            } else {
                Alert.alert(
                    "Registration Error",
                    "An error occurred during registration. Please try again."
                );
            }
            console.error("Registration Error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white justify-center px-6">
            <StatusBar style="dark" />
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                }}
            >
                <Text className="text-3xl font-mbold text-black text-center mb-2">
                    Sign up
                </Text>
                <Text className="text-gray-500 text-center mb-8">
                    Create an account to get started
                </Text>

                <Text className="text-black font-msemibold text-left mb-2">
                    Name
                </Text>
                <FormField
                    title="Name"
                    placeholder="Name"
                    value={form.name}
                    handleChangeText={(e) => setForm({ ...form, name: e })}
                />

                <Text className="text-black font-msemibold text-left mb-2">
                    Email Address
                </Text>
                <FormField
                    title="Email"
                    placeholder="name@email.com"
                    value={form.email}
                    handleChangeText={(e) => setForm({ ...form, email: e })}
                    keyboardType="email-address"
                />

                <Text className="text-black font-msemibold text-left mb-2">
                    Password
                </Text>
                <FormField
                    title="Password"
                    placeholder="Create a password"
                    value={form.password}
                    handleChangeText={(e) => setForm({ ...form, password: e })}
                />

                <FormField
                    title="Password"
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    handleChangeText={(e) =>
                        setForm({ ...form, confirmPassword: e })
                    }
                    containerStyle="mb-8"
                />

                <CustomButton
                    title="Sign up"
                    handlePress={handleSignUp}
                    containerStyles="rounded-lg py-3"
                    isLoading={isSubmitting}
                />
                <View className="flex-row justify-center mb-4 mt-6">
                    <Text className="text-gray-500 font-mmedium">
                        Have an account already?{" "}
                    </Text>
                    <TouchableOpacity>
                        <Link
                            href="/sign-in"
                            className="text-blue-500 font-mmedium"
                        >
                            Sign in
                        </Link>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
