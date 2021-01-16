<template>
  <div class="student__overflow">
    <form class="student__form" @submit.prevent="saveStudent">
      <router-link to="/admin" class="admin__link"
        ><span class="material-icons">
          arrow_back
        </span></router-link
      >
      <div class="student__form-title">Редактировать ученика</div>
      <div class="student__form-items">
        <div class="student__form-items__item">
          <div class="student__form-items__item-title">Имя</div>
          <input
            v-model="name"
            type="text"
            class="student__form-items__item-input"
            required
          />
        </div>
        <div class="student__form-items__item second">
          <div class="student__form-items__item-title">Класс</div>
          <input
            v-model="subitem"
            @input="subitem = subitem.replace(/\D/g, '').slice(0, 2)"
            type="text"
            class="student__form-items__item-input"
            required
          />
        </div>
        <div class="student__form-items__select">
          <div
            @click="word = 'A'"
            :class="{ active: word === 'A' }"
            class="student__form-items__select-item"
          >
            A
          </div>
          <div
            @click="word = 'B'"
            :class="{ active: word === 'B' }"
            class="student__form-items__select-item"
          >
            B
          </div>
        </div>
        <div class="student__form-items__item second">
          <div class="student__form-items__item-title">Стол</div>

          <input
            required
            v-model.number="table"
            type="text"
            class="student__form-items__item-input "
          />
        </div>
        <div class="student__form-items__item">
          <div class="student__form-items__item-title">
            Отсутствуют на полднике
          </div>
          <ul class="student__form-items__item-list">
            <li
              class="student__form-items__item-list__item"
              :class="{ active: days ? days.includes(li) : false }"
              @click="addToList(li)"
              v-for="(li, ind) of week"
              :key="ind"
            >
              {{ li }}
            </li>
          </ul>
        </div>
      </div>
      <button class="student__form-btn">Отправить</button>
    </form>
  </div>
</template>

<script>
import db from "./firebaseinit";

export default {
  name: "edit",
  data() {
    return {
      week: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
      name: null,
      subitem: null,
      table: null,
      student_id: null,
      days: null,
      item: null,
      word: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("list")
      .where("id", "==", to.params.student_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.student_id = doc.data().id;
            vm.name = doc.data().name;
            vm.item = doc.data().item;
            vm.table = doc.data().table;
            vm.days = doc.data().days;
            vm.word = doc.data().item[doc.data().item.length - 1];
            vm.subitem = doc.data().item.slice(0, doc.data().item.length - 1);
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    addToList(item) {
      if (this.days.includes(item)) {
        this.days = this.days.filter(el => el !== item);
      } else {
        this.days.push(item);
      }
    },
    fetchData() {
      db.collection("list")
        .where("id", "==", this.$route.params.student_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.student_id = doc.data().id;
            this.name = doc.data().name;
            this.item = doc.data().item;
            this.table = doc.data().table;
            this.days = doc.data().days;
          });
        });
    },
    saveStudent() {
      const data = {
        id: this.student_id,
        name: this.name,
        item: this.subitem + this.word,
        table: this.table,
        days: this.days
      };
      db.collection("list")
        .where("id", "==", this.$route.params.student_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update(data);
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.admin__link {
  position: absolute;
  left: 20px;
  top: 20px;
}
.student__overflow {
  width: 100vw;
  height: 100vh;
  background: #f0f0f0;
  padding: 50px;
}
.student__form {
  position: relative;
  max-width: 400px;
  padding-bottom: 50px;
  margin: 0 auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  font-size: 24px;

  &-btn {
    width: 340px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto 0;
    font-size: 0.6em;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      background: lightgreen;
      color: #fff;
    }
  }

  &-title {
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: lighter;
    text-align: center;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: lightgreen;
  }

  &-items {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    padding-right: 30px;
    padding-left: 30px;

    &__item {
      &-title {
        margin: 5px 0;
      }
      &-list {
        user-select: none;
        padding: 0;
        margin: 0;
        width: 340px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        &__item {
          width: 45px;
          height: 40px;
          font-size: 0.8em;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f0f0f0;
          transition: all 0.2s;
          cursor: pointer;

          &.active {
            background: lightgreen;
            color: #fff;
          }
        }
      }
    }

    &__select {
      width: 100px;
      height: 40px;
      align-items: end;
      display: flex;
      margin-right: 40px;
      user-select: none;

      &-item {
        width: 60px;
        height: 100%;
        border: 2px solid #f0f0f0;
        border-left: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.2s;
        cursor: pointer;

        &.active {
          border-color: transparent;
          background: lightgreen;
          color: #fff;
        }
      }
    }

    &__item {
      &-title {
        font-size: 0.8em;
      }
      &-input {
        padding: 5px 7px;
        font-size: 0.9em;
        border: 2px solid #f0f0f0;
        width: 340px;
        height: 40px;
      }
    }
  }
}
.second > input {
  width: 100px;
}

@media (max-width: 600px) {
  .student__form {
    &-items {
      &__item {
        &-input {
        }
        &-list {
          max-width: 300px !important;

          &__item {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
@media (max-width: 500px) {
  .second {
    width: 80px;
  }
  .student__form {
    &-title {
      font-size: 0.8em;
    }
    &-items {
      &__select {
        transform: translateX(70%);
      }
      &__item {
        &-input {
          width: 250px !important;
        }
        &-list {
          max-width: 200px !important;
          justify-content: flex-start !important;
          &__item {
            margin-right: 5px;
          }
        }
      }
    }
    &-btn {
      width: 200px !important;
    }
  }
}
</style>
