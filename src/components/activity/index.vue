<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
import Rolling from './Rolling.vue'
import Choosing from './Choosing.vue'
import Result from './Result.vue'
import Help from './Help.vue'
import { ActivityData, UserData } from './types'
import { store } from './store'

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
//   const response = await axios.get(`/activities/${Telegram.WebApp.initDataUnsafe["start_param"]}`, { params: { user_id: userData.value.id } })
//   activityData.value = response.data;
// }

const response = await axios.get(`/activities/6be0b949-4915-47b3-8fe0-9fec84c37f94`, { params: { user_id: userData.value.id } })
store.activityData = response.data;

const { activityData }: { activityData: ActivityData } = store;
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
      <div class="mt-2">
        <Choosing v-if="store.state == 'choosing'" />
        <Help v-if="store.state == 'help'" />
        <Rolling v-if="store.state == 'rolling'" />
        <Result v-if="store.state == 'rolled'" />
      </div>
    </div>
  </template>
</template>

<style scoped></style>

