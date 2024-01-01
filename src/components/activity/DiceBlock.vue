<script setup lang="ts">
import { ref } from 'vue'
import { store } from '@activity/store'
import Dice from '@activity/Dice.vue'

const props = defineProps<{
  rolling?: boolean,
  clickCallback?: (i: number) => void,
  disabledCallback: (i: number) => boolean,
  selectedCallback?: (i: number) => boolean,
  rollingCallback?: (i: number) => boolean | undefined,
  valueCallback?: (i: number) => number | undefined,
}>();


const { disabledCallback, clickCallback, selectedCallback, rollingCallback, valueCallback }: any = props
const { activityData, diceResults } = store;

const modifierToggle = ref(false);

const disabled = (i: number) => {
  return disabledCallback?.(i) || false;
}

const click = (i: number) => {
  clickCallback?.(i);
}

const select = (i: number) => {
  return selectedCallback?.(i);
}

const value = (i: number) => {
  if (valueCallback) return valueCallback(i);

  return modifierToggle.value ? diceResults?.with_modifiers?.[i] : diceResults?.real?.[i];
}

const rollingDice = (i: number) => {
  return rollingCallback?.(i);
}

const resultsAreDifferent = () => {
  return diceResults?.real?.some((result, i) => {
    return result !== diceResults?.with_modifiers?.[i];
  });
}
</script>

<template>
  <label v-if="resultsAreDifferent()" class="relative inline-flex items-center cursor-pointer mt-4">
    <input type="checkbox" value="" class="sr-only peer" @click="modifierToggle = !modifierToggle">
    <div
      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
    </div>
    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">With modifiers</span>
  </label>
  <div class="dice-block">
    <Dice v-for="(_item, i) in Array.from({ length: activityData?.dice })" :key="i" :disabled="disabled(i)"
      @click="click(i)" :selected="select(i)" :value="value(i)" :rolling="rollingDice(i)"
      :success="diceResults?.successes?.[i] == 'success'" />
  </div>
</template>

