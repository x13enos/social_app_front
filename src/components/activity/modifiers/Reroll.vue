<script setup lang="ts">
import { onMounted, computed } from 'vue';
import DiceBlock from '@activity/DiceBlock.vue'
import { Modifier } from '@activity/types'
import { store } from '@activity/store'
import { rerollDice } from '@activity/requests';

const props = defineProps<{
  modifier: Modifier
}>();

const { diceResults } = store;
const { modifier } = props;

const selectDice = (i: number) => {
  if (i + 1 > diceResults?.real?.length) return;

  if (store.selectedDice.includes(i)) {
    store.selectedDice = store.selectedDice.filter((item) => item !== i);
  } else {
    if (store.selectedDice.length < modifier.power)
      store.selectedDice.push(i);
  }
}

const disabledCallback = (i: number) => {
  return i + 1 > diceResults.real?.length;
}

const selectedCallback = (i: number) => {
  return store.selectedDice.includes(i);
}

const valid = computed(() => {
  const number = store.selectedDice.length;
  return number > 0 && number <= modifier.power
})

onMounted(() => {
  store.selectedDice = [];
})
</script>

<template>
  <DiceBlock :disabledCallback="disabledCallback" :clickCallback="selectDice" :selectedCallback="selectedCallback" />
  <button :disabled="!valid" :class="{ 'btn-disabled': !valid }" class="btn" @click="rerollDice(modifier)">
    Roll
  </button>
</template>