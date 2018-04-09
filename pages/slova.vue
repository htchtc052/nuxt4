<template>
<div id="mega-content_menu">
  <div id="mega-content">
    <link itemprop="url" href="https://www.realmusic.ru/slova/">
    <meta itemprop="description" content="RealMusic — новые стихи, слова и новые тексты песен, размещенные известными и неизвестными авторами абсолютно легально.">
    <div class="catalog-content level-box">
      <div class="catalog-content__left" id="catalog_add_top">
        <div id="tracks_all_pane" class="tracks_all_pane">
          <div class="catalog-subcombo-wrap level-box level-box_sb">
            <div class="level-box__item">
              <div class="catalog-subcombo">
                <a href="#" class="catalog-subcombo__link" id="tag_parent_link">
                  <span class="genre_clink">Теги</span>
                </a>
                <a href="#" class="catalog-subcombo__down" id="tag_arrow_down">
                  <span class="fa fa-angle-down"></span>
                </a>
                <a href="#" class="catalog-subcombo__up" id="tag_arrow_up" style="display:none;">
                  <span class="fa fa-angle-up"></span>
                </a>
                <div class="catalog-subcombo__dd" id="tt_tags" style="display:none;">
                  <div class="tag_list_subtag">
                    <a href="/slova/tags/экспериментальная поэзия/new/" class="h5tags catalog-subcombo__dd-item ">
                      <span>экспериментальная поэзия</span>
                    </a>
                  </div>


                </div>
              </div>
            </div>
            <div class="level-box__item">
              <a class="button button_default button_sm catalog-subcombo-wrap__reset reset_btn" href="/slova/" id="reset_btn_h" style="display:none;">
                <span class="fa fa-trash-o"></span> Сбросить фильтр
              </a>
            </div>
          </div>
          <div class="catalog-sort level-box">
            <label>Сортировать:</label>
            <a class="catalog-sort__item " href="/slova/popular/" id="link_crate">по рейтингу</a>
            <a class="catalog-sort__item catalog-sort__item_sel" href="/slova/new/" id="link_cnew">по дате загрузки</a>
          </div>
          <div id="list" class="ajax_objs_place">
            <ul class="rm-catalog rm-catalog_border">
              <li class="level-box track rm-catalog__item rm-catalog__item_indent_l">
                <div class="level-box__item">
                  <a href="/alex_privateer/">
                    <img class="track__img" src="https://realmusic.ru/img.php?src=/media/bandimg/7/166547.jpg&w=60&h=60" alt="" />
                  </a>
                </div>
                <div class="level-box__item level-box__item_size_full">
                  <div class="level-box level-box_sb">
                    <div class="level-box__item">
                      <a class="track__title" href="/alex_privateer/130814" title="Читать стих Отличие истинных аристократов от выскочек.">Отличие истинных аристократов от выскочек.</a>
                      <em class="track__artist">
                        <a class="track__artist-link" href="/alex_privateer/" title="Автор стихов и текстов Алекс Приватир">Алекс Приватир</a>&nbsp; </em>
                    </div>
                    <div class="level-box__item">
                      <span class="small-text small-text_size_s" title="Добавлено 03.04.2018 13:07">
                        <span class="fa fa-calendar"></span> 20 минут</span>
                    </div>
                  </div>
                  <div class="track__poetry-wrap">
                    <a class="small-text__link small-text_size_s small-text__link_un" href="/alex_privateer/130814" title="Читать стих Отличие истинных аристократов от выскочек.">Кормит щедро попугаев
                      <span class='track__poetry-sep fa fa-mail-forward'></span>Стаю миндалём; кота
                      <span class='track__poetry-sep fa fa-mail-forward'></span>До того избаловала,
                      <span class='track__poetry-sep fa fa-mail-forward'></span>Что мурчит: «</a>
                  </div>
                </div>
              </li>


            </ul>



          </div>
        </div>


      </div>



    </div>



  </div>

</div>

</template>

<script>
export default {
  layout: "rm",
  components: {}
};
</script>

<style>

