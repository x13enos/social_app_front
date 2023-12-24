<script setup lang="ts">
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
const { activityData } = store;

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
  return valueCallback?.(i);
}

const rollingDice = (i: number) => {
  return rollingCallback?.(i);
}
</script>

<template>
  <div class="dice-block">
    <Dice v-for="(_item, i) in Array.from({ length: activityData?.dice })" :key="i" :disabled="disabled(i)"
      @click="click(i)" :selected="select(i)" :value="value(i)" :rolling="rollingDice(i)" />
  </div>
</template>

