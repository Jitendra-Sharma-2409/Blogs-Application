import { View, Text, StyleSheet } from 'react-native'

// functional component
function ForgotPassword() {
  return (
    <View style={styles.container}>
      <Text>Forgot Password</Text>
    </View>
  )
}

// define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ForgotPassword
