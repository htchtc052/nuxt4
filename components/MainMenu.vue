<template>
  <div class="d-flex px-3 justify-content-between align-items-center">
    <div class="rm-head__search pl-1">
      <form action="" class="search position-relative">
       <input type="text" class="form-control search__input py-1 px-2 pr-5 t-14 rounded-0" placeholder="Поиск по сайту" />
       <span class="fas fa-search search__button"></span>
      </form>   
    </div>
    <nav class="rm-head__menu d-flex justify-content-end align-items-stretch pb-1">
          <nuxt-link :to="$i18n.path('music')">{{ $t('music_title') }}<span>1 002 000</span></nuxt-link>
          <nuxt-link :to="$i18n.path('lyrics')">{{ $t('lyrics_title') }}<span>93 800</span></nuxt-link>


    </nav>
  </div>
</template>