<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
import Dice from './Dice.vue'

const state: Ref<string> = ref('choosing');

declare var Telegram: any;

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

interface ActivityData {
  id: number,
  character_id: string,
  description: string,
  status: string,
  available_dice: number,
  difficulty: number,
  dice: 10
}


const selectedDice: Ref<number> = ref(0)
const userData: Ref<UserData> = ref(Telegram.WebApp.initDataUnsafe["user"])
const rollResults: Ref<RollResults> = ref({})

const axios: any = inject('axios')
const activityData: Ref<ActivityData> = ref({} as ActivityData)

if (Telegram.WebApp.initDataUnsafe["start_param"]) {
  const response = await axios.get(`https://social-game-api.andres-sild.com/api/v1/activities/${Telegram.WebApp.initDataUnsafe["start_param"]}`, { params: { user_id: userData.value.id } })
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
  const response = await axios.put(`https://social-game-api.andres-sild.com/api/v1/activities/roll_dice`, params)
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
  <div v-if="activityData?.status == 'was_performed'">
    That activity has already been responded to.
  </div>

  <template v-else>
    <div>
      <h3>Activity</h3>

      <b>Description: </b> {{ activityData?.description }} <br />
      <b>Difficulty: </b> {{ activityData?.difficulty }} <br />
      <div class="dice-block">

        <template v-if="state == 'choosing'">
          <b>Choose how many dice to roll:</b>
          <div class="dice">
            <Dice v-for="(index) in activityData?.dice" :key="index" :selected="index <= selectedDice"
              :disabled="index > activityData?.available_dice" @click="selectDice(index)" />
          </div>
          <button @click="rollDice">Roll</button>
        </template>

        <template v-if="state == 'rolling'">
          <b>Rolling...</b>
          <div class="dice">
            <Dice v-for="(index) in activityData?.dice" :key="index" :selected="index <= selectedDice"
              :disabled="index > selectedDice" rolling />
          </div>
          <button @click="rollDice">Roll</button>
        </template>

        <template v-if="state == 'rolled'">
          <div>
            <b>Result: </b>
            <span :class="rollResults.activity_result?.type">{{ rollResults.activity_result?.text }}</span>
          </div>
          <div class="dice">
            <Dice v-for="(index) in activityData?.dice" :key="index" :value="rollResults?.dice_results?.[index - 1]"
              :disabled="index > selectedDice" />
          </div>
          <button @click="closeApp">Close</button>
        </template>
      </div>
    </div>
  </template>
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

