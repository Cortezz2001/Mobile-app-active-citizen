import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "../locales/en.json";
import ru from "../locales/ru.json";
import kz from "../locales/kz.json";

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    fallbackLng: "en",
    lng: "ru", // Устанавливает язык устройства по умолчанию
    resources: {
        en: { translation: en },
        ru: { translation: ru },
        kz: { translation: kz },
    },
    interpolation: {
        escapeValue: false, // Для react это не требуется
    },
});

export default i18n;
