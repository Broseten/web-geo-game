// Created by Vojtech Bruza
// Originally nspired by https://phrase.com/blog/posts/localizing-react-apps-with-i18next/

import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

let isInitialized = false;

export async function initializeI18n(supportedLngs: string[]) {
  if (!isInitialized) {
    await i18n
      // allows loading translations from a backend
      .use(HttpApi)
      // Add React bindings as a plugin.
      .use(initReactI18next)
      // Initialize the i18next instance.
      .init({
        // Config options

        // set the HttpApi options to config the path to locales
        backend: { loadPath: "/locales/{{lng}}.json" },

        // Specifies the default language (locale) used
        // when a user visits our site for the first time.
        // We use English here, but feel free to use
        // whichever locale you want.
        lng: "en",

        // Fallback locale used when a translation is
        // missing in the active locale. Again, use your
        // preferred locale here.
        fallbackLng: "en",

        // loaded runtime
        supportedLngs,

        // Enables useful output in the browser’s
        // dev console.
        debug: false,

        // Normally, we want `escapeValue: true` as it
        // ensures that i18next escapes any code in
        // translation messages, safeguarding against
        // XSS (cross-site scripting) attacks. However,
        // React does this escaping itself, so we turn
        // it off in i18next.
        interpolation: { escapeValue: false },
      });
    isInitialized = true;
  }
  return i18n;
}
