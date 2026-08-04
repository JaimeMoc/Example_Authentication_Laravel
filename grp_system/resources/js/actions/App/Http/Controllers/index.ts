import SecurityController from './SecurityController'
import Settings from './Settings'

const Controllers = {
    SecurityController: Object.assign(SecurityController, SecurityController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers