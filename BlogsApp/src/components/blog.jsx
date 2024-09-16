import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import { Card } from 'react-native-paper'
import { config } from '../config'
import moment from 'moment'

function Blog({ blog, navigation }) {
  const prepareContents = (contents) => {
    return contents.length > 100 ? contents.substring(0, 100) + '...' : contents
  }

  const getImageUrl = () => {
    return `${config.server}/image/${blog.image}`
  }

  return (
    <View style={{ marginVertical: 10 }}>
      <Card>
        <Card.Cover source={{ uri: getImageUrl() }} />

        <Card.Title title={blog.BlogTitle} />

        <Card.Content>
          <Text>{prepareContents(blog.contents)}</Text>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.username}>
              Created by {blog.firstName} {blog.lastName}
            </Text>
            <Text style={styles.category}>{blog.CategoryTitle}</Text>
          </View>
          <Text>Created {moment(blog.createdTimestamp).local().fromNow()}</Text>
        </Card.Content>
      </Card>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {},
  category: {
    backgroundColor: '#5cc9f5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    color: 'white',
  },
  username: {
    fontWeight: '500',
  },
})

export default Blog
