<template>
  <div class="d-flex px-3 justify-content-between align-items-center">
    <div class="rm-head__search pl-1">
      <form action="" class="search position-relative">
       <input type="text" class="form-control search__input py-1 px-2 pr-5 t-14 rounded-0" placeholder="Поиск по сайту" />
       <span class="fas fa-search search__button"></span>
      </form>   
    </div>
    <nav class="rm-head__menu d-flex justify-content-end align-items-stretch pb-1">
      <a href="/music/">музыка<span>974 434</span></a>
      <a href="/slova/">стихи<span>90 828</span></a>
      <a href="/artists/">музыканты<span>102 313</span></a>
      <a href="/authors/">авторы<span>8 398</span></a>
      <a href="/video/">видео<span>70 963</span></a>
      <a href="/afisha/">афиша</a>
      <a href="/news/">новости</a>
      <a href="/radio/">радио</a>
    </nav>
  </div>
</template>

<style>

.rm-head__menu > a {text-align: center;text-decoration:none;text-transform: uppercase; font:700 16px 'Open Sans Condensed', sans-serif;position: relative;padding: 0.6rem 0 0.45rem;margin: 0 0.75rem}
.rm-head__menu > a > span {color: #949494;display: block;font:300 11px 'Open Sans', sans-serif;}
.rm-head__menu > a:after {content:'';display:block; position:absolute; width:100%;background: #EE8803;height: 3px;left: 0;bottom: -4px;visibility:hidden}
.rm-head__menu > a:hover:after {visibility:visible;}

.search__input {box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);width: 250px}
.search__button {cursor:pointer;color:#b0b0b0;padding: 8px;position: absolute;top:0;right:0;margin-right: 5px;}

</style>
