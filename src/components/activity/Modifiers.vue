<script setup lang="ts">
import { ref, Ref } from 'vue';
import Dice from './Dice.vue'
import { Modifier } from './types'
import Reroll from './modifiers/Reroll.vue'
import { store } from './store'

const currentModifier: Ref<Modifier | null> = ref(null);
const { activityData, diceResults } = store;
const applyResults = () => {
  store.state = 'rolled';
}
</script>

<template>
  <div>
    <b>Use modifier! </b>
  </div>
  <ul class="grid w-full gap-6 md:grid-cols-2">
    <li v-for="modifier in activityData.modifiers" :key="modifier.name">
      <input type="radio" :id="modifier.name" v-model="currentModifier" :value="modifier" class="hidden peer" required>
      <label :for="modifier.name" class="radio-label">
        {{ modifier.name }}
      </label>
    </li>
  </ul>
  <template v-if="!currentModifier">
    <div class="dice-block">
      <Dice v-for="(index) in activityData?.dice" :key="index" :value="diceResults?.[index - 1]"
        :disabled="index > diceResults?.length" />
    </div>
    <button @click="applyResults" class="btn btn-outline-blue">Ignore help</button>
  </template>
  <Reroll v-if="currentModifier?.name == 'reroll'" :modifier="currentModifier" />
</template>

<style scoped>
.radio-label {
  @apply mt-2 block px-3 py-2 text-center border-slate-800 border cursor-pointer font-semibold rounded peer-checked:bg-blue-400 peer-checked:text-white peer-checked:border-transparent;
}
</style>