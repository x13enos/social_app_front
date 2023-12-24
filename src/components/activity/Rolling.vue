<script setup lang="ts">
import DiceBlock from './DiceBlock.vue'
import { store } from './store'

const { selectedDice, diceResults } = store;
const realDiceNumbers = diceResults.real ? diceResults.real : [];

const activeDiceIndexes = realDiceNumbers ? realDiceNumbers.map((_, index) => index).filter((i) => !selectedDice.includes(i)) : []

const disabledCallback = (i: number) => {
  return !selectedDice.includes(i) && !activeDiceIndexes.includes(i);
}

const valueCallback = (i: number) => {
  return activeDiceIndexes.includes(i) ? realDiceNumbers[i] : undefined;
}

const rollingCallback = (i: number) => {
  return selectedDice.includes(i);
}

</script>

<template>
  <b>Rolling...</b>
  <DiceBlock :disabledCallback="disabledCallback" :rollingCallback="rollingCallback" :valueCallback="valueCallback" />
  <button disabled class="btn btn-disabled">Roll</button>
</template>

<style scoped></style>



