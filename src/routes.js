import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Login from './pages/Login'
import Profile from './pages/Profile'

const Routes = createAppContainer(
    createStackNavigator({
        Login,
        Profile,
    })
)

export default Routes