<script setup lang="ts">
import Dice from './Dice.vue'
import { store } from './store'

const { rollResults, activityData } = store;
const closeApp = () => {
  Telegram.WebApp.close()
}
</script>

<template>
  <div>
    <b>Result: </b>
    <span :class="rollResults.activity_result?.type">
      {{ rollResults.activity_result?.text }}
    </span>
  </div>
  <div class="dice-block">
    <Dice v-for="index in activityData?.dice" :key="index" :value="rollResults?.dice_results?.[index - 1]"
      :disabled="index > rollResults?.dice_results?.length" />
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



