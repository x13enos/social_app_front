<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { store } from '@activity/store'
import { rollDice } from '@activity/requests';
import DiceBlock from '@activity/DiceBlock.vue'

const { activityData } = store;

onMounted(() => {
  store.selectedDice = [];
})

const selectDice = (number: number) => {
  number += 1;
  if (number > activityData?.available_dice) return;

  store.selectedDice = Array.from(Array(number).keys())
}

const valid = computed(() => {
  const number = store.selectedDice.length;
  return number > 0 && number <= activityData?.available_dice
})

const disabledCallback = (number: number) => {
  return number >= activityData?.available_dice;
}

const selectedCallback = (number: number) => {
  return store.selectedDice.includes(number);
}
</script>

<template>
  <b>Choose how many dice to roll</b>
  <DiceBlock :disabledCallback="disabledCallback" :clickCallback="selectDice" :selectedCallback="selectedCallback" />
  <button :disabled="!valid" :class="{ 'btn-disabled': !valid }" class="btn" @click="rollDice">
    Roll
  </button>
</template>

<style scoped></style>