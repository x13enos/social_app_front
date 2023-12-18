import { reactive } from 'vue'
import { ActivityData, Modifier, ActivityResult } from './types'

interface Store {
  activityData: ActivityData
  diceResults: number[],
  selectedDice: number[],
  state: string,
  activityResult: ActivityResult,
  removeModifier: (modifier: Modifier) => void
}

export const store: Store = reactive({
  activityData: {} as ActivityData,
  diceResults: [],
  selectedDice: [],
  state: 'choosing',
  activityResult: {} as ActivityResult,
  removeModifier: removeModifier
})

function removeModifier(modifier: Modifier) {
  // find modifier by name and modifier and remove this from store.activityData.modifiers
  const index = store.activityData.modifiers.findIndex(m => m.name === modifier.name && m.power === modifier.power)
  store.activityData.modifiers.splice(index, 1)
}