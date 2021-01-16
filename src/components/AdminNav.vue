<template>
  <nav class="nav-admin">
    <div class="nav-admin__wrapper">
      <router-link to="/" class="nav-admin__logo">CHOMLI.<span>io</span></router-link>
      <div class="nav-admin__links">
        <router-link to="/" class="nav-admin__links-item"
          ><span class="material-icons"> home </span>Главная</router-link
        >
        <router-link to="new-student" class="nav-admin__links-item"
          ><span class="material-icons"> person_add </span>Добавить
          ученика</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav-admin {
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

  &__links {
    width: 500px;
    display: flex;
    justify-content: space-between;

    &-item {
      width: 250px;
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
    }
  }
}
@media (max-width: 800px) {
  .nav-admin {
    &__wrapper {
      padding: 0 10px;
      flex-wrap: wrap;
      height: 110px;
    }
    &__logo {
      font-size: 1.5em;
      padding-top: 10px;
      text-align: center;
      width: 100%;
    }

    &__links {
      width: 100%;
      justify-content: center;
      font-size: .8em;

      &-item {
      }
    }
  }
}
</style>
