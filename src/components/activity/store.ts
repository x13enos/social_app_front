import { reactive } from 'vue'
import { ActivityData, Modifier, ActivityResult } from './types'

interface Store {
  activityData: ActivityData
  diceResults: { real: number[], with_modifiers: number[], successes: string[] }
  selectedDice: number[],
  state: string,
  activityResult: ActivityResult,
  removeModifier: (modifier: Modifier) => void
  cleanDiceResults: () => void,
  realDifficulty: () => number
}

export const store: Store = reactive({
  activityData: {} as ActivityData,
  diceResults: { real: [], with_modifiers: [], successes: [] },
  selectedDice: [],
  state: 'choosing',
  activityResult: {} as ActivityResult,
  removeModifier: removeModifier,
  cleanDiceResults: cleanDiceResults,
  realDifficulty: realDifficulty
})

function removeModifier(modifier: Modifier) {
  const index = store.activityData.modifiers.active.findIndex(m => m.name === modifier.name && m.power === modifier.power)
  store.activityData.modifiers.active.splice(index, 1)
}

function cleanDiceResults() {
  store.diceResults = { real: [], with_modifiers: [], successes: [] }
}

function realDifficulty() {
  let difficulty = store.activityData.difficulty
  store.activityData.modifiers.dice_success.forEach(modifier => {
    difficulty -= modifier.power
  })
  return difficulty
}