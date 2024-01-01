<script setup lang="ts">
import DiceBlock from '@activity/DiceBlock.vue'
import { store } from './store'

const { diceResults, activityResult } = store;

const disabledCallback = (i: number) => {
  return i + 1 > diceResults.real?.length;
}

const closeApp = () => {
  // @ts-ignore: Unreachable code error
  Telegram.WebApp.close()
}
</script>

<template>
  <div>
    <b>Result: </b>

    <span :class="activityResult?.type">
      {{ activityResult?.text }}
    </span>
  </div>
  <DiceBlock :disabledCallback="disabledCallback" />
  <button @click="closeApp" class="btn btn-outline-blue">Close</button>
</template>

<style scoped>
.success {
  color: green;
}

.failure {
  color: red;
}
</style>



