<script setup lang="ts">
import Dice from './Dice.vue'
import { store } from './store'

const { selectedDice, activityData, rollResults } = store;

const activeDiceIndexes = rollResults?.dice_results ? rollResults.dice_results.map((_, index) => index).filter((i) => !selectedDice.includes(i)) : []

const isDisabled = (i: number) => {
  return !selectedDice.includes(i) && !activeDiceIndexes.includes(i);
}

</script>

<template>
  <b>Rolling...</b>
  <div class="dice-block">
    <Dice v-for="i in activityData.dice" :key="i" :rolling="selectedDice.includes(i - 1)" :disabled="isDisabled(i - 1)"
      :value="activeDiceIndexes.includes(i - 1) ? rollResults?.dice_results[i - 1] : undefined" />
  </div>
  <button disabled class="btn btn-disabled">Roll</button>
</template>

<style scoped></style>



