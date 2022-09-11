<template>
  <q-item
    clickable
    tag="a"
    :href="link"
    :class="this.route() == link ? 'linkActive' : 'link'"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",

  data() {
    return {
      active: false,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },

  methods: {
    route() {
      var r = this.$route.path;

      return "#" + r;
    },
  },
});
</script>

<style lang="scss" scoped>
.link {
  font-size: 1rem;
  padding: 15px;
}

.link:hover {
  background-color: #1a827b;
  color: #f8f8f8;
  font-weight: 600;
}

.linkActive {
  background-color: #1a827b;
  color: #f8f8f8;
  font-weight: 600;
  font-size: 1rem;
  padding: 0px;
}

.q-item {
  padding-left: 25px !important;
}
</style>
