<template>
  <div class="mainpage__tags mb-4 mt-3">
    <h3 class="t-21 mb-2">
      <a href="#" class="text-nolink text-muted">ЖАНРЫ:</a>
    </h3>
    <div class="d-flex flex-wrap tags">
      <a v-for="(genre, genre_id) in cloudOfGenres" :href="'/music/genres/' + genre.code" :key="genre_id">
        <span v-bind:style="{ 'font-size': genre.rating + 'px' }">{{ genre.title }}</span>
      </a>
    </div>
    <div class="text-right py-2 px-1 mainpage__morelink t-13">
      <a class="mr-1 text-muted" href="/music/">Показать больше</a><span class="text-muted t-11 fas fa-angle-right"></span>
    </div>
  </div>
</template>

<script>

  export default {
    data: function() {
      return {
        cloudOfGenres : [
          { code: 'rap', rating: 24, title: 'рэп' },
          { code: 'alternative_rock', rating: 24, title: 'альтернативный рок' },
          { code: 'estrada', rating: 23, title: 'эстрадная музыка' },
          { code: 'hiphop', rating: 23, title: 'хип-хоп' },
          { code: 'haus', rating: 22, title: 'хаус' },
          { code: 'bards', rating: 22, title: 'авторская песня' },
          { code: 'dance_pop', rating: 21, title: 'танцевальная поп-музыка' },
          { code: 'trance', rating: 21, title: 'транс' },
          { code: 'pop_rock', rating: 21, title: 'поп-рок' },
          { code: 'alternative_hiphop', rating: 20, title: 'альтернативный хип-хоп' },
          { code: 'chanson', rating: 20, title: 'шансон' },
          { code: 'hard_rock', rating: 19, title: 'хард-рок' },
          { code: 'punk', rating: 19, title: 'панк' },
          { code: 'blues', rating: 18, title: 'блюз' },
          { code: 'techno', rating: 18, title: 'техно' },
          { code: 'drum_n_bass', rating: 18, title: 'drum & bass' },
          { code: 'idm', rating: 17, title: 'idm' },
          { code: 'electronic_pop', rating: 17, title: 'электро-поп' },
          { code: 'progressive_rock', rating: 16, title: 'прогрессивный рок/арт-рок' },
          { code: 'rock_n_roll', rating: 16, title: 'рок-н-ролл' },
          { code: 'ambient', rating: 15, title: 'эмбиент' },
          { code: 'alternative_metal', rating: 15, title: 'альтернативный метал/ню-метал' },
          { code: 'breakbeat', rating: 15, title: 'брейкбит' },
          { code: 'industrial', rating: 14, title: 'индастриал' },
          { code: 'soft_rock', rating: 14, title: 'софт-рок' },
          { code: 'new_age', rating: 13, title: 'нью-эйдж' },
          { code: 'heavy_metal', rating: 13, title: 'хэви-метал' },
          { code: 'relaxation_music', rating: 12, title: 'музыка для медитации/релаксации' },
          { code: 'ritm_bluz', rating: 12, title: 'ритм-энд-блюз' },
          { code: 'modern', rating: 12, title: 'современная классика/модерн' },
          { code: 'psychedelic_rock', rating: 11, title: 'психоделический рок' },
          { code: 'indie_rock', rating: 11, title: 'инди-рок' },
          { code: 'folk_rock', rating: 10, title: 'фолк-рок' },
          { code: 'soundtracks', rating: 10, title: 'саундтреки к фильмам' },
          { code: 'r_and_b', rating: 9, title: 'r&b' },
        ]
      }
    }
  }

</script>

<style>

</style>
