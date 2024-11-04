import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import FormField from "@/components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import { useState } from "react";
// import CheckBox from "@react-native-community/checkbox";
import CustomButton from "@/components/CustomButton";
const SignUp = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <SafeAreaView className="flex-1 bg-white justify-center px-6">
            <StatusBar style="dark" />
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                }}
            >
                {/* Заголовок */}
                <Text className="text-3xl font-mbold text-black text-center mb-2">
                    Sign up
                </Text>
                <Text className="text-gray-500 text-center mb-8">
                    Create an account to get started
                </Text>

                <Text className="text-black font-msemibold text-left mb-2">
                    Name
                </Text>
                {/* Поле для имени */}
                <FormField
                    title="Name"
                    placeholder="Name"
                    handleChangeText={(text) => console.log("Name:", text)}
                />
                <Text className="text-black font-msemibold text-left mb-2">
                    Email Address
                </Text>
                {/* Поле для Email */}
                <FormField
                    title="Email"
                    placeholder="name@email.com"
                    handleChangeText={(text) => console.log("Email:", text)}
                />
                <Text className="text-black font-msemibold text-left mb-2">
                    Password
                </Text>
                {/* Поле для пароля */}
                <FormField
                    title="Password"
                    placeholder="Create a password"
                    handleChangeText={(text) => console.log("Password:", text)}
                />

                {/* Поле для подтверждения пароля */}
                <FormField
                    title="Password"
                    placeholder="Confirm password"
                    handleChangeText={(text) =>
                        console.log("Confirm Password:", text)
                    }
                    containerStyle="mb-8"
                />

                {/* Чекбокс для согласия с условиями
                <View className="flex-row items-center mt-4 mb-6">
                    <CheckBox
                        value={isChecked}
                        onValueChange={setIsChecked}
                        className="mr-2"
                    />
                    <Text className="text-gray-500">
                        I've read and agree with the{" "}
                        <Text className="text-blue-500">
                            Terms and Conditions
                        </Text>{" "}
                        and the{" "}
                        <Text className="text-blue-500">Privacy Policy</Text>.
                    </Text>
                </View> */}

                {/* Кнопка Sign Up */}
                <CustomButton
                    title="Sign up"
                    handlePress={() => console.log("Sign Up pressed")}
                    containerStyles="rounded-lg py-3"
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
