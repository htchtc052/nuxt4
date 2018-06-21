<template>
  <div class="container">
    <h1>{{ $t("page500_title") }}</h1>
    <div>{{ error.message }} </div>
    <i18n path="goto_target" tag="div">
      <nuxt-link :to="$i18n.path()">{{ $t('goto_main') }}</nuxt-link>
    </i18n>
  </div>
</template>
<script>
export default {
  props: ["error"],
  layout: "rm"
};
</script>
