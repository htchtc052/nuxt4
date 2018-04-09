<template>
<div class="pb-3">
  <a href="#">
    <img class="rounded " :src="'https://www.realmusic.ru/img.php?src=/media/bandimg/' + ($parent.page.bandid % 10) + '/' + $parent.page.bandid + '.jpg&w=240&h=240'">
  </a>
</div>
</template>

<script>
  export default {
  }
</script>

<style>

</style>
