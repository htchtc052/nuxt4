<template>
  <div class="mainpage__tags mb-4">
    <h3 class="t-21 mb-2">
      <a href="#" class="text-nolink text-muted">ТЕГИ:</a>
    </h3>
    <div class="d-flex flex-wrap tags">
      <a v-for="(tag, tag_id) in cloudOfTags" :href="'/music/tags/' + tag.tag" :key="tag_id">
        <span v-bind:style="{ 'font-size': tag.rating + 'px' }">{{ tag.tag }}</span>
      </a>
    </div>
    <div class="text-right py-2 px-1 mainpage__morelink t-13">
      <a class="mr-1 text-muted" href="/news/">Показать больше</a><span class="text-muted t-11 fas fa-angle-right"></span>
    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        cloudOfTags : [
          { rating: 24, tag: 'любовь' },
          { rating: 24, tag: 'лирика' },
          { rating: 23, tag: 'рок' },
          { rating: 23, tag: 'жизнь' },
          { rating: 22, tag: 'душа' },
          { rating: 22, tag: 'гитара' },
          { rating: 21, tag: 'шансон' },
          { rating: 21, tag: 'красота' },
          { rating: 21, tag: 'романтика' },
          { rating: 20, tag: 'грусть' },
          { rating: 20, tag: 'авторская песня' },
          { rating: 19, tag: 'инструментал' },
          { rating: 19, tag: 'поп' },
          { rating: 18, tag: 'чувства' },
          { rating: 18, tag: 'эстрадная музыка' },
          { rating: 18, tag: 'rock' },
          { rating: 17, tag: 'боль' },
          { rating: 17, tag: 'счастье' },
          { rating: 16, tag: 'love' },
          { rating: 16, tag: 'одиночество' },
          { rating: 15, tag: 'инструментальная музыка' },
          { rating: 15, tag: 'печаль' },
          { rating: 15, tag: 'война' },
          { rating: 14, tag: 'рэп' },
          { rating: 14, tag: 'свобода' },
          { rating: 13, tag: 'ночь' },
          { rating: 13, tag: 'hip-hop' },
          { rating: 12, tag: 'смерть' },
          { rating: 12, tag: 'осень' },
          { rating: 12, tag: 'бард' },
          { rating: 11, tag: 'константин куклин' },
          { rating: 11, tag: 'время' },
          { rating: 10, tag: 'йошкар-ола' },
          { rating: 10, tag: 'марий эл' },
          { rating: 9, tag: 'радость' },
        ]
      }
    }
  }
</script>

<style>

</style>
