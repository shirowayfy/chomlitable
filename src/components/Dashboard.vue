<template>
  <Preloader v-if="!isLoaded" />

  <div id="dashboard" v-else>
    <Navbar :isStudent="isStudent" @updateProp="updateProp" />
    <StudentDashboard
      v-if="isStudent"
      :students="students"
      :absStudents="absStudents"
    />
    <Marked :list="absStudents" v-if="!isStudent" @update-data="update" />
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar";
import StudentDashboard from "./StudentDashboard";
import Marked from "./Marked";
import db from "./firebaseinit";
import Preloader from "./Preloader";
export default {
  name: "dashboard",
  components: {
    Navbar,
    StudentDashboard,
    Marked,
    Preloader
  },
  data() {
    return {
      students: null,
      isStudent: null,
      absStudents: null,
      isLoaded: null
    };
  },
  mounted() {
    const d = new Date();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const date = `${day.toString().length < 2 ? `0${day}` : day}:${
      month.toString().length < 2 ? `0${month}` : month
    }`;
    db.collection("date")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (date !== doc.data().date) {
            doc.ref.update({
              date: date
            });
            db.collection("students")
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  const obj = {};
                  obj[Object.keys(doc.data())[0]] = [];
                  doc.ref.update(obj);
                });
              });
          }
        });
      })
      .then(() => {
        const obj = {};

        db.collection("students")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              let part;
              const item = Object.keys(doc.data())[0];

              if (item.includes("8") || item.includes("11")) {
                part = 1;
              } else {
                part = 2;
              }

              obj[part] = obj[part] ? obj[part] : {};

              obj[part][item] = doc.data()[item];
              this.absStudents = obj;
            });
          })
          .then(() => {
            this.update();
          });
      });
  },
  created() {
    this.isLoaded = false;
    axios
      .get("https://api.jsonbin.io/b/5fd509e481a213596aaa9de3/202", {
        headers: {
          "secret-key":
            "$2b$10$yzSZbMPtFlw/az7c3I6FCeZCsn6aCGI3BkiPXe2GITyEONBmheIOe"
        }
      })
      .then(res => {
        this.students = res.data;
        this.isStudent = false;
        this.isLoaded = true;
      });
  },
  methods: {
    updateProp(prop) {
      this.isStudent = prop;
    },
    update() {
      const obj = {};
      db.collection("students")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let part;
            const item = Object.keys(doc.data())[0];

            if (item.includes("8") || item.includes("11")) {
              part = 1;
            } else {
              part = 2;
            }

            obj[part] = obj[part] ? obj[part] : {};

            obj[part][item] = doc.data()[item];
            this.absStudents = obj;
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
