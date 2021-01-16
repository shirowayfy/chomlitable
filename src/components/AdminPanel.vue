<template>
  <div>
    <AdminNav />
    <div class="admin__wrapper">
      <input
        type="text"
        v-model="text"
        placeholder="Введите имя"
        class="admin__input"
        @input="filterArray"
      />
      <div class="admin">
        <div class="admin__items">
          <div class="admin__items-item" v-for="(person, i) of outarr" :key="i">
            <span>{{ person.name }} (#{{ person.student_id }})</span>
            <router-link
              class="admin__items-item__btn"
              :to="{ name: 'edit', params: { student_id: person.student_id } }"
              >Редактировать</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "./firebaseinit";
import AdminNav from "./AdminNav";

export default {
  components: {
    AdminNav
  },
  data() {
    return {
      people: [],
      text: "",
      outarr: []
    };
  },
  created() {
    db.collection("list")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            name: doc.data().name,
            student_id: doc.data().id,
            item: doc.data().item,
            table: doc.data().table,
            days: doc.data().days
          };
          this.people.push(data);
          this.outarr = JSON.parse(JSON.stringify(this.people));
        });
      });
  },
  methods: {
    filterArray() {
      this.outarr = this.people.filter(el =>
        el.name.toLowerCase().includes(this.text.toLowerCase())
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.admin {
  text-align: center;
  font-size: 24px;

  &__wrapper {
    max-width: 1500px;
    padding: 20px 50px;
    margin: 0 auto 20px;
  }

  &__input {
    font-size: 1.2em;
    width: 100%;
    padding: 10px 30px;
    margin-bottom: 10px;
    border-radius: 50px;
    background: #f0f0f0;
  }

  &__items {
    &-item {
      background: #fff;
      padding: 20px 30px;
      font-size: 0.8em;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      justify-content: space-between;
      transition: all 0.2s;

      &__btn {
        width: 200px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f0f0f0;
        padding: 10px 0;
        border-radius: 20px;
        font-size: 0.8em;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: lightgreen;
          color: #fff;
        }
      }
    }
  }
}
@media (max-width: 800px) {
  .admin {
    &__wrapper {
      padding: 20px;
    }
  }
}
@media (max-width: 500px) {
  .admin {
    &__items {
      &-item {
        flex-direction: column;
        &__btn {
          margin: 10px auto 0;
        }
      }
    }
  }
}
</style>