.catalog-head {padding: 20px 0;}
.catalog-head__title {font: 300 50px 'Roboto Condensed', Tahoma sans-serif;letter-spacing:-2px;color: #0B56A6;line-height: 50px;}
.catalog-head__text {padding: 5px 0 0 0}

.catalog-content, .catalog-content * {box-sizing: border-box;}
.catalog-content__left {padding:0 25px 20px 0;width:100%;}
.catalog-content__left_rel {position: relative;}
.catalog-content__right {}
.catalog-content__right_fav-genres {width:300px}
.catalog-content__wrap {border:1px solid #D6D6D6;}
.catalog-content__pro {border:1px dotted #D6D6D6; padding:10px; font-size:13px; margin-bottom:20px;}
.catalog-content__calendar {width: 230px;}

.catalog-sort {padding:10px;background:#f9f9f9;border:1px solid #ddd; border-bottom:none;font-size:13px}
.catalog-sort .catalog-sort__item {margin: 0 10px;text-decoration: none;position: relative;display: inline-block;}
.catalog-sort .catalog-sort__item .fa {margin-left:3px}
.catalog-sort .catalog-sort__item:after {content: '';display: block;position: absolute;width: 100%;background: #EE8803;height: 3px;left: 0;bottom: -11px;z-index: 1000;visibility:hidden;}
.catalog-sort .catalog-sort__item.catalog-sort__sortitem_sel {text-decoration: none;}
.catalog-sort .catalog-sort__item.catalog-sort__item_sel:after, .catalog-sort .catalog-sort__item:hover:after {visibility: visible;}
.catalog-sort_video {border:1px solid #ddd;margin-bottom:20px;}

.catalog-combo-wrap {padding-bottom: 20px;}
.catalog-combo-wrap__btn.button {padding: 5px 17px;border-radius: 3px;color: #0054A6;}
.catalog-combo-wrap__btn.button:hover {background-color: #fafafa;}
.catalog-combo-wrap__btn.catalog-combo-wrap__btn_active, .catalog-combo-wrap__btn.catalog-combo-wrap__btn_active:hover {background-color: #ebf3d1;color: #449905;}

.catalog-combo {display:inline-block; position:relative;font-size: 13px;}
.catalog-combo:hover {background-color:#fafafa;}
.catalog-combo__link {display: inline-block;text-decoration: none;color:#0054A6;padding: 0 7px 0 7px;line-height: 29px;float: left;border: 1px solid #ccc;border-radius: 3px 0 0 3px;font-size: 13px;height: 30px;}
.catalog-combo__link_active {background-color: #ebf3d1;color: #449905;}
.catalog-combo__link_active-sub {background: repeating-linear-gradient(   -45deg,   #fff,   #fff 2px,   #ebf3d1 2px,   #ebf3d1 4px);color: #449905 !important;}
.catalog-combo__down, .catalog-combo__up {display:inline-block;border-left: 1px solid #EDEDED;height:30px;padding: 0 5px;border: 1px solid #ccc;border-radius: 0 3px 3px 0;border-left: none;line-height:30px;}
.catalog-combo__down_active, .catalog-combo__up_active {}

.catalog-combo:nth-child(1) .catalog-combo__dd {width: 134px;}
.catalog-combo:nth-child(2) .catalog-combo__dd {width: 260px;}
.catalog-combo:nth-child(3) .catalog-combo__dd {width: 220px;}
.catalog-combo:nth-child(4) .catalog-combo__dd {width: 200px;}
.catalog-combo:nth-child(5) .catalog-combo__dd {width: 450px;}
.catalog-combo:nth-child(5) .catalog-combo__dd .catalog-combo__dd-wrap { display:block; width:250px; float:left;}
.catalog-combo:nth-child(5) .catalog-combo__dd .catalog-combo__dd-wrap:nth-child(2n) {width:190px;}
.catalog-combo:nth-child(6) .catalog-combo__dd {width: 200px;}
.catalog-combo:nth-child(7) .catalog-combo__dd {width: 197px;}
.catalog-combo:last-child .subgenre_pane {left: auto;right:-1px;width: 260px;}

.catalog-combo__dd {position:absolute;border: 1px solid #cbcbcb;border-radius: 3px;width:200px;z-index:9000;background-color:#fff;margin-top:2px;left:-1px;line-height:normal;padding:10px 0;}
.catalog-combo__dd-item {padding: 5px 10px; display:inline-block;text-decoration: none;}
.catalog-combo__dd-item span {padding:1px 5px 3px;border-radius:3px}
.catalog-combo__dd-item:hover span {background-color: #ebf3d1;color: #449905;}
.catalog-combo__dd-item_current {border:none !important;}
.catalog-combo__dd-item_current span, .catalog-combo__dd-item_current:hover span {background-color: #ebf3d1 !important;color: #449905 !important;border: none !important;}


.catalog-subcombo-wrap {padding-bottom: 20px;}
.catalog-subcombo-wrap__reset, .catalog-subcombo-wrap__reset:hover, .catalog-subcombo-wrap__reset:focus {border: 2px solid #EE8803;padding: 2px 5px;background: transparent;color: #ee8803;font-weight: 600;}
.catalog-subcombo-wrap__item {padding-left:40px;font-size: 13px;}
.catalog-subcombo {display:inline-block; position:relative;font-size: 13px;}
.catalog-subcombo:hover {background-color:#fafafa;}
.catalog-subcombo__link {text-decoration:none;display: inline-block;color:#0054A6;padding: 0 9px 0 10px;line-height: 24px;float: left;border: 1px solid #ccc;border-radius: 3px 0 0 3px;font-size: 13px;height: 26px;}
.catalog-subcombo__link_active {background: repeating-linear-gradient(   -45deg,   #fff,   #fff 2px,   #ebf3d1 2px,   #ebf3d1 4px);color: #449905 !important;}
.catalog-subcombo__down, .catalog-subcombo__up {display:inline-block;height: 26px;padding:0 7px;line-height: 24px;border: 1px solid #ccc;border-radius: 0 3px 3px 0;border-left: none;}
.catalog-subcombo__dd {position:absolute;border: 1px solid #cbcbcb;border-radius: 3px;width: 680px;z-index:15000;background-color:#fff;margin-top:2px;left:-1px;line-height:normal;padding:10px 0;}
.catalog-subcombo__dd-item {padding: 3px 5px 4px;display:block;text-decoration: none;float:left;}
.catalog-subcombo__dd-item span {padding: 1px 5px 3px;border-radius:3px}
.catalog-subcombo__dd-item:hover span {background-color: #ebf3d1;color: #449905;}
.catalog-subcombo__dd-item_current {border: none !important;}
.catalog-subcombo__dd-item_current span {background-color: #ebf3d1;color: #449905;}

.catalog-search__rel {position: relative}
.catalog-search__title {padding-bottom:20px;;font:24px 'Roboto Condensed', Tahoma sans-serif;color:#0B56A6;}
.catalog-search__link {padding-bottom: 50px;padding-top: 10px;}



.track, .track * {box-sizing: border-box;}
.track__title {font-weight: 600;display: inline-block;color: #0054a6;-ms-word-break: break-all;word-break: break-word;word-wrap: break-word;line-height: 16px;}
.track__title_banner {white-space: nowrap;width: 260px;text-overflow: ellipsis;overflow: hidden;height: 17px;}
.track__artist {font-size: 13px;display: block;padding-bottom: 1px;padding-top: 2px;word-break: break-all;}
.track__artist-link {text-decoration: none}
.track__infbox-item {cursor:help;}
.track__infbox-item:after {content:"/";color:#c7c7c7;margin:0 3px;}
.track__infbox-item:last-of-type:after {display:none;}
.track__toolbox {text-align: right;transition: all 0.5s ease;-moz-transition: all 0.5s ease;-webkit-transition: all 0.5s ease;text-decoration:none;white-space: nowrap;}
.track__toolbox_cat {width: 180px;}
.track__toolbox-item {padding: 0 1px;font-size:20px;display: inline-block;color: #949494;opacity: 0.6;transition: all 0.5s ease;-moz-transition: all 0.5s ease;-webkit-transition: all 0.5s ease;text-decoration:none;}
.track__toolbox-item:hover {color:#EE8803;opacity:1}
.track__toolbox-item_disabled, .track__toolbox-item_disabled:hover {color: #D6D6D6;opacity:0.5}
.track__img {border-radius: 3px;box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);}
.track__noimg {display: block;border:1px solid #d6d6d6;width: 60px;height: 60px;background-color:#f9f9f9;position:relative;border-radius: 3px;}
.track__noimg:after  {color: #e4e4e4;font: normal normal normal 14px/1 FontAwesome;content: "\f030";display:block;position: absolute;top: calc(50% - 15px);left: calc(50% - 15px);text-indent: 0;font-size: 28px;text-shadow: 1px 1px #fff;}
.track__noimg_event {width:132px;height:92px;}
.track__noimg_artist {width:98px;height:98px;}
.track__noimg_blog {width:40px;height:40px;}
.track__noimg_menu {width:38px;height:38px;}
.track__noimg_blog:after {font-size: 16px;top: 11px;left: 10px;}
.track__noimg_menu:after {font-size: 14px;top: 11px;left: 11px;}
.track__rating-box {display:inline-block;position: relative;}
.track__rating-box-item .fa {margin-right:3px;font-size:22px;width: 20px;}
.track__rating-box-item {padding: 0 1px;font-size:20px;display: inline-block;}
.track__rating-box-item:last-child {margin-left: 8px;margin-right: 5px;}
.track__rating-box-item:hover {opacity:1;color:#EE8803;}
.track__rating-box-item_like {color: #0054a6;opacity:1;}
.track__rating-box-item_dislike {color:#4a4a4a;opacity:1;}

.track__control-box {font-size:13px;background-color:#f9f9f9;margin: 10px 0 0 0; padding:5px;border-radius:3px;}
.track__control-item {display:inline-block;color:#949494;margin: 0 5px;}
.track__control-item .fa {padding-right:3px}
.track__control-item:hover {color:#EE8803}
.track__poetry-wrap {overflow:hidden;white-space:nowrap}
.track__poetry-wrap:after {content:'...';color:#ccc}
.track__poetry-sep {margin-right:5px;color:#ccc;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);transform:rotate(180deg);}
.track__control-box_event {position: absolute;margin: 0;left: 0;background-color: rgba(249, 249, 249, 0.9);width: 100%;top: 0px;border-radius: 0;z-index: 100;}

.track_hidden {background: repeating-linear-gradient( -45deg, #fff, #fff 2px, #efefef 3px, #f9f9f9 4px);margin: -7px;padding: 7px;border-bottom: 1px solid #EAEAEA;}
.track_hidden .player-box__play, .track_hidden .player-box__pause, .track_hidden .player-box__play:hover {border-color:#ddd;background:transparent;}
.track_hidden .player-box__play-btn, .track_hidden .player-box__pause-btn {color: #ddd;background: transparent;}
.track_hidden .track__title {color: #949494}
.track_hidden .track__control-box {background:transparent;}
.track_active {background-color:rgba(253, 243, 229, 0.35);}

.track__desc {font-size: 13px;padding: 5px 0;line-height: 16px;font-style: italic;}
.track__desc__link {text-decoration:none;color: #4A4A4A;}
.track__mov-box {display:inline-block;width: 330px;height:200px;background: #000;position: relative;transition: all 1s ease;-moz-transition: all 1s ease;-webkit-transition: all 1s ease;border-radius: 5px;background-repeat: no-repeat;background-position: 50% 50%;background-size: cover;}
.track__mov-box:before {transition: all 0.5s ease;-moz-transition: all 0.5s ease;-webkit-transition: all 0.5s ease;content:'';position:absolute;display:block;height: 80px;width: 330px;z-index: 1;border-radius: 5px 5px 0 0;top: 0;background: -moz-linear-gradient(top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,1)), color-stop(100%,rgba(0,0,0,0)));background: -webkit-linear-gradient(top, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%);background: -o-linear-gradient(top, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%);background: -ms-linear-gradient(top, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%);background: linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#00000000',GradientType=0 );}
.track__mov-box:after {transition: all 0.5s ease;-moz-transition: all 0.5s ease;-webkit-transition: all 0.5s ease;content:'';position:absolute;display:block;height: 80px;width: 330px;border-radius: 0 0 5px 5px;bottom: 0;background: -moz-linear-gradient(top, rgba(0,0,0,0.01) 0%, rgba(0,0,0,1) 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.01)), color-stop(100%,rgba(0,0,0,1)));background: -webkit-linear-gradient(top, rgba(0,0,0,0.01) 0%,rgba(0,0,0,1) 100%);background: -o-linear-gradient(top, rgba(0,0,0,0.01) 0%,rgba(0,0,0,1) 100%);background: -ms-linear-gradient(top, rgba(0,0,0,0.01) 0%,rgba(0,0,0,1) 100%);background: linear-gradient(to bottom, rgba(0,0,0,0.01) 0%,rgba(0,0,0,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#03000000', endColorstr='#000000',GradientType=0 );}
.track__mov-cover {position: absolute;z-index: 0;left: 0;top: 0;border-radius: 5px;}
.track__title_mov {color:#fff;padding:130px 0 0 15px;position: relative;z-index: 1;text-decoration: underline;}
.track__mov-box:hover .track__title_mov {text-decoration: none;}
.track__artist_mov {position: absolute;top:150px;left:15px;}
.track__artist-link_mov {color: #fff;white-space: nowrap;display: inline-block;overflow: hidden;text-overflow: ellipsis;width: 300px;}
.track__infbox-item-wrap_mov {left:15px;position: absolute;top: 170px;}
.track__mov-box:hover:before, .track__mov-box:after {height:90px;}
.track__title_mov:before {transition: all 0.5s ease;-moz-transition: all 0.5s ease;-webkit-transition: all 0.5s ease;content: "\f008";font: normal normal normal 14px/1 FontAwesome;color: #fff;position: absolute;z-index: 1;font-size:24px;top: 15px;left: 285px;text-shadow: 0 0 3px #000;opacity: 0.5;}
.track__mov-box:hover .track__title_mov:before {opacity:1}
.track__country-banner {height: 17px; padding-bottom: 5px;}
.track__desc-banner {padding: 6px 0 10px;height: 64px;overflow: hidden;line-height: 16px;word-break: break-all;word-wrap: break-word;width: 95%;}



.rm-catalog, .rm-catalog * {box-sizing: border-box;}
.rm-catalog_border {border: 1px solid #D6D6D6;}
.rm-catalog__item {border-bottom: 1px dashed #EAEAEA;list-style: none;}
.rm-catalog__item_nb {border-bottom:none;}
.rm-catalog__item_mov {position: relative;margin: 0 20px 20px 0;}
.rm-catalog__item_mov:nth-child(2n) {margin-right: 0}
.rm-catalog__item_indent_l {padding: 12px 15px;}
.rm-catalog__item_indent_s {padding: 7px; margin: 0 -7px;}
.rm-catalog__item_indent_recom {padding: 7px;}
.rm-catalog__item_indent_promo {padding: 5px 15px;}
.rm-catalog__item_indent_pro {padding: 10px 0;}
.rm-catalog__item_indent-afisha {padding-top: 10px;}
.rm-catalog__item:last-child {border-bottom: none;}
.rm-catalog__item_tile {border-bottom: none;width: 218px;margin: 0 10px 10px 0;border: 1px solid #D6D6D6;position: relative;}
.rm-catalog__item_tile_t:nth-child(3n+3) {margin-right:0}
.rm-catalog__item_tile:last-child {border: 1px solid #D6D6D6;}
.rm-catalog__title-wrap {width: 100%; padding: 40px 0 20px;list-style: none;}
.rm-catalog__title-wrap:first-of-type {padding-top: 0;}
.rm-catalog__title {font: 400 20px 'Roboto Condensed', Tahoma sans-serif; color: #EE8803;clear: both;}
.rm-catalog__news-cover {height:138px;background-repeat:no-repeat;background-position: 50% 50%;-webkit-background-size: contain;-moz-background-size: contain;-o-background-size: contain;background-size: contain;display:block;background-color:#f9f9f9;position:relative}
.rm-catalog__news-nocover:after  {color: #e4e4e4;font: normal normal normal 14px/1 FontAwesome;content: "\f030";display:block;position: absolute;top: calc(50% - 16px);left: calc(50% - 16px);text-indent: 0;font-size: 32px;text-shadow: 1px 1px #fff;z-index:0;}
.rm-catalog__news-content {padding: 10px 15px 15px;}
.rm-catalog__news-title {line-height: 16px;display: inline-block;padding-bottom: 10px;min-height: 58px;}
.rm-catalog__news-title_afisha {min-height:32px;word-break: break-word;padding-bottom: 0;}
.rm-catalog__item_banner {position:relative;}
.rm-catalog__item_banner:first-of-type {border-right: 1px solid #EAEAEA;border-bottom: none;}
.rm-catalog__get-pro {color: #e6e3e3;position: absolute;font-size: 16px;top: 13px;right: 15px;}
.rm-catalog__get-pro:hover {color: #EE8803;}
.rm-catalog__afisha-place {white-space: nowrap;}
.rm-catalog__afisha-datebox {padding-top: 10px;}
.rm-catalog__blog-cont {padding-bottom: 10px}
.rm-catalog__news-content + .sharen_catalog_pane {top:200px;right: -33px;}
.rm-catalog__item-getpro {text-align: center;}
.rm-catalog__item-getpro:nth-child(3) {width: 82px;}
.rm-catalog__item-getpro:nth-child(5) {width: 53px;}
.rm-catalog__pro-price {text-align: center;}
.rm-catalog__pro-price:nth-child(1) {width: 62px;}
.rm-catalog__pro-price:nth-child(2) {width: 70px;}
.rm-catalog__pro-price:nth-child(3) {width: 74px;}
.rm-catalog__pro-price:nth-child(4) {width: 54px;}
.rm-catalog__pro-pdis {color: #EE8803;border-radius: 5px;font-size: 9px;display: inline;padding: 0 2px;position: relative;top: -2px;border: 1px solid #EE8803;font-weight: 600;}
.rm-catalog__clear-all {text-align:center;margin-bottom:50px}
.rm-catalog__clear-all p {margin:50px 0 25px}
.rm-catalog + .rm-catalog {margin-top: 20px}
.rm-catalog__search-track-title {height: 62px;}
.rm-catalog__search-poetry-wrap {height: 44px;}
.rm-catalog__search-video-desc {height: 43px;}
.rm-catalog__search-img.track__noimg {background-size: contain;background-repeat: no-repeat;background-position: 50% 50%;}
.rm-catalog__search-img.track__noimg:after {display:none;}

.level-box {display: flex;display: -ms-flexbox;}
.level-box__item {margin-right: 10px;}
.level-box__item:last-child, .level-box__item_second {margin-right: 0px;}
.level-box__item_size_tenth {width: 10%}
.level-box__item_size_quarter {width: 25%}
.level-box__item_size_third {width: 33%}
.level-box__item_size_half {width: 50%}
.level-box__item_size_tt {width: 66%}
.level-box__item_size_tq {width: 75%}
.level-box__item_size_full {width:100%}
.level-box__item_align_center, .level-box__item_align_center input {text-align: center;}
.level-box_c {justify-content: center;-ms-flex-pack: center;}
.level-box_r {justify-content: flex-end;-ms-flex-pack:flex-end;}
.level-box_sb {justify-content: space-between;-ms-flex-pack: justify;}
.level-box_vc {align-items: center}
.level-box_vb {align-items: flex-end;}
.level-box_fww {flex-wrap: wrap;}
.level-box_fix-height {height:34px;}
.level-box__big-image {border: 1px solid #dedede;padding: 5px;border-radius: 5px;}
.level-box_comment-btn {padding-bottom:20px;}

* {margin: 0;padding: 0;}
body {font-size:14px;font-family: "Open Sans", Tahoma, Arial, Geneva, sans-serif;background:url(/i/bg-blue-small.png) repeat-x 0 0 #b3dcf8 fixed;color:#4A4A4A;}

</style>
