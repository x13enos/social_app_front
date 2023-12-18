<script setup lang="ts">
import { store } from './store'
import { ref, Ref, inject } from 'vue'
import { Modifier } from './types';

const currentAbility: Ref<Modifier | null> = ref(null); currentAbility
const helped: Ref<boolean> = ref(false);
const axios: any = inject('axios')

const closeApp = () => {
  // @ts-ignore: Unreachable code error
  Telegram.WebApp.close()
}
const help = async () => {
  const response = await axios.post("/modifiers", {
    activity_id: store.activityData.id,
    character_id: store.activityData.character_id,
    ability: {
      name: currentAbility.value?.name,
      power: currentAbility.value?.power
    }
  })
  store.activityData.abilities = response.data;
  helped.value = true;
}
</script>

<template>
  <b>Description: </b> {{ store.activityData?.description }} <br />
  <b>Difficulty: </b> {{ store.activityData?.difficulty }} <br />

  <h3 v-if="helped">Thank you for helping!</h3>
  <div class="mt-2">
    <template v-if="store.activityData.abilities.length">
      <h3 class="italic">As {{ store.activityData.role }} you can help with any of your abilities:</h3>
      <ul class="grid w-full gap-6 md:grid-cols-2">
        <li v-for="ability in store.activityData.abilities" :key="ability.name">
          <input type="radio" :id="ability.name" v-model="currentAbility" :value="ability" class="hidden peer" required>
          <label :for="ability.name" class="radio-label">
            {{ ability.name }} {{ ability.power > 1 ? `+${ability.power}` : "" }}
          </label>
        </li>
      </ul>

      <button :disabled="!currentAbility" :class="{ 'btn-disabled': !currentAbility }" class="btn" @click="help">
        Help
      </button>
    </template>
    <template v-else>
      <h3 class="italic">Unfortunately, all your {{ store.activityData.role }} abilities on cooldown right now.</h3>
      <button @click="closeApp" class="btn btn-outline-blue">Close</button>
    </template>
  </div>
</template>

<style scoped>
.radio-label {
  @apply mt-2 block px-3 py-2 text-center border-slate-800 border cursor-pointer font-semibold rounded peer-checked:bg-blue-400 peer-checked:text-white peer-checked:border-transparent;
}
</style>
