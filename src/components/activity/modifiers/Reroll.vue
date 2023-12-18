<script setup lang="ts">
import { onMounted, computed } from 'vue';
import Dice from './../Dice.vue'
import { Modifier } from './../types'
import { store } from './../store'
import { rerollDice } from './../requests';

const props = defineProps<{
  modifier: Modifier
}>();

const { diceResults, activityData } = store;
const { modifier } = props;

const selectDice = (i: number) => {
  if (i > diceResults?.length) return;

  const index = i - 1;
  if (store.selectedDice.includes(index)) {
    store.selectedDice = store.selectedDice.filter((item) => item !== index);
  } else {
    if (store.selectedDice.length < modifier.power)
      store.selectedDice.push(index);
  }
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
  <div class="dice-block">
    <Dice v-for="i in activityData.dice" :key="i" :value="diceResults?.[i - 1]" :disabled="i > diceResults?.length"
      @click="selectDice(i)" :selected="store.selectedDice.includes(i - 1)" />
  </div>
  <button :disabled="!valid" :class="{ 'btn-disabled': !valid }" class="btn" @click="rerollDice(modifier)">
    Roll
  </button>
</template>