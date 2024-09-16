import { Button, TextInput } from 'react-native-paper'
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { useState } from 'react'
import { login } from '../services/user'
import { setCache } from '../auth'

// functional component
function Login({ navigation }) {
  const [email, setEmail] = useState('amit@test.com')
  const [password, setPassword] = useState('test')

  const onForgotPassword = () => {
    navigation.navigate('ForgotPassword')
  }

  const onRegister = () => {
    navigation.navigate('Register')
  }

  const onLogin = async () => {
    if (email.length == 0) {
      ToastAndroid.show('Please enter email', ToastAndroid.SHORT)
    } else if (password.length == 0) {
      ToastAndroid.show('Please enter password', ToastAndroid.SHORT)
    } else {
      const result = await login(email, password)
      if (result['status'] == 'success') {
        ToastAndroid.show(
          'Welcome to the blogs application',
          ToastAndroid.SHORT
        )

        // read  all the properties
        const { token, firstName, lastName, phone } = result['data']

        // cache the basic user properties
        setCache(token, firstName, lastName, phone)

        // go to the main screen (bottom tab navigation)
        navigation.replace('Main')
      } else {
        ToastAndroid.show(result['error'], ToastAndroid.SHORT)
      }
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#49a3f8',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.header}>Login</Text>
        <Text style={[styles.header, { fontSize: 20 }]}>Welcome back!</Text>
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            label='Email'
            mode='outlined'
          />
          <TextInput
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.input}
            label='Password'
            mode='outlined'
            right={<TextInput.Icon icon='eye' />}
          />
          <TouchableOpacity
            onPress={onForgotPassword}
            activeOpacity={0.7}
            style={{ alignItems: 'flex-end' }}
          >
            <Text>Forgot password ?</Text>
          </TouchableOpacity>
          <Button
            onPress={onLogin}
            style={{ backgroundColor: '#49a3f8', marginTop: 20 }}
            mode='contained'
          >
            Login
          </Button>
          <TouchableOpacity
            onPress={onRegister}
            activeOpacity={0.7}
            style={{ alignItems: 'center', marginTop: 10 }}
          >
            <Text style={{ fontWeight: '500', fontSize: 15 }}>
              Don't have an account yet? Register here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

// define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: -20,
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },
})

export default Login
