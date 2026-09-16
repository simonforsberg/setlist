<script setup>
import { computed } from "vue";

const { exercise } = defineProps(["exercise"]);

const emit = defineEmits(["remove-exercise"]);

function removeExercise() {
  emit("remove-exercise");
}

function addSet() {
  exercise.sets.push({ kg: 0, reps: 0, done: false });
}

function removeSet(setIndex) {
  exercise.sets.splice(setIndex, 1);
}

function toggleSet(set) {
  set.done = !set.done;
}

const totalSets = computed(() => {
  return exercise.sets.length;
});

const totalReps = computed(() => {
  let total = 0;

  exercise.sets.forEach((set) => {
    total += set.reps;
  });

  return total;
});

const totalVolume = computed(() => {
  let total = 0;

  exercise.sets.forEach((set) => {
    total += set.kg * set.reps;
  });

  return total;
});
</script>

<template>
  <article class="exercise-card">
    <button
      class="remove-exercise-btn"
      @click="removeExercise(exIndex)"
      aria-label="Ta bort övning"
    >
      ✕
    </button>

    <h2>{{ exercise.name }}</h2>
    <div class="set" v-for="(set, setIndex) in exercise.sets" :key="setIndex">
      <button :class="{ done: set.done }" @click="toggleSet(set)">
        {{ setIndex + 1 }}
      </button>

      <label>
        <input
          type="number"
          v-model.number="set.kg"
          min="0"
          step="0.5"
          placeholder="kg"
        />
        kg
      </label>

      <label>
        <input
          type="number"
          v-model.number="set.reps"
          min="1"
          placeholder="reps"
        />
        reps
      </label>

      <button
        class="remove-set"
        @click="removeSet(setIndex)"
        aria-label="Ta bort set"
      >
        −
      </button>
    </div>

    <button class="add-set-btn" @click="addSet">+ set</button>

    <div class="exercise-summary-grid">
      <div class="exercise-summary-item">
        <h4>Set</h4>
        <p>{{ totalSets }}</p>
      </div>
      <div class="exercise-summary-item">
        <h4>Reps</h4>
        <p>{{ totalReps }}</p>
      </div>
      <div class="exercise-summary-item">
        <h4>Volym</h4>
        <p>{{ totalVolume }} kg</p>
      </div>
    </div>
  </article>
</template>

<style scoped></style>
