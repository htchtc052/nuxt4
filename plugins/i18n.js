import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const en = require("../lang/en.json");
const ru = require("../lang/ru.json");

//console.log("ru", ru)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.getters["lang/locale"],
    fallbackLocale: "ru",
    messages: {
      ru: ru,
      en: en
    }
  });

  app.i18n.path = link => {
    //console.log("$i18n.path", app.i18n.locale, app.i18n.fallbackLocale, link)
    if (link) {
      if (store.getters["lang/locale"] === app.i18n.fallbackLocale) {
        return `/` + link;
      } else {
        return `/` + store.getters["lang/locale"] + `/` + link;
      }
    } else {
      if (store.getters["lang/locale"] === app.i18n.fallbackLocale) {
        return `/`;
      } else {
        return `/` + store.getters["lang/locale"];
      }
    }
  };

  app.i18n.switchPath = (path, new_locale) => {
    //console.log("$i18n.switchLocalePath", app.i18n.locale, app.i18n.fallbackLocale, route.fullPath)
    let new_path;

    if (store.getters["lang/locale"] === app.i18n.fallbackLocale) {
      new_path = "/" + new_locale + path;
      console.log("switch from default locale to", new_locale);
    } else {
      const toReplace = "^/(" + store.getters["lang/locale"] + ")/?";
      const re = new RegExp(toReplace);
      new_path = path.replace(re, "/");

      console.log("switch from not default locale", new_path);
    }
    return new_path;
  };
};
