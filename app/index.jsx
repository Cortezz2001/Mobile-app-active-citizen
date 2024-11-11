import CustomButton from "@/components/CustomButton";
import images from "@/constants/images";
import { router, Redirect } from "expo-router";
import { ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/lib/context";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";

export default function Index() {
    const { t } = useTranslation();
    const { loading, isLogged } = useGlobalContext();

    if (!loading && isLogged) return <Redirect href="/home" />;
    return (
        <SafeAreaView className="bg-secondary h-full">
            <LanguageSelector />
            <ScrollView
                contentContainerStyle={{
                    height: "100%",
                }}
            >
                <View className="w-full flex justify-center items-center h-full px-4">
                    <Image
                        source={images.logo}
                        className="w-[130px] h-[84px] mb-8"
                        resizeMode="contain"
                    />
                    <View className="relative mt-5">
                        <Text className="text-3xl text-black font-mbold text-center">
                            {t("welcome-page.welcome")}
                        </Text>
                        <Text className="text-sm font-mmedium text-black mt-4 text-center leading-relaxed">
                            {t("welcome-page.desc")}
                        </Text>
                    </View>
                    <CustomButton
                        title={t("welcome-page.btn")}
                        handlePress={() => router.push("/sign-in")}
                        containerStyles="w-full mt-7 mt-10 min-h-[62px]"
                    />
                </View>
            </ScrollView>
            <StatusBar style="dark" />
        </SafeAreaView>
    );
}
