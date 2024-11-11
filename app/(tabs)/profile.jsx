import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/lib/context";
import { signOut } from "@/lib/appwrite";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";

const Profile = () => {
    const { user, setUser, setIsLogged } = useGlobalContext();

    const logout = async () => {
        await signOut();
        setUser(null);
        setIsLogged(false);

        router.replace("/sign-in");
    };
    return (
        <SafeAreaView className="bg-secondary h-full">
            <View className="w-full flex justify-center items-center h-full px-4">
                <CustomButton
                    title="Sign out"
                    handlePress={logout}
                    containerStyles="w-full mt-7 mt-10 min-h-[62px]"
                />
            </View>
        </SafeAreaView>
    );
};

export default Profile;
