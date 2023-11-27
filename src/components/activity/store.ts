import { reactive } from 'vue'
import { ActivityData, RollResults, Modifier } from './types'

interface Store {
  activityData: ActivityData
  diceResults: number[],
  selectedDice: number[],
  rollResults: RollResults,
  state: string,
  removeModifier: (modifier: Modifier) => void
}

export const store: Store = reactive({
  activityData: {} as ActivityData,
  diceResults: [],
  selectedDice: [],
  rollResults: {} as RollResults,
  state: 'choosing',
  removeModifier: removeModifier
})

function removeModifier(modifier: Modifier) {
  // find modifier by name and modifier and remove this from store.activityData.modifiers
  const index = store.activityData.modifiers.findIndex(m => m.name === modifier.name && m.modifier === modifier.modifier)
  store.activityData.modifiers.splice(index, 1)
}