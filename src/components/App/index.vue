<template>
  <div id="app">
    <i class="logo"></i>
    <ul class="nav">
      <li class="navItem">
        <router-link class="link" to="/">Home</router-link>
      </li>
      <li class="navItem">
         <router-link class="link" to="/tools">Tools</router-link>
      </li>
    </ul>
    <div class="content">
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </div>
  </div>
</template>

<script></script>

<style scoped lang="sass" src="./styles.scss"></style>
