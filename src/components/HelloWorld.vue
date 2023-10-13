<script setup lang="ts">
  import { ref, inject } from 'vue'
  import type { Ref } from 'vue'
  import Dice from './Dice.vue'

  const state: Ref<string> = ref('choosing');

  interface UserData {
    id: number
    first_name: string
    last_name: string
    username: string
    language_code: string
    allows_write_to_pm: boolean
  }

  interface RollResults {
    dice_results?: number[],
    activity_result?: {
      text: string,
      type: 'success' | 'failure',
      result: {}
    }
  }

  const selectedDice: Ref<number> = ref(0)
  const userData: Ref<UserData> = ref(Telegram.WebApp.initDataUnsafe["user"])
  const rollResults: Ref<RollResults> = ref({})
  // const userData: Ref<UserData> = ref({ "id": 192233866, "first_name": "Andres", "last_name": "Sild", "username": "x3enos", "language_code": "en", "allows_write_to_pm": true })
  
  const axios:any = inject('axios')
  let activityData = ref({})
  
  if (Telegram.WebApp.initDataUnsafe["start_param"]) {
    const response = await axios.get(`activities/${Telegram.WebApp.initDataUnsafe["start_param"]}`, { params: { user_id: userData.value.id } })
    activityData.value = response.data;
    console.log(activityData.value)
  }

  const rollDice = async () => {
    state.value = 'rolling'
    const params = {
      activity_id: activityData.value["id"],
      character_id: activityData.value["character_id"],
      dice_number: selectedDice.value
    }
    const response = await axios.put(`activities/roll_dice`, params)
    rollResults.value = response.data;
    console.log(rollResults.value)
    setTimeout(() => {
      state.value = 'rolled';
    }, 1500)
  }

  const selectDice = (value: number) => {
    selectedDice.value = value
  }

  const closeApp = () => {
    Telegram.WebApp.close()
  }

</script>

<template>
  <div>111</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.dice {
  flex-wrap: wrap;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.dice-block {
  margin-top: 2rem;
}

.success {
  color: green;
}

.failure {
  color: red;
}
</style>

