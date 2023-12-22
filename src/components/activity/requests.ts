import axios from 'axios';
import { store } from './store'
import { Modifier } from './types'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const rollDice = async () => {
  store.state = 'rolling'
  const params = {
    activity_id: store.activityData["id"],
    character_id: store.activityData["character_id"],
    dice_numbers: store.selectedDice
  }
  const response = await instance.put(`/activities/roll_dice`, params)
  store.diceResults = response.data.dice_results;
  store.activityResult = response.data.activity_result;
  setTimeout(() => {
    store.selectedDice = [];
    if (store.activityResult?.type === 'success' || store.activityData["modifiers"].length === 0)
      store.state = 'resolved';
    else
      store.state = 'modifying';
  }, 1000)
}

export const rerollDice = async (modifier: Modifier) => {
  store.state = 'rolling'
  const params = {
    modifier_data: {
      values: store.selectedDice,
      character_id: store.activityData["character_id"]
    }
  }
  const response = await instance.put(`/modifiers/${modifier.id}`, params)
  store.diceResults = response.data.dice_results;
  store.activityResult = response.data.activity_result;
  store.removeModifier(modifier);
  setTimeout(() => {
    store.state = store.activityData["modifiers"].length ? 'modifying' : 'resolved';
  }, 1000)
}

export const resolve = async () => {
  const params = {
    character_id: store.activityData["character_id"],
  }
  const response = await instance.put(`/activities/${store.activityData["id"]}`, params)
  store.activityResult = response.data;
  store.state = 'resolved';
}