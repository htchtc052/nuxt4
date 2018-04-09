<template>
<div class="py-4 px-1">

<div class="text-center d-inline-block pb-4">
  <span class="page__smtitle">{{ page.name }}</span>
  <div class="text-muted t-11" >{{ page.birthyear }}</div>
</div>

<div v-if="page.ndescr" class="pb-4">
  <strong class="d-block pb-2">Краткое описание коллектива</strong>
  <div>{{ page.ndescr }}</div>
</div>

<div class="pb-4">
<strong class="d-block pb-2">Жанры</strong>
<ul class="genres">
  <li v-for="genre in page.genres" :key="genre.id">
    <a :href="'/music/genres/' + genre.sname">{{ genre.name }}</a>
  </li>
</ul>
</div>

<div class="pb-4">
  <strong class="d-block pb-2">Адрес на RealMusic.ru</strong>
  <a href="#">https://www.realmusic.ru/{{ page.sename }}</a>
</div>

<div v-if="page.descr" class="pb-4">
  <strong class="d-block pb-2">Описание</strong>
  <div class="text-format">{{ page.descr }}</div>
</div>

<div class="pb-4">
  <strong class="d-block pb-2">Участники</strong>
  <div v-for="member in page.members" :key="member.id" class="pb-2">
    <a href="#">{{ member.first_name }} {{ member.middle_name }} {{ member.last_name }}</a>
    <div class="text-muted t-11">{{ member.role_name }}</div>
  </div>
  <div>
    <a :href="'/members/' + page.owner_user_id">{{ page.owner_nickname }}</a>
    <div class="text-muted t-11">Владелец страницы</div>
  </div>
  <!-- <div class="pt-3">
    <a class="btn btn-sm btn-outline-secondary t-12" href="#">Добавить участника</a>
  </div> -->
</div>

<div v-if="page.links" class="pb-4">
  <strong class="d-block">Сайты</strong>
  <div v-for="link in page.links" :key="link.id" class="pt-2">
    <a target="_blank" :href="link.url">{{ link.url }}</a>
    <div class="text-muted t-11" v-if="link.descr">{{ link.descr }}</div>
  </div>
</div>

<div v-if="page.press" class="pb-4">
  <strong class="d-block pb-2">Пресса</strong>
  <div>{{ page.press }}</div>
</div>

<div v-if="page.history" class="pb-4">
  <strong class="d-block pb-2">История</strong>
  <div>{{ page.history }}</div>
</div>

<div v-if="page.instruments" class="pb-4">
  <strong class="d-block pb-2">Инструменты и оборудование</strong>
  <div>{{ page.instruments }}</div>
</div>

<div v-if="page.albums" class="pb-4">
  <strong class="d-block pb-2">Альбомы</strong>
  <div>{{ page.albums }}</div>
</div>

<div v-if="page.likemusic" class="pb-4">
  <strong class="d-block pb-2">Предпочтения</strong>
  <div>{{ page.likemusic }}</div>
</div>

<div v-if="page.likeartist" class="pb-4">
  <strong class="d-block pb-2">Вдохновляют</strong>
  <div>{{ page.likeartist }}</div>
</div>

</div>
</template>

<script>
  export default {
    data: function () {
      return {
        page: this.$parent.page,
      }
    }
  }
</script>

<style>



</style>
