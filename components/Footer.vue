<template>
  <footer class="footer">
    <div class="p-4 pt-5">
      <div class="row">
        <div class="col-3">
            <strong>О проекте</strong>
            <ul class="footer__list list-unstyled">
              <li><a href="/about">О нас</a></li>
              <li><a href="/copyrights">Авторские права</a></li>
              <li><a href="/agree">Пользовательское соглашение</a></li>
              <li><a href="/terms">Правила защиты информации<br>о пользователях</a></li>
              <li><a href="/faq">Помощь</a></li>
              <li><a href="/feed">Обратная связь</a></li>
            </ul>
        </div>
        <div class="col-3">
            <strong>Возможности</strong>
            <ul class="footer__list list-unstyled">
              <li><a href="/pro">PRO-аккаунт</a></li>
              <li><a href="/promo">Промоблок RealMusic</a></li>
              <li><a href="/creativecommons">Лицензии Creative Commons</a></li>
            </ul>
        </div>
        <div class="col-3">
            <strong>Сообщество</strong>
            <ul class="footer__list list-unstyled">
              <li><a href="#">Форум</a></li>
              <li><a href="/blogs">Блоги</a></li>
            </ul>
        </div>
        <div class="col-3">
          <div class="footer__socbox text-center">
              <strong>В социальных сетях</strong>
              <div class="d-flex justify-content-center p-3">
                <a class="footer__soclink" title="Официальная группа RealMusic Вконтакте" target="_blank" href="https://vk.com/realmusicru" rel="nofollow">
                  <span class="fab fa-vk"></span>
                </a>
                <a class="footer__soclink" title="Официальная группа RealMusic в Facebook" target="_blank" href="https://www.facebook.com/RealMusicRu/" rel="nofollow">
                  <span class="fab fa-facebook-f"></span>
                </a>
                <a class="footer__soclink" title="Официальная группа RealMusic в Twitter" target="_blank" href="https://twitter.com/_RealMusic_" rel="nofollow">
                  <span class="fab fa-twitter"></span>
                </a>
                <a class="footer__soclink" target="_blank" title="Официальная группа RealMusic в Живом Журнале" href="https://realmusic-lj.livejournal.com" rel="nofollow">
                  <span class="fas fa-pencil-alt"></span>
                </a>
              </div>
              <a target="_blank" href="https://top100.rambler.ru/navi/235904/"><img src="~assets/i/banner-88x31-rambler-gray2.gif" alt="Rambler's Top100" width="88" height="31"></a>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-end mt-3">
        <div>
          <img src="~assets/i/logo_footer.gif">
          <div class="footer__copyright t-11">2000-2018 © Компания «ИКС-Медиа»</div>
        </div>
        <div class="footer__servinfo t-11">Мы арендуем сервер в дата-центре <a href="https://mnogobyte.ru/" target="_blank">МногоБайт</a></div>
      </div>
      
    </div>
  </footer>
</template>

<style>
.footer {background:  url("~assets/i/footer_bg.gif") no-repeat 200px 0 #d5e9fc;color:#637A8F;margin-bottom: 70px; clear: left;}
.footer a {color:#637A8F;}
.footer__list li {font-size:12px;padding-top:5px;}
.footer__list li a {color:#6a9ac2}
.footer__socbox a {opacity:0.75;color: #fff}
.footer__socbox a:hover { opacity:1;}
.footer__soclink {width:40px;height:40px;margin: 0 2px;color:#fff;text-align:center;display:inline-block}
.footer__soclink:hover {color:#fff;}
.footer__soclink .fab, .footer__soclink .fas {width:40px;height:40px;line-height:40px;border-radius: 100%;box-shadow: inset 2px 2px 0px rgba(0, 0, 0, 0.1);}
.footer__soclink .fa-facebook-f {background:#38569a;font-size: 18px;}
.footer__soclink .fa-vk {background:#41658b;font-size:18px;}
.footer__soclink .fa-twitter {background:#55acee;font-size:16px;}
.footer__soclink .fa-pencil-alt {background: #6a9ac2;font-size:16px;}
.player.d-none + .footer {margin-bottom: 0}
</style>
