<script setup lang="ts">
import { toRefs, onMounted, computed, inject } from 'vue';
import Dice from './../Dice.vue'
import { Modifier } from './../types'
import { store } from './../store'

const props = defineProps<{
  modifier: Modifier
}>();

const { rollResults, activityData } = store;
const { modifier } = toRefs(props);

const selectDice = (i: number) => {
  if (i > rollResults?.dice_results?.length) return;

  const index = i - 1;
  if (store.selectedDice.includes(index)) {
    store.selectedDice = store.selectedDice.filter((item) => item !== index);
  } else {
    if (store.selectedDice.length < modifier.value.modifier)
      store.selectedDice.push(index);
  }
}

const valid = computed(() => {
  const number = store.selectedDice.length;
  return number > 0 && number <= modifier.value.modifier
})

onMounted(() => {
  store.selectedDice = [];
})

const axios: any = inject('axios')
const roll = async () => {
  store.state = 'rolling'
  const params = {
    activity_id: activityData["id"],
    character_id: activityData["character_id"],
    dice_numbers: store.selectedDice
  }
  // const response = await axios.put(`/activities/roll_dice`, params)
  // store.rollResults = response.data;
  store.rollResults = {
    dice_results: [1, 6, 6],
    activity_result: {
      text: "Great job buddy!",
      type: "success"
    }
  }
  store.removeModifier(modifier);
  setTimeout(() => {
    if (activityData["modifiers"].length)
      store.state = 'help';
    else
      store.state = 'rolled';
  }, 1000)
}
</script>

<template>
  <div class="dice-block">
    <Dice v-for="i in activityData.dice" :key="i" :value="rollResults?.dice_results?.[i - 1]"
      :disabled="i > rollResults?.dice_results?.length" @click="selectDice(i)"
      :selected="store.selectedDice.includes(i - 1)" />
  </div>
  <button :disabled="!valid" :class="{ 'btn-disabled': !valid }" class="btn" @click="roll">
    Roll
  </button>
</template>