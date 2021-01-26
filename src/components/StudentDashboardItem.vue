<template>
  <div v-if="student" class="student__items-item">
    {{ student.name }}
    <button
      class="student__items-item__btn"
      :class="{ active: active }"
      @click="addData(student.name)"
    >
      Отметить
    </button>
  </div>
</template>

<script>
export default {
  props: ["student", "active"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    addData(name) {
      this.$emit("student-add", name);
    }
  }
};
</script>

<style lang="scss" scoped>
.student__items-item {
  padding: 10px 30px;
  font-size: 0.8em;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  transition: all 0.2s;

  &__btn {
    max-width: 200px;
    width: 100%;
    border: none;
    padding: 10px 0;
    border-radius: 20px;
    font-size: 0.8em;
    cursor: pointer;
    transition: all 0.2s;

    &.active {
      background: lightgreen;
      color: #fff;
    }
  }
}
@media (max-width: 500px) {
  .student__items-item {
    text-align: center;
    flex-direction: column;

    & button {
      margin: 0 auto;
      margin-top: 10px !important;
    }
  }
}
</style>
