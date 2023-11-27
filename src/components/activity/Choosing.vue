<script setup lang="ts">
import { computed, onMounted, inject } from 'vue'
import { store } from './store'
import Dice from './Dice.vue'

const selectDice = (i: number) => {
  if (i > activityData?.available_dice) return;
  store.selectedDice = Array.from(Array(i).keys())
}

const valid = computed(() => {
  const number = store.selectedDice.length;
  return number > 0 && number <= activityData?.available_dice
})

const { activityData } = store;
const axios: any = inject('axios')

const roll = async () => {
  store.state = 'rolling'
  const params = {
    activity_id: activityData["id"],
    character_id: activityData["character_id"],
    dice_numbers: store.selectedDice
  }
  // const response = await axios.put(`/activities/roll_dice`, params)
  // rollResults.value = response.data;
  setTimeout(() => {
    store.rollResults = {
      dice_results: [3, 1, 6],
      activity_result: {
        text: "You're fucking loser!",
        type: "failure"
      }
    }
    store.selectedDice = [];
    if (activityData["modifiers"].length)
      store.state = 'help';
    else
      store.state = 'rolled';
  }, 1000)
}

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
  <button :disabled="!valid" :class="{ 'btn-disabled': !valid }" class="btn" @click="roll">
    Roll
  </button>
</template>

<style scoped></style>