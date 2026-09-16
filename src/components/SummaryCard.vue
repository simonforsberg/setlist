<script setup>
defineProps([
  "exerciseCount",
  "setCount",
  "repCount",
  "totalVolume",
  "workoutStartTime",
]);
</script>

<template>
  <section class="summary-card">
    <h3>Sammanfattning</h3>

    <p>{{ workoutStartTime }}</p>

    <div class="summary-grid">
      <div class="summary-item">
        <h4>Övningar</h4>
        <p>{{ exerciseCount }}</p>
      </div>

      <div class="summary-item">
        <h4>Set</h4>
        <p>{{ setCount }}</p>
      </div>

      <div class="summary-item">
        <h4>Reps</h4>
        <p>{{ repCount }}</p>
      </div>

      <div class="summary-item">
        <h4>Total volym</h4>
        <p>{{ totalVolume }} kg</p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
