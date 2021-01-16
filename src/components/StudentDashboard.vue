<template>
  <div class="students" v-if="absStudents && finalStudents">
    <div class="students__wrapper">
      <div class="students__title">
        Выберите класс:
      </div>
      <div class="students__select"></div>
      <transition name="fade">
        <ul class="students__select-list">
          <li
            class="students__select-list__item"
            v-for="(item, i) of items"
            :key="i"
            :class="{ active: item === currentItem }"
            @click="closeList(item)"
          >
            {{ item }}
          </li>
        </ul>
      </transition>
    </div>
    <input
      type="text"
      v-model="text"
      placeholder="Введите имя"
      class="students__input"
      @input="filterArray"
    />
    <div
      class="students__items"
      v-if="filteredStudents && filteredStudents[part]"
    >
      <StudentDashboardItem
        v-for="(student, i) of filteredStudents[part][currentItem]"
        :key="i"
        :student="student"
        :active="
          finalStudents[part][currentItem]
            ? finalStudents[part][currentItem].includes(student.name)
            : false
        "
        @student-add="addToObj"
      />
    </div>
    <button class="students__btn" @click="apply">
      Подтвердить
    </button>
  </div>
</template>

<script>
import db from "./firebaseinit";
import StudentDashboardItem from "./StudentDashboardItem";

export default {
  data() {
    return {
      part: 1,
      currentItem: "8A",
      items: ["8A", "8B", "9A", "9B", "10A", "10B", "11A", "11B"],
      text: "",
      finalStudents: null,
      filteredStudents: null
    };
  },
  props: {
    students: Object,
    absStudents: Object
  },
  components: {
    StudentDashboardItem
  },
  created() {
    this.finalStudents = JSON.parse(JSON.stringify(this.absStudents));
    this.filteredStudents = JSON.parse(JSON.stringify(this.students));
  },
  methods: {
    apply() {
      const path = this.finalStudents[this.part][this.currentItem];
      if (!path.length) {
        path.push(".");
      } else {
        path.slice(path.indexOf("."), 1);
      }
      const obj = {};
      db.collection("students")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (Object.keys(doc.data())[0] === this.currentItem) {
              obj[this.currentItem] = this.finalStudents[this.part][
                this.currentItem
              ];
              doc.ref.update(obj);
            }
          });
        });
    },
    addToObj(name) {
      let sPath = this.finalStudents[this.part];
      if (sPath[this.currentItem].includes(name)) {
        sPath[this.currentItem].splice(
          sPath[this.currentItem].indexOf(name),
          1
        );
      } else {
        sPath[this.currentItem].push(name);
      }
    },
    filterArray() {
      this.filteredStudents[this.part][this.currentItem] = this.students[
        this.part
      ][this.currentItem].filter(student =>
        student.name.toLowerCase().includes(this.text.toLowerCase())
      );
    },
    closeList(item) {
      this.currentItem = item;

      if (this.currentItem.includes("8") || this.currentItem.includes("11")) {
        this.part = 1;
      } else {
        this.part = 2;
      }
      this.filterArray();
    }
  }
};
</script>

<style lang="scss" scoped>
.students {
  max-width: 1500px;
  padding: 0 50px;
  margin: 0 auto 20px;
  font-size: 24px;
  position: relative;

  &__wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

  &__btn {
    width: 400px;
    height: 40px;
    margin: 0 auto;
    background: lightgreen;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
    cursor: pointer;
  }

  &__input {
    font-size: 0.8em;
    width: 100%;
    padding: 10px 30px;
    margin-bottom: 10px;
    border-radius: 50px;
    background: #f0f0f0;
  }

  &__title {
    margin-top: 10px;
    padding-right: 10px;
    font-size: 0.8em;
  }

  &__select {
    margin-top: 10px;
    font-size: 0.8em;

    &-list {
      display: flex;
      flex-wrap: wrap;
      font-size: 0.9em;
      padding: 10px 0 0;
      margin: 0;
      user-select: none;

      &__item {
        width: 50px;
        height: 27px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.2s;
        cursor: pointer;
        border-radius: 15px;
        user-select: none;
        margin-right: 10px;

        &:hover {
          color: #fff;
          background: lightgreen;
        }

        &.active {
          background: lightgreen;
          color: #fff;
        }
      }
    }
  }
  &__items {
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@media (max-width: 500px) {
  .students {
    padding: 0 20px;
  }
  .students__btn {
    width: 200px;
  }
}
</style>
