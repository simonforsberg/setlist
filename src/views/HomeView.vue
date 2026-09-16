<script setup>
import { ref, computed } from "vue";

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

import AddExercise from "../components/AddExerciseForm.vue";
import ExerciseCard from "../components/ExerciseCard.vue";
import SummaryCard from "../components/SummaryCard.vue";
import ProgressButton from "../components/ProgressButton.vue";

const exercises = ref([]);

const workoutStarted = ref(null);

function addExercise(name) {
  if (exercises.value.length === 0) {
    workoutStarted.value = new Date();
  }

  exercises.value.push({
    name: name,
    sets: [{ kg: 0, reps: 0, done: false }],
  });
}

const workoutStartTime = computed(() => {
  if (!workoutStarted.value) {
    return "";
  }

  return (
    workoutStarted.value.toLocaleDateString("sv-SE", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }) +
    " kl " +
    workoutStarted.value.toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
});

function removeExercise(index) {
  exercises.value.splice(index, 1);
}

function clearSession() {
  exercises.value = [];
  workoutStarted.value = null;
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

const setDoneCount = computed(() => {
  let total = 0;

  exercises.value.forEach((exercise) => {
    exercise.sets.forEach((set) => {
      if (set.done) {
        total++;
      }
    });
  });

  return total;
});

const allSetsDone = computed(() => {
  return setCount.value > 0 && setDoneCount.value === setCount.value;
});
</script>

<template>
  <main>
    <Header />
    <section
      class="workout-grid"
      :class="{ 'workout-grid--empty': exercises.length === 0 }"
    >
      <section class="exercise-list">
        <ExerciseCard
          v-for="(exercise, exIndex) in exercises"
          :key="exIndex"
          :exercise="exercise"
          @remove-exercise="removeExercise(exIndex)"
        />
      </section>

      <div class="workout-sidebar">
        <div class="no-exercises" v-if="exercises.length === 0">
          <p>Lägg till en övning nedan för att starta ett pass.</p>
        </div>
        <AddExercise @add-exercise="addExercise" />

        <SummaryCard
          v-if="exercises.length > 0"
          :exercise-count="exerciseCount"
          :set-count="setCount"
          :rep-count="repCount"
          :total-volume="totalVolume"
          :workout-start-time="workoutStartTime"
        />

        <ProgressButton
          v-if="exercises.length > 0"
          :set-count="setCount"
          :set-done-count="setDoneCount"
          :all-sets-done="allSetsDone"
          @clear-session="clearSession"
        />
      </div>
    </section>

    <Footer />
  </main>
</template>
