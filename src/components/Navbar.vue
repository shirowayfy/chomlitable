<template>
  <nav class="navbar">
    <div class="navbar__wrapper">
      <router-link to="/" class="navbar__logo"
        >CHOMLI.<span>io</span></router-link
      >
      <div class="navbar__select">
        <div
          class="navbar__select-item"
          :class="{ active: isStudent }"
          @click="updateProp(true)"
        >
          <span class="material-icons">
            supervisor_account
          </span>
          Учащиеся
        </div>
        <div
          class="navbar__select-item"
          :class="{ active: !isStudent }"
          @click="updateProp(false)"
        >
          <span class="material-icons">
            import_contacts
          </span>
          Отметившиеся
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["isStudent"],
  methods: {
    updateProp(prop) {
      this.$emit("updateProp", prop);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  border-bottom: 1px solid grey;
  color: #2c3e50;
  font-size: 24px;

  &__wrapper {
    max-width: 1500px;
    padding: 0 50px;
    height: 60px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    font-weight: bold;

    & > span {
      font-weight: lighter;
      color: lightgreen;
    }
  }
  &__select {
    width: 400px;
    display: flex;
    justify-content: space-between;

    &-item {
      width: 150px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.8em;
      position: relative;
      cursor: pointer;
      transition: color 0.3s;

      & > span {
        margin-right: 10px;
      }

      &:hover {
        color: lightgreen;
      }
      &.active {
        color: lightgreen;
      }
    }
  }
}
@media (max-width: 900px) {
  .navbar__select {
    width: 350px;
  }
}
@media (max-width: 600px) {
  .navbar {
    padding-top: 10px;
    height: 110px;

    &__logo {
      width: 100%;
      font-size: 1.5em;
      text-align: center;
    }

    &__select {
      width: 400px;
      margin: 0 auto;
    }
    &__wrapper {
      flex-wrap: wrap;
    }
  }
}
@media (max-width: 450px) {
  .navbar__select {
    font-size: .9em;

    &-item {
      width: 100px;
    }
  }
}
</style>
