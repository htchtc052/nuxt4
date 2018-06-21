<template>
  <div>
    <div class="container" v-if="error.statusCode == 404">
      <error404></error404>
    </div>
    <div class="container" v-else-if="error.statusCode == 403">
      <error403 :error="error"></error403>
    </div>
    <div class="container" v-else>
      <error500 :error="error"></error500>
    </div>
  </div>
</template>


<script>
import error404 from "~/components/error404.vue";
import error403 from "~/components/error403.vue";
import error500 from "~/components/error500.vue";
export default {
  props: ["error"],
  layout: "rm",
  components: {
    error404,
    error403,
    error500
  }
};
</script>