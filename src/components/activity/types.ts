export interface UserData {
  id: number
  first_name: string
  last_name: string
  username: string
  language_code: string
  allows_write_to_pm: boolean
}

export interface RollResults {
  dice_results?: number[],
  activity_result?: {
    text: string,
    type: 'success' | 'failure'
  }
}

export interface Modifier {
  name: string,
  modifier: number,
  description: string
}

export interface ActivityData {
  id: number,
  character_id: string,
  description: string,
  status: string,
  available_dice: number,
  difficulty: number,
  dice: number,
  modifiers: Modifier[]
}