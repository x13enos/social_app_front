<script setup lang="ts">
import { ref, Ref } from 'vue';
import DiceBlock from './DiceBlock.vue'
import { Modifier } from './types'
import Reroll from './modifiers/Reroll.vue'
import { store } from './store'
import { resolve } from './requests';

const currentModifier: Ref<Modifier | null> = ref(null);
const { activityData, diceResults } = store;
const applyResults = () => {
  resolve();
}

const disabledCallback = (i: number) => {
  return i + 1 > diceResults.real?.length;
}

const activeModifiers = activityData.modifiers.active;
</script>

<template>
  <div>
    <b>Use modifier! </b>
  </div>
  <ul class="grid w-full gap-6 md:grid-cols-2">
    <li v-for="modifier in activeModifiers" :key="modifier.name">
      <input type="radio" :id="modifier.name" v-model="currentModifier" :value="modifier" class="hidden peer" required>
      <label :for="modifier.name" class="radio-label">
        {{ modifier.name }}
      </label>
    </li>
  </ul>
  <template v-if="!currentModifier">
    <DiceBlock :disabledCallback="disabledCallback" />
    <button @click="applyResults" class="btn btn-outline-blue">Ignore help</button>
  </template>
  <Reroll v-if="currentModifier?.name == 'reroll'" :modifier="currentModifier" />
</template>

<style scoped>
.radio-label {
  @apply mt-2 block px-3 py-2 text-center border-slate-800 border cursor-pointer font-semibold rounded peer-checked:bg-blue-400 peer-checked:text-white peer-checked:border-transparent;
}
</style>