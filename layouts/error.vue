<template>
<div>
    <div class="container" v-if="error.statusCode === 404">
        <h1>{{ $t("404_title") }}</h1>
        <div>{{ $t("404_text") }}</div>
    </div>

    <div class="container" v-if="error.statusCode === 500">
        <h1>{{ $t("500_title") }}</h1>
    </div>

    <div class="container" v-if="error.statusCode === 401">
        <h1>{{ $t("401_title") }}</h1>
    </div>

    <div class="container" v-if="error.statusCode === 403">
        <h1>{{ $t("403_title") }}</h1>
    </div>

    <div>{{ error.message }} </div>

    <i18n path="goto" tag="div" v-if="error.statusCode === 500 || error.statusCode === 404 || error.statusCode == 403"><a href="/">{{ $t('goto_main') }}</a></i18n>
    <i18n path="goto" tag="div" v-if="error.statusCode === 401"><a href="/login">{{ $t('goto_login') }}</a></i18n>

</div>
</template>

<script>
export default {
  props: ["error"],
  layout: "rm" // you can set a custom layout for the error page
};
</script>