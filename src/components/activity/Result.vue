<script setup lang="ts">
import Dice from './Dice.vue'
import { store } from './store'

const { diceResults, activityData, activityResult } = store;
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
  <div class="dice-block">
    <Dice v-for="index in activityData?.dice" :key="index" :value="diceResults[index - 1]"
      :disabled="index > diceResults?.length" />
  </div>
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



