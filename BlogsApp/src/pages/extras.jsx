import { View, Text, StyleSheet } from 'react-native'
import { Appbar, Button } from 'react-native-paper'

// functional component
function Extras({ navigation }) {
  const onLogout = () => {
    navigation.replace('Login')
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title='My Blogs' />
      </Appbar.Header>

      <View style={{ padding: 16 }}>
        <Button style={{ marginTop: 20 }} onPress={onLogout} mode='contained'>
          Logout
        </Button>
      </View>
    </View>
  )
}

// define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})

export default Extras
