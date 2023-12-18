export interface UserData {
  id: number
  first_name: string
  last_name: string
  username: string
  language_code: string
  allows_write_to_pm: boolean
}

export interface Modifier {
  id: number,
  name: string,
  power: number,
  description: string
}

export interface ActivityData {
  id: number,
  character_id: string,
  role: string,
  description: string,
  status: string,
  available_dice: number,
  difficulty: number,
  dice: number,
  modifiers: Modifier[],
  abilities: Modifier[],
  type: string,
}

export interface ActivityResult {
  result: {},
  type: "success" | "failure",
  text: string,
} 