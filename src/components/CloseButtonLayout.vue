<template>
  <div class="flex justify-center">
    <p unelevated class="btn-close self-end">
      Volver
    </p>
  </div>
</template>

<script>

export default {

};
</script>

<style lang="scss" scoped>
.btn-close {
  display: block;
  letter-spacing: 3px;
  font-size: $small14;
  padding: 10px;
  margin: 0px;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: underline;
  position: fixed;
  bottom: 0px;
  background-color: rgba($secondary, 0.5);
  backdrop-filter: blur(5px);
  width: 100%;
  text-align: center;
}

.btn-close:hover {
  font-weight: 600;
}
</style>
