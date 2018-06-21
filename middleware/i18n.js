export default function({ isHMR, app, store, route, params, redirect, error }) {
  if (isHMR) return;
  console.log(
    "lang midd input locale",
    params,
    params.lang ? params.lang : null
  );
  const defaultLocale = app.i18n.fallbackLocale;

  const new_locale = params.lang || defaultLocale;

  const locale = store.getters["lang/locales"].find(function(locale) {
    return locale["code"] === new_locale;
  });

  if (!locale) {
    console.log("lang midd bad locale 404");

    return error({
      statusCode: 404
    });
  }
  console.log(
    "lang midd new_locale",
    new_locale,
    "locale",
    locale ? locale["code"] : null
  );

  store.commit("lang/SET_LANG", new_locale);

  app.i18n.locale = new_locale;

  console.log("lang midd exists locale " +new_locale + " route.fullPath " + route.fullPath);

  // If route is /<defaultLocale>/... -> redirect to /...
  if (new_locale === defaultLocale && route.fullPath.indexOf("/" + defaultLocale) === 0) {
    const toReplace = "^/(" + new_locale + ")/?";
    const re = new RegExp(toReplace);
    //const pathWithoutPrefix = route.fullPath.replace(/^\/(ru)\/?/,'/');
    const pathWithoutPrefix = route.fullPath.replace(re, "/");

    console.log("lang midd before redir", route.fullPath, pathWithoutPrefix);
    return redirect(pathWithoutPrefix);
  }

  console.log("end lang middleware");
}
