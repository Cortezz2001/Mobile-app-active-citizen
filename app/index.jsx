import CustomButton from "@/components/CustomButton";
import images from "@/constants/images";
import { router, Redirect } from "expo-router";
import { ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <SafeAreaView className="bg-secondary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-black font-mbold text-center">
              Добро пожаловать в <Text className="text-primary">Активный гражданин!</Text>
            </Text>
            <Text className="text-sm font-mmedium text-black mt-4 text-center">
              Вы стали частью активного сообщества, где ваш голос важен! Здесь вы можете следить за новостями, сообщать о проблемах и поддерживать инициативы. Давайте вместе сделаем наш город лучше!
            </Text>
          </View>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />

        </View>
      </ScrollView>
      <StatusBar style="dark" />

    </SafeAreaView>
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Text className="text-xl font-black">Привет</Text>
    //   <Text className="text-xl font-mblack">Привет</Text>
    //   <Link href="/home" style={{color:'blue'}}>Home</Link>
    // </View>
  );
}
