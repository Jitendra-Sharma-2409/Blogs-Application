import { Button, Icon, IconButton, Switch } from 'react-native-paper'
import { config } from '../config'
import { View, StyleSheet, Image, Text, ToastAndroid } from 'react-native'
import { useState } from 'react'
import { toggleBlogPublicStatus } from '../services/blogs'

function MyBlog({ blog, navigation, onUpdate }) {
  const [status, setStatus] = useState(blog.isPublic == 1)

  const getImageUrl = () => {
    return `${config.server}/image/${blog.image}`
  }

  const toggleStatus = async () => {
    const result = await toggleBlogPublicStatus(blog.id, !status)
    if (result['status'] == 'success') {
      ToastAndroid.show('Successfully updated the status', ToastAndroid.SHORT)
      setStatus(!status)

      // ask the parent to reload the blogs list
      onUpdate()
    } else {
      ToastAndroid.show('Error while updating the status', ToastAndroid.SHORT)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={{ uri: getImageUrl() }} />
        <View style={{ justifyContent: 'center' }}>
          <Text>{blog.BlogTitle}</Text>
          <Text>{blog.CategoryTitle}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Switch value={status} onValueChange={toggleStatus} />
            {blog.isPublic == 1 && <Text style={styles.public}>Public</Text>}
            {blog.isPublic == 0 && <Text style={styles.private}>Private</Text>}
            <IconButton icon='delete' iconColor='red' />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  innerContainer: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  private: {
    backgroundColor: 'red',
    color: 'white',
    padding: 10,
    borderRadius: 10,
  },
  public: {
    backgroundColor: 'green',
    color: 'white',
    padding: 10,
    borderRadius: 10,
  },
})

export default MyBlog
