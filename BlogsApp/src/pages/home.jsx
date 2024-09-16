import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { getPublicBlogs } from '../services/blogs'
import Blog from '../components/blog'
import { Appbar, Icon } from 'react-native-paper'

// functional component
function Home({ navigation }) {
  const [blogs, setBlogs] = useState([])

  const loadPublicBlogs = async () => {
    const result = await getPublicBlogs()
    if (result['status'] == 'success') {
      console.log(result['data'])
      setBlogs(result['data'])
    }
  }

  useEffect(() => {
    loadPublicBlogs()
  }, [])

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title='Home' />
        <Appbar.Action icon='refresh' onPress={loadPublicBlogs} />
      </Appbar.Header>
      <View style={{ padding: 16 }}>
        {blogs.length > 0 && (
          <FlatList
            style={{ marginBottom: 100 }}
            data={blogs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <Blog blog={item} navigation={navigation} />
            }}
          />
        )}

        {blogs.length == 0 && (
          <View style={styles.empty}>
            <Icon
              source='flask-round-bottom-empty-outline'
              color='black'
              size={200}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              There are no blogs at the moment
            </Text>
            <Text style={{ fontSize: 18 }}>Please try later</Text>
          </View>
        )}
      </View>
    </View>
  )
}

// define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Home
