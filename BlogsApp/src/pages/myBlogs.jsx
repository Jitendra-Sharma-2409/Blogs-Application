import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Appbar, Icon } from 'react-native-paper'
import { getMyBlogs } from '../services/blogs'
import MyBlog from '../components/myBlog'

// functional component
function MyBlogs({ navigation }) {
  const [myBlogs, setMyBlogs] = useState([])

  const loadMyBlogs = async () => {
    const result = await getMyBlogs()
    if (result['status'] == 'success') {
      console.log(result['data'])
      setMyBlogs(result['data'])
    }
  }

  useEffect(() => {
    loadMyBlogs()
  }, [])

  const onAdd = () => {
    navigation.navigate('Add')
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title='My Blogs' />
        <Appbar.Action icon='plus' onPress={onAdd} />
        <Appbar.Action icon='refresh' onPress={loadMyBlogs} />
      </Appbar.Header>
      <View>
        {myBlogs.length > 0 && (
          <FlatList
            data={myBlogs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <MyBlog
                  onUpdate={loadMyBlogs}
                  navigation={navigator}
                  blog={item}
                />
              )
            }}
          />
        )}
        {myBlogs.length == 0 && (
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
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MyBlogs
