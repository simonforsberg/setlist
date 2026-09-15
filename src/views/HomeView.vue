<script setup>
import { ref } from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import AddExercise from "../components/AddExerciseForm.vue";
import ExerciseCard from "../components/ExerciseCard.vue";

const exercises = ref([]);

function addExercise(name) {
  exercises.value.push({
    name: name,
    sets: [{ kg: 0, reps: 0, done: false }],
  });
}
</script>

<template>
  <main>
    <Header />

    <AddExercise @add-exercise="addExercise" />

    <ExerciseCard />

    <Footer />
  </main>
</template>
