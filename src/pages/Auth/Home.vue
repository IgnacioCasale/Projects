<template>
  <div id="section1">
    <div class="row">
      <div class="col-12 flex justify-center">
        <a @click="scrollToElement('section2')" class="down arrow">
          <q-icon name="expand_more" />
        </a>
      </div>
    </div>
    <div class="row flex justify-center">
      <div class="col-8 flex justify-center">
        <a @click="scrollToElement('section1')" class="down arrow2up">
          <q-icon name="expand_less"
        /></a>
        <a @click="scrollToElement('section3')" class="down arrow2down">
          <q-icon name="expand_more"
        /></a>
      </div>
    </div>
    <div class="row flex justify-center">
      <div class="col-8 flex justify-center">
        <a @click="scrollToElement('section2')" class="down arrow3">
          <q-icon name="expand_less"
        /></a>
      </div>
    </div>

    <div class="section1">
      <div class="row">
        <div class="col">
          <div @mouseover="showInfo()" @click="showInfo()">
            <img
              class="homeImage"
              src="../../assets/homebg.jpg"
              alt="portada"
            />
          </div>
        </div>
      </div>

      <div class="row flex justify-center">
        <div class="col-11 col-md-6 title-bg">
          <div class="titleDivScroll">
            <div class="col-4 q-mb-md">
              <h1 id="status">ENTRENAMIENTO Y SALUD MUJER</h1>
            </div>
            <div class="col-4 q-ma-none">
              <h2 :class="show ? 'infoText' : 'titleText'">
                {{ textHomeInfo }}
                <span
                  :style="show ? 'display: none' : 'display: block'"
                  class="titleText"
                >
                  <br />
                  Consigue tu mejor versión
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div class="row flex justify-center divHomeData">
        <div class="flex justify-center">
          <div
            @click="showInfo('a')"
            @mouseover="showInfo('a')"
            class="col-1 home-data"
            :class="{ border: borderA }"
          >
            <p class="p-data">
              100% online <q-icon class="p-icon" name="info_outline" />
            </p>
          </div>
          <div
            @click="showInfo('b')"
            @mouseover="showInfo('b')"
            class="col-1 home-data"
            :class="{ border: borderB }"
          >
            <p class="p-data">
              Clases en directo y grabadas
              <q-icon class="p-icon" name="info_outline" />
            </p>
          </div>
          <div
            @click="showInfo('c')"
            @mouseover="showInfo('c')"
            class="col-1 home-data"
            :class="{ border: borderC }"
          >
            <p class="p-data">
              Comunidad activa <q-icon class="p-icon" name="info_outline" />
            </p>
          </div>
        </div>
      </div>

      <HealthButton />
    </div>

    <div id="section2" class="section2">
      <div class="row flex justify-center">
        <div class="col-8 flex justify-center">
          <h3>Sobre mí</h3>
        </div>
      </div>

      <div class="row flex justify-center">
        <div class="col-12 flex justify-center items-center">
          <div class="profileDiv">
            <img
              class="profileImg"
              src="../../assets/profile.jpeg"
              alt="profile"
            />
          </div>
        </div>

        <div class="col-12 flex justify-center">
          <FollowButton />
        </div>

        <div class="col-12 col-md-10 flex justify-start">
          <p class="about">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl
            eros, pellentesque non euismod ut, rhoncus sed quam. Praesent
            convallis a arcu sed varius. Aenean id sapien tellus. Nam suscipit
            neque non tellus faucibus sollicitudin. Quisque quis felis quis
            tellus convallis ultricies. Morbi maximus auctor quam, ac elementum
            turpis suscipit nec. <br /><br />

            Curabitur facilisis porta scelerisque. Nulla facilisi. Nullam porta,
            massa a scelerisque posuere, leo odio commodo elit, ut varius neque
            lacus in leo. Sed molestie dapibus magna, nec pulvinar elit
            fermentum nec. In iaculis elit dui, et posuere lorem suscipit nec.
            Pellentesque rhoncus sodales lacus, posuere ullamcorper ipsum
            consectetur quis. Sed et nunc tempus, mattis enim ac, convallis leo.
          </p>
        </div>
      </div>
    </div>

    <div id="section3" class="section3">
      <div class="row">
        <div class="col">
          <div>
            <img class="imageSection3" alt="homeEnd" />
          </div>
        </div>
      </div>

      <div class="row flex justify-center">
        <div class="col-8 flex justify-center">
          <h3>Clases</h3>
        </div>
      </div>

      <div class="row flex justify-center">
        <div class="col-12 col-md-8 flex justify-end">
          <p class="classInfo">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a
            elementum elit, vel euismod justo. Duis nec mi sed dui ultricies
            faucibus. Pellentesque vulputate quis urna at semper. Integer
            tincidunt massa justo, quis convallis odio iaculis ut. Praesent
            augue odio, feugiat elementum tristique sed, ornare eu justo.
            Suspendisse ac justo sodales, placerat lacus at, porttitor risus.
            <br /><br />
            <b>Lorem ipsum:</b> Duis nec mi sed dui ultricies faucibus.
            Pellentesque vulputate quis urna at semper. Integer tincidunt massa
            justo, quis convallis odio iaculis ut. <br /><br />

            <b>Lorem ipsum:</b> Duis nec mi sed dui ultricies faucibus.
            Pellentesque vulputate quis urna at semper. Integer tincidunt massa
            justo, quis convallis odio iaculis ut. <br /><br />
            <b>Lorem ipsum:</b> Duis nec mi sed dui ultricies faucibus.
            Pellentesque vulputate quis urna at semper. Integer tincidunt massa
            justo, quis convallis odio iaculis ut. <br /><br />
            <b>Lorem ipsum:</b> Duis nec mi sed dui ultricies faucibus.
            Pellentesque vulputate quis urna at semper. Integer tincidunt massa
            justo, quis convallis odio iaculis ut. <br /><br />
            <b>Lorem ipsum:</b> Duis nec mi sed dui ultricies faucibus.
            Pellentesque vulputate quis urna at semper. Integer tincidunt massa
            justo, quis convallis odio iaculis ut.
          </p>
        </div>
      </div>
      <HealthButton />
    </div>

    <footer class="flex justify-center">
      <p>
        Copyright 2022. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </footer>
  </div>
