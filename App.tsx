import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View, Button, TextInput, TextInputChangeEventData, Image, Modal} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

type RootParamList = {
  Screen1: { post: string },
  Screen2: { paramA?: string },
  CreatePost: { post: string }
  ModalScreen: undefined
}

const Root = createStackNavigator<RootParamList>()

function LogoTitle({...props}) {
  return (
    <Image
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png'
      }}
      style={{width: 50, height: 50}}
    />
  )
}

export default function App() {
  return (
      <NavigationContainer>
        <Root.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#eee',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
        }} mode='modal'>
          <Root.Screen name="Screen1" component={Screen1} />
          <Root.Screen name="Screen2" component={Screen2} />
          <Root.Screen name="ModalScreen" component={ModalScreen} options={{headerShown: false}} />
          <Root.Screen
            name="CreatePost"
            component={CreatePost}
            options={{ headerTitle: props => <LogoTitle {...props} /> }}
          />
        </Root.Navigator>
      </NavigationContainer>
  );
}

type Screen1Props = StackScreenProps<RootParamList, 'Screen1'>

const Screen1 = ({navigation, route}: Screen1Props) => {
  const [count, setCount] = React.useState(0)

  React.useLayoutEffect(() => {
     navigation.setOptions({
       headerRight: () => (
         <Button onPress={() => setCount(c => c + 1)} title='Update count' />
       ),
       headerLeft: () => (
         <Button onPress={() => navigation.navigate({name: 'Screen2', params: {paramA: 'From home'}})} title='Screen2' />
       )
     })
  }, [navigation])

  React.useEffect(() => {
    if(route.params?.post)  {
      console.log(route.params?.post)
    }
  }, [route.params?.post])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title='Create post' onPress={() => navigation.navigate({name: 'CreatePost', params: {post: ''}})} />
      <Text style={{margin: 10}}>Post: {route.params?.post}</Text>
      <Text>Count: {count}</Text>
      <Button title='Go to ModalScren' onPress={() => navigation.navigate('ModalScreen')}  />
    </View>
  )
}

type TabParamsList = {
  Feed: undefined,
  Messages: undefined
}

const Tab = createBottomTabNavigator<TabParamsList>()

type FeedProps = StackScreenProps<TabParamsList, 'Feed'>

const Feed = ({navigation, route}:  FeedProps) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true
    })
  }, [navigation])
  return (
    <>
      <Text>Feed</Text>
    </>
  )
}

type MessagesProps = StackScreenProps<TabParamsList, 'Messages'>

const Messages = ({navigation, route}: MessagesProps) => {
  return (
    <View>
      <Text>Messages</Text>
    </View>
  )
}

type Screen2Props = StackScreenProps<TabParamsList>

const Screen2 = ({navigation, route}: Screen2Props) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])
  return (
    <Tab.Navigator tabBarOptions={{
      tabStyle: {
        justifyContent: 'center',
        alignItems: 'center'
      }
    }}>
      <Tab.Screen
        name='Feed'
        component={Feed}
      />
      <Tab.Screen name='Messages' component={Messages} />
    </Tab.Navigator>
  )
}

type Screen3Props = StackScreenProps<RootParamList, 'CreatePost'>

const CreatePost = ({navigation, route}: Screen3Props) => {
  const [postText, setPostText] = React.useState('')
  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind"
        style={{height: 200, padding: 10, backgroundColor: 'white'}}
        value={postText}
        onChangeText={text => setPostText(text)}
      />
      <Button
        title='Done'
        onPress={() => {
          navigation.navigate({
            name: 'Screen1',
            params: { post: postText },
          });
        }}
      />
    </>
  )
}

type ModalScreenProps = StackScreenProps<RootParamList, 'ModalScreen'>

const ModalScreen = ({navigation}: ModalScreenProps) => {
  return (
    <View>
      <Text>Modal</Text>
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  )
}