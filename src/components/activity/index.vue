<script setup lang="ts">
import { ref, inject, Ref } from 'vue'
import Rolling from '@activity/Rolling.vue'
import Choosing from '@activity/Choosing.vue'
import Result from '@activity/Result.vue'
import Modifiers from '@activity/Modifiers.vue'
import ModifiersList from '@activity/modifiers/List.vue'
import Help from '@activity/Help.vue'
import { ActivityData, UserData } from '@activity/types'
import { store } from '@activity/store'

declare var Telegram: any;

// const userData: Ref<UserData> = ref(Telegram.WebApp.initDataUnsafe["user"])
const userData: Ref<UserData> = ref({
  id: 2200488927,
  first_name: 'John',
  last_name: 'Doe',
  username: 'johndoe',
  language_code: 'en',
  allows_write_to_pm: true
})
const axios: any = inject('axios')

// if (Telegram.WebApp.initDataUnsafe["start_param"]) {
// const response = await axios.get(`/activities/${Telegram.WebApp.initDataUnsafe["start_param"]}`, { params: { user_id: userData.value.id } })
const response = await axios.get(`/activities/630f66f6-d291-46b3-8b20-bfb576a7b167`, { params: { user_id: userData.value.id } })
console.log(response.data)
store.activityData = response.data;
if (response.data.type == "help_selecting") {
  store.diceResults = response.data.dice_results;
  store.state = 'modifying'
}
// }

// const response = await axios.get(`/activities/6be0b949-4915-47b3-8fe0-9fec84c37f94`, { params: { user_id: userData.value.id } })
// store.activityData = response.data;

const { activityData }: { activityData: ActivityData } = store;
</script>

<template>
  <Help v-if="activityData.type == 'helping'" />

  <template v-else>
    <div v-if="activityData?.status == 'was_performed'">
      That activity has already been responded to.
    </div>

    <template v-else>
      <div>
        <b>Description: </b> {{ activityData?.description }} <br />
        <b class="mt-2">Difficulty: </b> {{ activityData?.difficulty }} <br />
        <ModifiersList />
        <div class="mt-2">
          <Choosing v-if="store.state == 'choosing'" />
          <Modifiers v-if="store.state == 'modifying'" />
          <Rolling v-if="store.state == 'rolling'" />
          <Result v-if="store.state == 'resolved'" />
        </div>
      </div>
    </template>
  </template>
</template>

<style scoped>
.radio-label {
  @apply mt-2 block px-3 py-2 text-center border-slate-800 border cursor-pointer font-semibold rounded peer-checked:bg-blue-400 peer-checked:text-white peer-checked:border-transparent;
}
</style>
