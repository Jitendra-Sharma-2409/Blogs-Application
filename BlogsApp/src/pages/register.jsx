import { Button, TextInput } from 'react-native-paper'
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { useState } from 'react'
import { register } from '../services/user'

// functional component
function Register({ navigation }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')

  const onRegister = async () => {
    if (firstName.length == 0) {
      ToastAndroid.show('Please enter first name', ToastAndroid.SHORT)
    } else if (lastName.length == 0) {
      ToastAndroid.show('Please enter last name', ToastAndroid.SHORT)
    } else if (email.length == 0) {
      ToastAndroid.show('Please enter email', ToastAndroid.SHORT)
    } else if (password.length == 0) {
      ToastAndroid.show('Please enter password', ToastAndroid.SHORT)
    } else if (confirmPassword.length == 0) {
      ToastAndroid.show('Please confirm password', ToastAndroid.SHORT)
    } else if (password != confirmPassword) {
      ToastAndroid.show('Password does not match', ToastAndroid.SHORT)
    } else {
      const result = await register(firstName, lastName, email, password, phone)
      if (result['status'] == 'success') {
        navigation.pop()
      } else {
        console.log(result['error'])
      }
    }
  }

  const onLogin = () => {
    // go back to the prev screen
    navigation.pop()
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.5,
          backgroundColor: '#49a3f8',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.header}>Register</Text>
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => setFirstName(text)}
            style={styles.input}
            label='First Name'
            mode='outlined'
          />

          <TextInput
            onChangeText={(text) => setLastName(text)}
            style={styles.input}
            label='Last Name'
            mode='outlined'
          />

          <TextInput
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            label='Email'
            keyboardType='email-address'
            mode='outlined'
          />

          <TextInput
            onChangeText={(text) => setPhone(text)}
            style={styles.input}
            label='Phone Number'
            keyboardType='phone-pad'
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

          <TextInput
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={true}
            style={styles.input}
            label='Confirm Password'
            mode='outlined'
            right={<TextInput.Icon icon='eye' />}
          />

          <Button
            onPress={onRegister}
            style={{ backgroundColor: '#49a3f8', marginTop: 20 }}
            mode='contained'
          >
            Register
          </Button>
          <TouchableOpacity
            onPress={onLogin}
            activeOpacity={0.7}
            style={{ alignItems: 'center', marginTop: 10 }}
          >
            <Text style={{ fontWeight: '500', fontSize: 15 }}>
              Already have an account? Login here
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
    marginBottom: 10,
    backgroundColor: 'white',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },
})

export default Register
