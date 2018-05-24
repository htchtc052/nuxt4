<template>
<div class="bg-white p-3 page">

  <div class="m-1 d-flex justify-content-between align-items-center pt-2 pb-3">
<!--     <PageTitle></PageTitle>
    <PageControls></PageControls> -->
  </div>

  <div class="d-flex">
    <div class="mr-3 page__leftbox">
<!--       <PageAvatar></PageAvatar>
      <PageRecommendedTracks></PageRecommendedTracks> -->
    </div>
    <div class="w-100">
    <!--   <PageMenu></PageMenu>
      <PageMain></PageMain> -->
    </div>
  </div>
</div>
</template>

<script>

import axios from 'axios'
/* import PageTitle from '~/components/pages/Title.vue'
import PageControls from '~/components/pages/Controls.vue'
import PageAvatar from '~/components/pages/Avatar.vue'
import PageMenu from '~/components/pages/Menu.vue'
import PageRecommendedTracks from '~/components/pages/RecommendedTracks.vue'
import PageMain from '~/components/pages/Main.vue' */

export default {

  layout: 'rm',

  components: {
  /*   PageTitle,
    PageControls,
    PageAvatar,
    PageMenu,
    PageRecommendedTracks,
    PageMain */
  },

  asyncData(context) { // load data to current page component

/*
    return axios.get(`http://dev.realmusic.ru/myapi/get_data.php?${ context.params.id }`)
    .then((res) => {
      return {
        page: res.data
      }
    })
    .catch(function (error) {
      return {
        page: { error: error }
      }
    });
*/

    let apiResult;

/*
    axios.get(`http://dev.realmusic.ru/myapi/get_data.php?${ context.params.id }`)
    .then((res) => {
      apiResult = {
        page: res.data
      }
    })
    .catch(function (error) {
      apiResult = {
        page: { 'error': error }
      }
    });
*/

/*     return axios.all([
      axios.get(`http://dev.realmusic.ru/myapi/get_data.php?${ context.params.id }`),
      axios.get(`http://dev.realmusic.ru/myapi/get_ft.php?${ context.params.id }`)
    ])
    .then(axios.spread((pageRes, ftRes) => {
      return {
        page: pageRes.data,
        ft: ftRes.data
      }
    })); */

  },

}

</script>

<style>

.page__title {font: 300 36px 'Roboto Condensed', Tahoma sans-serif;letter-spacing: -1px;color: #0054a6;display: inline-block;line-height: 36px;}
.page__smtitle {font: 400 24px 'Roboto Condensed', Tahoma sans-serif;letter-spacing: -1px;color: #0054a6;display: inline-block;line-height: 24px;}
.page__leftbox {width: 240px;}

</style>
