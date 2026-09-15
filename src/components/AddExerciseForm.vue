<script setup>
import { ref } from "vue";

const newExerciseName = ref("");

const emit = defineEmits(["add-exercise"]);

function addExercise() {
  if (!newExerciseName.value.trim()) {
    return;
  }

  emit("add-exercise", newExerciseName.value);

  newExerciseName.value = "";
}
</script>

<template>
  <form class="add-exercise" @submit.prevent="addExercise">
    <input type="text" v-model="newExerciseName" placeholder="Övning" />

    <button type="submit" class="add-exercise-btn">Lägg till</button>
  </form>
</template>

<style scoped></style>
