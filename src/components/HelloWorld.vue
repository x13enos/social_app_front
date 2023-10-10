<script setup lang="ts">
  import { ref, inject } from 'vue'
  import type { Ref } from 'vue'
  import Dice from './Dice.vue'

  const rolling: Ref<boolean> = ref(false);

  interface UserData {
    id: number
    first_name: string
    last_name: string
    username: string
    language_code: string
    allows_write_to_pm: boolean
  }
    
  const userData: Ref<UserData> = ref(Telegram.WebApp.initDataUnsafe["user"])
  // const userData: Ref<UserData> = ref({ "id": 192233866, "first_name": "Andres", "last_name": "Sild", "username": "x3enos", "language_code": "en", "allows_write_to_pm": true })
  
  const axios:any = inject('axios')
  let activityData = ref()
  
  if (Telegram.WebApp.initDataUnsafe["start_param"]) {
    const response = await axios.get(`activities/${Telegram.WebApp.initDataUnsafe["start_param"]}`, { params: { user_id: userData.value.id } })
    activityData.value = response.data
  }

</script>

<template>

  <h3>Activity</h3>

  <div>{{ activityData["description"] }}</div>

  <div><b>Difficulty</b> - {{ activityData["difficulty"] }}</div>

  <div class="dice">
    <b> Select dice which you want to roll: </b>
    <template v-for="(_n, index) in activityData['dice']" >
      <Dice 
        :disabled="index >= activityData['available_dice']" 
        :rolling="rolling"/>
    </template>
  </div>

  <button @click="rolling = !rolling">Roll!</button>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.dice {
  flex-wrap: wrap;
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
</style>

