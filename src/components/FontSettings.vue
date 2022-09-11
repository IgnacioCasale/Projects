<template>
  <div class="flex justify-center fontSizeSelector">
    <div class="flex justify-center row" unelevated>
      <p class="text-center col-12">Tamaño de fuente</p>

      <q-btn-group class="btnsSize col-12 flex justify-center" outline>
        <q-btn
          outline
          label="M"
          clickable
          @click="fontSize('M')"
          :class="this.sizeActive === 'M' ? 'activeSize' : ''"
        />
        <q-btn
          outline
          label="L"
          @click="fontSize('L')"
          :class="this.sizeActive === 'L' ? 'activeSize' : ''"
        />
        <q-btn
          outline
          label="XL"
          @click="fontSize('XL')"
          :class="this.sizeActive === 'XL' ? 'activeSize' : ''"
        />
      </q-btn-group>
    </div>
  </div>
</template>

<script>
import { changeFontSize } from "src/globalFunctions/general";

export default {
  data() {
    return {
      sizeActive: localStorage.getItem("fontSize"),
    };
  },

  computed(){
    if (localStorage.getItem("fontSize") === null) {
        this.sizeActive = "M"
    }
  },

  methods: {
    //Changes the font size of the entire application. Save in localStorage the change
    fontSize(size) {
      this.sizeActive = changeFontSize(size);
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.fontSizeSelector {
  margin: 20px;
  p {
    font-size: $text16;
  }

  .btnsSize > button {
    font-size: $text18;
  }

  .activeSize {
    font-weight: 700;
  }
}
</style>
