<script setup lang="ts">
import Dice from './Dice.vue'
import { store } from './store'

const { selectedDice, activityData, diceResults } = store;

const activeDiceIndexes = diceResults ? diceResults.map((_, index) => index).filter((i) => !selectedDice.includes(i)) : []

const isDisabled = (i: number) => {
  return !selectedDice.includes(i) && !activeDiceIndexes.includes(i);
}

</script>

<template>
  <b>Rolling...</b>
  <div class="dice-block">
    <Dice v-for="i in activityData.dice" :key="i" :rolling="selectedDice.includes(i - 1)" :disabled="isDisabled(i - 1)"
      :value="activeDiceIndexes.includes(i - 1) ? diceResults[i - 1] : undefined" />
  </div>
  <button disabled class="btn btn-disabled">Roll</button>
</template>

<style scoped></style>



