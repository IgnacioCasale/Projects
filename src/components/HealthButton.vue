<template>
  <div class="row flex justify-center">
    <div class="col-8 flex justify-center">
      <q-btn clickable unelevated v-bind:to="url">
        <div class="healthButton">
          <span class="circle" aria-hidden="true">
            <q-icon class="icon arrowButton" name="favorite" />
          </span>
          <span class="button-text flex justify-center items-center"
            ><p>{{ text }}</p></span
          >
        </div>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "Únete Ahora",
    },

    url: {
      type: String,
      default: "/signUp",
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.q-focus-helper) {
  display: none;
}

.healthButton {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-family: inherit;
  width: 300px;
  height: auto;
}

.healthButton .circle {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: relative;
  display: block;
  margin: 0;
  width: 48px;
  height: 48px;
  background: $primary;
  border-radius: 1.625rem;
  z-index: 2;
  font-size: 16px;
  overflow: hidden;
  border: 2px solid $white;
}

.healthButton .circle .icon {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: relative;
  top: 10px;
  left: 0;
  color: $white;
  background: none;
  font-size: 25px;
  animation: latidos 2s infinite;
  transform: scale(0.8);
}

.healthButton .button-text {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: $white;
  font-weight: 700;
  line-height: 100%;
  text-align: start;
  text-transform: uppercase;
  font-family: "GlacialR";
  letter-spacing: 3px;
  background-color: rgba($color: $primary, $alpha: 0.6);
  border-radius: 0 50px 50px 0;
  margin-left: 24px;
  padding-top: 2px;
  padding-left: 5px;
  text-align: center;
  z-index: 1;
  overflow: hidden;
}

.healthButton .button-text > p {
  margin: 0px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: $text18;
  text-align: center;
}

.healthButton:hover .circle {
  width: 100%;
  z-index: 0;
}

.healthButton:hover .button-text {
  background-color: rgba($color: $primary, $alpha: 0);
  opacity: 0;
}

.healthButton:hover .circle .icon {
  font-size: 32px;
  animation: latidos 0.7s infinite;
  top: 5px;
}

@keyframes latidos {
  from {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  to {
    transform: scale(0.8);
  }
}

@media (max-width: 599px) {
  .healthButton .button-text {
    font-size: $text16;
    display: flex;
    justify-content: flex-start !important;
    padding-left: 35px;
  }

  .healthButton {
    width: 230px;
  }
}
</style>
