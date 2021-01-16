<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "app"
};
</script>
<style lang="scss">
*,
*::after,
*::before {
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}
body {
  margin: 0;
  padding: 0;

  &::-webkit-scrollbar {
    display: none;
  }
}
a {
  text-decoration: none;
  font-size: inherit;
  color: inherit;
}
ul {
  list-style: none;
}
input, button {
  border: none;
  color: inherit;

  &:focus {
    outline: none;
  }
}
</style>
