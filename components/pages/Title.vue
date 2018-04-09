<template>
<div>
  <h1 class="page__title mb-0">{{ $parent.page.name }}</h1>
  <div>
    <span class="flagcountry_RU"></span><a class="text-muted t-11 ml-1">Москва</a>
  </div>
</div>
</template>

<script>
  export default {

    created: function() {
      //console.log(this.$parent.page);
    }

  }
</script>

<style>

</style>
