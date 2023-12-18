<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { store } from './store'
import { rollDice } from './requests';
import Dice from './Dice.vue'

const { activityData } = store;

const selectDice = (i: number) => {
  if (i > activityData?.available_dice) return;
  store.selectedDice = Array.from(Array(i).keys())
}
const valid = computed(() => {
  const number = store.selectedDice.length;
  return number > 0 && number <= activityData?.available_dice
})

onMounted(() => {
  store.selectedDice = [];
})
</script>

<template>
  <b>Choose how many dice to roll</b>
  <div class="dice-block">
    <Dice v-for="i in activityData?.dice" :key="i" :disabled="i > activityData?.available_dice" @click="selectDice(i)"
      :selected="store.selectedDice.includes(i - 1)" />
  </div>
  <button :disabled="!valid" :class="{ 'btn-disabled': !valid }" class="btn" @click="rollDice">
    Roll
  </button>
</template>

<style scoped></style>