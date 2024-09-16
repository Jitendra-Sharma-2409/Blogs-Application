import { View, Text, StyleSheet } from 'react-native'

// functional component
function SearchBlogs() {
  return (
    <View style={styles.container}>
      <Text>Search Blogs</Text>
    </View>
  )
}

// define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default SearchBlogs