</template>

<script>
import HealthButton from "components/HealthButton.vue";
import FollowButton from "components/FollowButton.vue";

export default {
  components: {
    HealthButton,
    FollowButton,
  },

  data() {
    return {
      show: false, //to control whether more information is displayed
      borderA: false,
      borderB: false,
      borderC: false,
      textHomeInfo: "Entrena cada semana con mi ayuda",
    };
  },

  methods: {
    //scroll to a element
    scrollToElement(id) {
      var obj = document.getElementById(id);

      if (id === "section1") {
        window.scrollTo({
          behavior: "smooth",
          top: 0,
        });
      } else {
        obj.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    },

    //show the aditionaal info
    showInfo(homeInfo) {
      this.show = true;

      switch (homeInfo) {
        case "a":
          this.borderA = true;
          this.borderB = false;
          this.borderC = false;
          this.textHomeInfo =
            "¡La falta de tiempo ya no es una excusa! Clases online completas para que puedas realizarlas donde sea y desde cualquier dispositivo. ¡Ya hay un montón de alumnas! que cada día están más contentas y encontrándose genial después de los entrenamientos. ¿A que esperas?";
          break;
        case "b":
          this.borderA = false;
          this.borderB = true;
          this.borderC = false;
          this.textHomeInfo =
            "Entrena en directo desde casa, acompañada de tu entrenadora y compañeras. Mantente activa con las clases grabadas semanalmente, adaptadas a tí. ¡Gana en salud y calidad de vida! Vive sin dolor.";
          break;
        case "c":
          this.borderA = false;
          this.borderB = false;
          this.borderC = true;
          this.textHomeInfo =
            "¿Te gustaría formar parte de algo y tener compis en tu misma situación o momento vital? Comparte opiniones, sensaciones y dudas. ¡Juntas contra el mundo!";
          break;
        default:
          this.borderA = false;
          this.borderB = false;
          this.borderC = false;
          this.textHomeInfo = "Entrena cada semana con mi ayuda";
          this.show = false;

          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// general ---------------------------------------------
.down {
  z-index: 2;
  height: 40px;
  width: 40px;
  color: $white;
  background-color: rgba($color: $primary, $alpha: 0.5);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: -20px 5px 0px 5px;
  transition: all ease 0.2s;
  overflow: hidden;
}

.down:hover {
  height: 43px;
  width: 140px;
}

.down:after {
  position: absolute;
  bottom: 7px;
  left: 10;
  font-size: 20px;
  font-weight: 700;
}

.down > .q-icon {
  margin-bottom: 100%;
  font-size: 40px;
}

.arrow {
  position: absolute;
  top: 90vh;
}

.arrow:after {
  content: "VER MÁS";
}

.arrow2up {
  position: absolute;
  top: 199vh;
  right: 52%;
}

.arrow2up:after {
  content: "SUBIR";
}

.arrow2down {
  position: absolute;
  top: 199vh;
  left: 52%;
}

.arrow2down:after {
  content: "BAJAR";
}

.arrow3 {
  position: absolute;
  top: 299vh;
}

.arrow3:after {
  content: "SUBIR";
}

.down:hover {
  cursor: pointer;
}
// END general ------------------------------------------

// Section 1 ---------------------------------
.section1 {
  height: 100vh;
}

.divHomeData {
  max-height: 55vw;
  overflow-y: scroll;
  margin-top: 10px;
  margin-bottom: 25px;
}

.home-data {
  background-color: rgba($color: $dark, $alpha: 0.5);
  position: relative;
  padding: 10px;
  margin: 20px;
  margin-top: 1vh;
  margin-bottom: 10vh;
  border-radius: 50px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  border: 2px solid rgba($color: #000000, $alpha: 0);
}

.border {
  border: 2px solid $white;
}

.p-data {
  text-align: center;
  color: $white;
  font-size: $text18;
  margin: 0px;
  font-weight: 600;
  min-width: 160px;
  max-width: 70vw;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.p-icon {
  margin-bottom: 2px;
  margin-left: 2px;
  font-size: $text20;
}

.title-bg {
  background-color: rgba($color: $dark, $alpha: 0.5);
  position: relative;
  padding: 15px;
  margin-top: 5vh;
  margin-bottom: 0vh;
  min-height: 280px;
  border-radius: 50px;
  backdrop-filter: blur(10px);

  .titleDivScroll {
    overflow-y: scroll;
    padding: 10px;
    height: 90%;
  }
}

h1 {
  position: relative;
  font-family: "Bebas Neue";
  font-size: 50px;
  text-align: center;
  color: $primary;
  font-weight: 600;
  margin: 0px;
  margin-top: 15px;
  margin-bottom: 30px;
  letter-spacing: 3px;
  line-height: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-shadow: 1px 0 #fff, -1px 0 #fff, 0 1px #fff, 0 -1px #fff, 1px 1px #fff,
    -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;
}

h2 {
  position: relative;
  font-family: "GlacialR";
  text-align: center;
  color: $white;
  margin: 0px;
  margin-bottom: 10px;
}

.titleText {
  font-size: $tittle32;
  transition: all 0.5s;
  transition-delay: 0.1s;
  line-height: 100%;
}

.infoText {
  font-size: $text20;
  margin-bottom: 0px;
  line-height: 100%;
  text-align: left;
}

h3 {
  font-family: "GlacialR";
  font-size: $tittle32;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 100px;
}

.homeImage {
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  filter: blur(8px);
  -webkit-filter: blur(8px);
  z-index: -10;
}
//END section1 ----------------------------------------------------

//About section -------------------------------------------

.section2 {
  height: 100vh;
}

.about {
  margin-top: 50px;
  font-size: $text20;
  line-height: 100%;
  height: 30vh;
  margin: 40px;
}

.profileImg {
  width: 100%;
  object-fit: cover;
  height: 100%;
}

.profileDiv {
  display: inline-block;
  position: relative;
  width: 20vh;
  height: 20vh;
  overflow: hidden;
  border-radius: 10%;
  box-shadow: 0px 0px 40px $primary;
}
//END about section -------------------------------

// Classes section --------------------------------------
.section3 {
  height: 100vh;
}

.imageSection3 {
  content: url("../../assets/home3.svg");
  object-fit: cover;
  position: absolute;
  z-index: -1;
  width: 100%;
  max-width: 100%;
  height: 100vh;
}

.classInfo {
  font-size: $text18;
  margin: 20px;
  margin-bottom: 50px;
  line-height: 100%;
}

footer {
  background-color: $dark;
  height: 70px;
  color: $secondary;
  padding: 10px;
}
// END Classes section --------------------------------------

//breakpoints-------------------------------

@media (max-width: 1439px) {
  .title-bg {
    padding-bottom: 15px;
    min-height: 0px;
    height: 160px;
  }

  h1 {
    font-size: 30px;
    bottom: 20px;
    margin-bottom: 20px;
  }

  h2 {
    height: 20px;
    bottom: 16px;
  }

  .titleText {
    font-size: $text18;
  }

  .infoText {
    margin-top: 20px;
    font-size: $text18;
  }

  .home-data {
    margin-top: 1vh;
    margin-bottom: 0.5vh;
    font-size: $text16;
  }

  .p-data {
    font-size: $small14;
    min-width: 210px;
  }

  .profileDiv {
    margin-bottom: 50px;
  }

  .about {
    overflow: auto;
    display: inline-block;
    font-size: $text20;
    margin-left: 40px;
  }
  .classInfo {
    font-size: $tittle24;
    margin-top: 0px;
    max-height: 50vh;
    overflow: auto;
    display: inline-block;
  }
}

@media (max-width: 599px) {
  h1 {
    font-size: 20px;
    bottom: 20px;
  }

  h2 {
    height: 25px;
    bottom: 16px;
  }

  .titleText {
    font-size: $text16;
  }

  .infoText {
    font-size: $text16;
    margin-top: 10px;
  }

  h3 {
    font-size: $text20;
    margin-top: 25px;
  }

  .home-data {
    margin-top: 1vh;
    margin-bottom: 0.5vh;
  }

  .p-data {
    font-size: $small14;
    min-width: 210px;
  }

  .profileImg {
    width: 100%;
    object-fit: cover;
  }

  .profileDiv {
    display: inline-block;
    width: 130px;
    height: 130px;
    margin-bottom: 0px;
  }

  .about {
    margin: 20px;
    margin-top: 40px;
    margin-bottom: 0px;
    overflow: auto;
    display: inline-block;
    font-size: $text16;
  }

  .classInfo {
    font-size: $text16;
    margin-bottom: 25px;
    margin-top: 0px;
    overflow: auto;
    max-height: 55vh;
    display: inline-block;
  }

  .down {
    font-size: $tittle32;
  }

  .down:after {
    font-size: 16px;
    bottom: 8px;
  }

  .down {
    width: 120px;
  }

  .down:hover {
    width: 120px;
  }
}

@media (max-width: 285px) {
  .titleText {
    font-size: $small14;
  }
}

@media (orientation: landscape) {
  h3 {
    margin-top: 50px;
    margin-bottom: 25px;
  }

  .profileDiv {
    margin-bottom: 25px;
    width: 15vw;
    height: 15vw;
  }

  .about {
    max-height: 19vh;
    margin-top: 50px;
  }
}
</style>
