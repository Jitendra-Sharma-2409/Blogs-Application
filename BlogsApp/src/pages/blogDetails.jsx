import { View, Text, StyleSheet } from 'react-native'

// functional component
function BlogDetails() {
  return (
    <View style={styles.container}>
      <Text>Blog Details</Text>
    </View>
  )
}

// define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default BlogDetails
