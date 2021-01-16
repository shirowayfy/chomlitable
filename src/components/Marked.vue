<template>
  <div class="info" v-if="list">
    <div class="info__title">
      Отметившиеся
    </div>
    <div class="info__absents-wrapper">
      <div
        class="info__absents"
        v-for="(part, i) of Object.keys(list).sort()"
        :key="i"
      >
        <div
          class="info__absents-item"
          v-for="(item, ind) of Object.keys(list[part]).sort()"
          :key="ind"
          :class="{ marked: list[part][item].length > 0 }"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="info__refresh" @click="updateEmit">обновить</div>
    <div class="info__title">
      Отсутствующие
    </div>
    <div class="info__students">
      <div
        class="info__students-items"
        v-for="(part, i) of Object.keys(list)"
        :key="i"
      >
        <transition
          name="drop-down"
          v-for="(item, ind) of Object.keys(list[part])"
          :key="ind"
        >
          <div
            class="info__students-items__item"
            v-show="list[part][item].filter(el => el !== '.').length > 0"
          >
            <span>{{ item }}</span>
            <div
              class="info__students-items__item-name"
              v-for="(name, index) of list[part][item]
                .filter(el => el !== '.')
                .slice(0, 4)"
              :key="index"
            >
              - {{ name.length > 20 ? `${name.slice(0, 17)}...` : name }}
            </div>
            <div
              class="info__students-items__item-btn"
              v-if="list[part][item].length > 4"
              @click="showModal(item, list[part][item])"
            >
              Посмотреть (+{{ list[part][item].length - 4 }})
            </div>
            <transition name="fade">
              <div class="modal" v-show="isOpen">
                <div class="modal__close" @click="closeModal">
                  <span class="material-icons">
                    close
                  </span>
                </div>
                <div class="modal__title">{{ title }}</div>
                <div v-for="(student, count) of text" :key="count">
                  {{ student }}
                </div>
              </div>
            </transition>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      text: [],
      isOpen: false
    };
  },
  props: {
    list: Object
  },
  created() {},
  methods: {
    updateEmit() {
      this.$emit("update-data");
    },
    showModal(type, arr) {
      this.title = type;
      this.text = arr;
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.info {
  font-size: 24px;
  max-width: 1500px;
  padding: 0 50px 50px;
  margin: 0 auto;

  &__title {
    color: #2c3e50;
    margin-top: 20px;
    padding-bottom: 10px;
    text-align: center;
    font-size: 0.9em;
    position: relative;

    & > span {
      position: absolute;
      right: 0;
    }

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      width: 120px;
      height: 2px;
      border-radius: 50px;
      background: #2c3e50;
      transform: translateX(-50%);
    }
  }

  &__absents {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    color: #2c3e50;
    margin-top: 20px;
    margin-bottom: 10px;

    &-item {
      width: 80px;
      margin: 0 10px 10px;
      height: 40px;
      background: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      transition: all .3s;

      &.marked {
        background: lightgreen;
        color: #fff;
      }
    }

    &-wrapper {
      display: flex;
      justify-content: center;
    }
  }

  &__students {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    &-items {
      display: flex;
      flex-wrap: wrap;
      &__item {
        border-radius: 15px;
        margin: 0 5px 10px;
        width: 300px;
        height: 220px;
        background: #f0f0f0;
        padding: 10px;
        font-size: 0.9em;

        & > span {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 15px;
          color: #fff;
          width: 80px;
          height: 40px;
          background: lightgreen;
          margin-bottom: 10px;
        }

        &-name {
          font-weight: lighter;
        }

        &-btn {
          margin-top: 10px;
          padding-left: 10px;
          text-decoration: underline;
          font-size: 0.8em;
          cursor: pointer;

          &:hover {
            text-decoration: none;
          }
        }
      }
    }
  }

  &__refresh {
    font-size: 0.6em;
    color: #2c3e50;
    text-decoration: underline;
    text-align: center;

    &:hover {
      cursor: pointer;
      text-decoration: none;
    }
  }
}
.modal {
  padding: 20px;
  border-radius: 15px;
  overflow-y: scroll;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 400px;
  background: #f0f0f0;
  font-weight: lighter;
  border: 1px solid #fff;

  &__title {
    width: 80px;
    height: 40px;
    background: lightgreen;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    font-weight: normal;
  }

  &__close {
    position: absolute;
    right: 20px;
    top: 20px;
    background: #f0f0f0;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    cursor: pointer;

    &:hover {
      background: lightgreen;
      color: #fff;
    }
  }
}

.drop-down-enter-active {
  animation: drop-down 1s;
}

.drop-down-leave-active {
  animation: drop-down 1s reverse;
}

@keyframes drop-down {
  from {
    transform: scaley(0) translate3d(0, -100%, 0);
    height: 0;
  }
  to {
    transform: scaley(1) translate3d(0, 0, 0);
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
@media (max-width: 1300px) {
  .info__students-items {
    justify-content: center;
  }
}
@media (max-width: 1000px) {
  .info__refresh {
    font-size: .8em;
  }
  .info__absents {
    width: 200px;
  }
}
@media (max-width: 500px) {
  .info__students {
    justify-content: center;
  }
  .info__absents {
    width: 100px;
  }
  .info__students-items {
    width: 250px;
  }
}
</style>
