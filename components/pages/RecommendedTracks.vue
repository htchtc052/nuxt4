<template>
<div class="recommend">
  <div class="recommend__title mb-4">Рекомендуемые треки</div>
 <ul class="list-unstyled tracklist">

   <li v-for="(ft, ft_id) in $parent.ft" :key="ft_id" class="border-bottom p-2 recommend__track">
    <div class="d-flex s-player align-items-center">
      <a @click="$store.commit('playTrack', ft.trackid)" href="#" class="d-inline-block text-link-o p-2 s-player__btn text-center">
        <span class="fas fa-play"></span>
      </a>
      <div class="d-flex flex-column pl-2">
        <a href="#" class="font-weight-bold text-break">{{ ft.trackname }}</a>
        <small class="text-muted t-11">{{ ft.genrename }}</small>
      </div>
    </div>
    </li>

   </ul>
   <div>
     <a class="text-muted t-12" href="/id188782/music/">Все треки</a>
   </div>
</div>
</template>

<script>
  export default {
  }
</script>

<style>

.recommend { }
.recommend__title {font: 20px 'Roboto Condensed', Tahoma sans-serif;color: #EE8803;}
.recommend__track .s-player__btn + .d-flex.flex-column {widows: 190px;}

</style>
