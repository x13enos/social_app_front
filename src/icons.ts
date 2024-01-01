import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSpinner,
  faHouse,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'

import {
  faCircleDown,
  faCircleUp,
} from '@fortawesome/free-regular-svg-icons'

export function addIcons() {
  library.add(faSpinner)
  library.add(faHouse)
  library.add(faCheck)
  library.add(faCircleDown)
  library.add(faCircleUp)
}