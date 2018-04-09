<template>
<div class="mainpage">

  <div class="bg-white">
    <div class="row p-3 pt-4">
      <div class="col-6">
        <Music></Music>
      </div>
      <div class="col-6 pl-0 pt-5">
        <CloudOfGenres></CloudOfGenres>
        <CloudOfTags></CloudOfTags>
        <Radio></Radio>
      </div>
    </div>
  </div>
  <News></News>
</div>
</template>

<script>
//import AppLogo from '~/components/AppLogo.vue'
import News from '~/components/News.vue'
import CloudOfGenres from '~/components/CloudOfGenres.vue'
import CloudOfTags from '~/components/CloudOfTags.vue'
import Radio from '~/components/Radio.vue'
import Music from '~/components/Music.vue'

export default {
  layout: 'rm',
   components: {
    Music,
    CloudOfGenres,
    CloudOfTags,
    Radio,
    News
  }
}

</script>

<style>
/* здесь стили, используемые только на главной странице */
.mainpage__tags .tags > a {margin-right: 10px;line-height: 25px;display: inline-block}
</style>

