
<template>
  <ul class="tools-view">
    <li class="tool" v-for="tool in tools">
      <a class="link"v-bind:href="tool.link">{{ tool.name }}</a>{{ tool.description }}
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'tools-view',
    beforeMount() {
      return this.$store.dispatch('FETCH_TOOLS');
    },
    preFetch(store) {
      return store.dispatch('FETCH_TOOLS');
    },
    data() {
      return {
        tools: this.$store.state.tools,
      };
    },
    computed: {
      tools() {
        return this.$store.state.tools;
      },
    },
  };
</script>

<style scoped lang="sass" src="./styles.scss"></style>
