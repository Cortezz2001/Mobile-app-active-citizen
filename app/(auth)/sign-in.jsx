import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons"; // Для иконок (например, Facebook, Google, Apple)
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import FormField from "@/components/FormField";
import GoogleButton from "@/components/GoogleButton";
import { useGlobalContext } from "@/lib/context";
import { getCurrentUser, signIn } from "@/lib/appwrite";
export default function SignIn() {
    const { setUser, setIsLogged } = useGlobalContext();
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSignIn = async () => {
        if (form.email === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setSubmitting(true);

        try {
            await signIn(form.email, form.password);
            const result = await getCurrentUser();
            setUser(result);
            setIsLogged(true);

            Alert.alert("Success", "User signed in successfully");
            router.replace("/home");
        } catch (error) {
            Alert.alert("Error", error.message);
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
                {/* Заголовок */}
                <Text className="text-3xl font-mbold text-black text-center mb-8">
                    Welcome!
                </Text>

                {/* Поле для Email */}
                <FormField
                    title="Email"
                    value={form.email}
                    handleChangeText={(e) => setForm({ ...form, email: e })}
                    placeholder="Email Address"
                    keyboardType="email-address"
                />

                {/* Поле для пароля */}
                <FormField
                    title="Password"
                    value={form.password}
                    handleChangeText={(e) => setForm({ ...form, password: e })}
                    placeholder="Password"
                />

                {/* Ссылка для восстановления пароля */}
                <TouchableOpacity>
                    <Text className="text-blue-500 text-sm text-right mb-6 font-mmedium">
                        Forgot password?
                    </Text>
                </TouchableOpacity>

                {/* Кнопка Login */}
                <CustomButton
                    title="Login"
                    handlePress={handleSignIn}
                    containerStyles="rounded-lg py-3 mb-6"
                    isLoading={isSubmitting}
                />

                {/* <TouchableOpacity className="bg-blue-600 rounded-lg py-3 mb-6">
                <Text className="text-white text-center font-msemibold text-base font-msemibold">
                    Login
                </Text>
            </TouchableOpacity> */}

                {/* Ссылка для регистрации */}
                <View className="flex-row justify-center mb-4">
                    <Text className="text-gray-500 font-mmedium">
                        Not a member?{" "}
                    </Text>
                    <TouchableOpacity>
                        <Link
                            href="/sign-up"
                            className="text-blue-500 font-mmedium"
                        >
                            Sign up
                        </Link>
                    </TouchableOpacity>
                </View>

                {/* Разделитель */}
                <View className="flex-row items-center justify-center mb-6 mt-3">
                    <View className="flex-1 h-[1px] bg-gray-300" />
                    <Text className="text-gray-500 px-2 font-mmedium">
                        Or continue with
                    </Text>
                    <View className="flex-1 h-[1px] bg-gray-300" />
                </View>
                <GoogleButton />
            </ScrollView>
        </SafeAreaView>
    );
}
