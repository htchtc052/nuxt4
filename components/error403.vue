<template>
  <div class="container">
    <h1>{{ $t("page403_title") }}</h1>
    <div>{{ error.message }} </div>
    <i18n path="goto_target" tag="div">
      <nuxt-link :to="$i18n.path()">{{ $t('goto_main') }}</nuxt-link>
    </i18n>
    <i18n path="goto_target" tag="div">
      <nuxt-link :to="$i18n.path('login')">{{ $t('goto_login') }}</nuxt-link>
    </i18n>
  </div>
</template>
<script>
export default {
  props: ["error"],
  layout: "rm"
};
</script>
