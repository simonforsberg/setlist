<script setup>
import { ref, computed } from "vue";

import Header from "./Header.vue";
import Footer from "./Footer.vue";

import AddExercise from "../components/AddExerciseForm.vue";
import ExerciseCard from "../components/ExerciseCard.vue";
import SummaryCard from "../components/SummaryCard.vue";

const exercises = ref([]);

function addExercise(name) {
  exercises.value.push({
    name: name,
    sets: [{ kg: 0, reps: 0, done: false }],
  });
}

const exerciseCount = computed(() => exercises.value.length);

const setCount = computed(() => {
  return exercises.value.reduce((total, exercise) => {
    return total + exercise.sets.length;
  }, 0);
});

const repCount = computed(() => {
  let total = 0;

  exercises.value.forEach((exercise) => {
    exercise.sets.forEach((set) => {
      total += set.reps;
    });
  });

  return total;
});

const totalVolume = computed(() => {
  let total = 0;

  exercises.value.forEach((exercise) => {
    exercise.sets.forEach((set) => {
      total += set.kg * set.reps;
    });
  });

  return total;
});

function removeExercise(index) {
  exercises.value.splice(index, 1);
}
</script>

<template>
  <main>
    <Header />
    <section class="workout-grid">
      <section class="exercise-list">
        <ExerciseCard
          v-for="(exercise, exIndex) in exercises"
          :key="exIndex"
          :exercise="exercise"
          @remove-exercise="removeExercise(exIndex)"
        />
      </section>

      <div class="workout-sidebar">
        <AddExercise @add-exercise="addExercise" />

        <SummaryCard
          v-if="exercises.length > 0"
          :exercise-count="exerciseCount"
          :set-count="setCount"
          :rep-count="repCount"
          :total-volume="totalVolume"
        />
      </div>
    </section>

    <Footer />
  </main>
</template>
