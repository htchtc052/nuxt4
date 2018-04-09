<template>
  <div class="mr-3">
    <div class="d-flex justify-content-between">
      <h2 class="t-36 font-weight-light">
        <a href="#" class="text-link-o text-nolink">МУЗЫКА</a>
      </h2>
    </div>
    <ul class="nav nav-tabs mt-2" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="tracks-tab" data-toggle="tab" href="#tracks" role="tab" aria-controls="tracks" aria-selected="true">Треки</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="musicians-tab" data-toggle="tab" href="#musicians" role="tab" aria-controls="musicians" aria-selected="false">Музыканты</a>
      </li>
    </ul>
    <div class="tab-content border-bottom border-right border-left">
      <div class="tab-pane fade show active" id="tracks" role="tabpanel" aria-labelledby="tracks-tab">
        <ul class="nav nav-pills px-2 py-3">
          <li class="nav-item">
            <a href="#"  @click.prevent="selectPlace('main_new')" v-bind:class="{ 'nav-link t-12': this.place != 'main_new', 'nav-link active t-12': this.place == 'main_new' }">Новые</a>
          </li>
          <li class="nav-item">
               <a href="#"  @click.prevent="selectPlace('main_rate')" v-bind:class="{ 'nav-link t-12': this.place != 'main_rate', 'nav-link active t-12': this.place == 'main_rate' }">Популярные</a>
         
          </li>
          <li class="nav-item">
              <a href="#"  @click.prevent="selectPlace('main_recommend')" v-bind:class="{ 'nav-link t-12': this.place != 'main_recommend', 'nav-link active t-12': this.place == 'main_recommend' }">Рекомендуем</a>
          </li> 
        </ul>

          <MusicList :tracks=tracks_new :place="'main_new'" v-if="this.place == 'main_new'"></MusicList>
          <MusicList :tracks=tracks_rate :place="'main_rate'" v-if="this.place == 'main_rate'"></MusicList>
          <MusicList :tracks=tracks_recommend :place="'main_recommend'" v-if="this.place == 'main_recommend'"></MusicList>
     
      </div>
      <div class="tab-pane fade" id="musicians" role="tabpanel" aria-labelledby="musicians-tab">...</div>
    </div>
  </div>
</template>

<script>


import MusicList from '~/components/MusicList.vue'


export default {
    components: {
      MusicList
    },
      data: function() {
      return {
        place: 'main_new',
        tracks_new : [
          { id: 1466483, title: 'TDP (Truden Domoy Put)', page_title: 'AVERRUNK', page_id: 182593 },
          //{ id: 1447977, title: 'Душа моя прописана в России', page_title: 'Александр Трушин', page_id: 186116 },
          //{ id: 1431537, title: 'Я тебя утоплю', page_title: 'Сергей Сухомлин', page_id: 178742 },
          //{ id: 1412560, title: 'Театр', page_title: 'AVERRUNK', page_id: 182593 },
          { id: 1459635, title: 'Pain feat. Olli Perttula', page_title: 'Birdcherry', page_id: 9694 },
          { id: 1459861, title: 'Your betrayal (Original Mix)', page_title: 'MIVA\'SOLSTICE', page_id: 81915 },
          { id: 1459520, title: 'Первая осень', page_title: 'Юрич Пасечный', page_id: 161156 },
        ],
        tracks_rate : [
          //{ id: 1466483, title: 'TDP (Truden Domoy Put)', page_title: 'AVERRUNK', page_id: 182593 },
          { id: 1447977, title: 'Душа моя прописана в России', page_title: 'Александр Трушин', page_id: 186116 },
          { id: 1431537, title: 'Я тебя утоплю', page_title: 'Сергей Сухомлин', page_id: 178742 },
          { id: 1412560, title: 'Театр', page_title: 'AVERRUNK', page_id: 182593 },
          { id: 1459635, title: 'Pain feat. Olli Perttula', page_title: 'Birdcherry', page_id: 9694 },
          { id: 1459861, title: 'Your betrayal (Original Mix)', page_title: 'MIVA\'SOLSTICE', page_id: 81915 },
          //{ id: 1459520, title: 'Первая осень', page_title: 'Юрич Пасечный', page_id: 161156 },
        ],
        tracks_recommend : [
          { id: 1466483, title: 'TDP (Truden Domoy Put)', page_title: 'AVERRUNK', page_id: 182593 },
          { id: 1447977, title: 'Душа моя прописана в России', page_title: 'Александр Трушин', page_id: 186116 },
          //{ id: 1431537, title: 'Я тебя утоплю', page_title: 'Сергей Сухомлин', page_id: 178742 },
          { id: 1412560, title: 'Театр', page_title: 'AVERRUNK', page_id: 182593 },
          //{ id: 1459635, title: 'Pain feat. Olli Perttula', page_title: 'Birdcherry', page_id: 9694 },
          { id: 1459861, title: 'Your betrayal (Original Mix)', page_title: 'MIVA\'SOLSTICE', page_id: 81915 },
          //{ id: 1459520, title: 'Первая осень', page_title: 'Юрич Пасечный', page_id: 161156 },
        ]
      }
    },
    methods: {
      selectPlace: function(place) {
          this.place = place
      }
    }
}
</script>

<style>
.track-play {position: relative}
.track-play .fas {position: absolute; color: #fff;background-color: #ee8803;border-radius: 100%;width: 28px;height: 28px;text-align: center;top:calc(50% - 14px);
left:calc(50% - 14px); line-height: 28px;font-size: 12px;visibility: hidden;}
.track-play:hover .fas {visibility: visible;}
</style>
