<template>
  <div class="btn_wrap">
    <span class="btn-social-text flex justify-center items-center"
      ><p>Sígueme</p>
    </span>
    <div class="container">
      <a
        target="_blank"
        href="https://www.instagram.com/martahinojosa.salud/?hl=es"
        ><i class="icon-social fab fa-instagram"></i
      ></a>
      <a
        target="_blank"
        href="https://www.facebook.com/Entrenamiento-y-salud-mujer-119605846573705/"
        ><i class="icon-social fab fa-facebook"></i
      ></a>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.icon-social {
  opacity: 0;
  font-size: $tittle24;
  color: $primary;
  will-change: transform;
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: all 0.1s ease;
  transition: all 0.1s ease;
}

.btn_wrap {
  margin-top: 20px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  width: 200px;
  height: 36px;
  background-color: $white;
  border-radius: 5px;
  padding-top: 4px;
  will-change: transform;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.btn-social-text {
  position: absolute;
  z-index: 99;
  width: 240px;
  height: 70px;
  padding-bottom: 4px;
  border-radius: 80px;
  font-family: "GlacialB";
  font-size: $text20;
  text-align: center;
  line-height: 100%;
  letter-spacing: 2px;
  color: $white;
  background-color: $primary;
  -webkit-transition: all 1s ease;
  transition: all 1s ease;
}

.btn-social-text > p {
  width: 130px;
  min-height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 2px;
  margin: 0px;
}

.container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 240px;
  height: 64px;
  border-radius: 80px;
}

.container i:nth-of-type(1) {
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
  font-size: 30px !important;
}

.container i:nth-of-type(2) {
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
  font-size: 30px !important;
}

.btn_wrap:hover span {
  -webkit-transition-delay: 0.25s;
  transition-delay: 0.25s;
  -webkit-transform: translateX(-280px);
  transform: translateX(-280px);
}

.btn_wrap:hover .icon-social {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
  font-size: $text18;
}

@media (max-width: 599px) {
  .btn_wrap {
    width: 150px;
  }

  .btn-social-text {
    font-size: $text18;
  }
}

@media (orientation: landscape) {
  .btn_wrap {
    margin-top: 0px;
  }
}
</style>
