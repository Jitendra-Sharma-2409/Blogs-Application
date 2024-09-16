import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../pages/login'
import Register from '../pages/register'
import ForgotPassword from '../pages/forgotPassword'
import MainNavigation from './main'
import AddBlog from '../pages/addBlog'
import CapturePhoto from '../components/capturePhoto'

const Stack = createNativeStackNavigator()

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        <Stack.Screen name='Main' component={MainNavigation} />
        <Stack.Screen name='Add' component={AddBlog} />
        <Stack.Screen name='Camera' component={CapturePhoto} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
