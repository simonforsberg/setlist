<script setup>
defineProps(["setCount", "setDoneCount", "allSetsDone"]);

const emit = defineEmits(["clear-session"]);

function clearSession() {
  emit("clear-session");
}
</script>

<template>
  <section class="workout-progress">
    <p v-if="allSetsDone">Bra jobbat! Klicka nedan för att avsluta passet.</p>
    <p v-else>Slutför alla set.</p>

    <button
      class="workout-progress-btn"
      :class="{ 'all-sets-done': allSetsDone }"
      :disabled="!allSetsDone"
      @click="clearSession"
    >
      <template v-if="allSetsDone"> Avsluta </template>

      <template v-else> {{ setDoneCount }} / {{ setCount }} set </template>
    </button>
  </section>
</template>

<style scoped></style>
