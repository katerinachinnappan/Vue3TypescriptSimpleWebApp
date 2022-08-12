<template>
  <div id="app">
    <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
      <router-link to="/" class="navbar-brand">Home</router-link>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
