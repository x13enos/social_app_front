<script setup lang="ts">
import { store } from '@activity/store'
import { ref, computed } from 'vue'

const { activityData } = store;
const { active, dice_result, dice_success } = activityData.modifiers;

const modifiersNumber = active.length + dice_result.length + dice_success.length;
const showModifiers = ref(false);

const icon = computed(() => {
  if (showModifiers.value) {
    return "fa-regular fa-circle-up"
  } else {
    return "fa-regular fa-circle-down"
  }
})
</script>

<template>
  <div v-if="modifiersNumber > 0">
    <b>Modifiers:</b> {{ modifiersNumber }}
    <font-awesome-icon :icon="icon" size="lg" class="ml-2 cursor-pointer" @click="showModifiers = !showModifiers" />
    <div v-if="showModifiers" class="modifier-block border-t-2 p-2">
      <div v-if="active.length > 0">
        <b>Active: </b>
        <span v-for="modifier in active" :key="modifier.name">
          {{ modifier.description }}({{ modifier.power }})
        </span>
      </div>
      <div v-if="dice_result.length > 0 || dice_success.length > 0">
        <b>Passive: </b>
        {{ dice_result.concat(dice_success).map(i => `${i.description}(${i.power})`).join(", ") }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.modifier-block {
  background-color: #e5e7eb;
}
</style>