<template>
  <div>
    <ChatElement :id="id"></ChatElement>
  </div>
</template>

<script>
import ChatElement from "components/Chats/ChatElement.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },

  components: {
    ChatElement,
  },
};
</script>

<style></style>
