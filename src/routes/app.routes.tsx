import { useStyled } from '@gluestack-style/react'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import House from 'phosphor-react-native/src/icons/House'
import SignOut from 'phosphor-react-native/src/icons/SignOut'
import Tag from 'phosphor-react-native/src/icons/Tag'

import { EditAdvert } from '@/screens/app/EditAdvert'
import { Empty } from '@/screens/app/Empty'
import { Home } from '@/screens/app/Home'
import { MyAdvertDetails } from '@/screens/app/MyAdvertDetails'
import { MyAdverts } from '@/screens/app/MyAdverts'
import { NewAdvert } from '@/screens/app/NewAdvert'
import { OthersAdvertDetails } from '@/screens/app/OthersAdvertDetails'
import { PreviewAdvert } from '@/screens/app/PreviewAdvert'

type AppRoutesProps = {
  home: undefined
  'my-advert-details': {
    id: string
  }
  'others-advert-details': {
    id: string
  }
  'my-adverts': undefined
  new: undefined
  preview: undefined
  edit: {
    id: string
  }
  'sign-out': undefined
}

export type AppNavigationRoutesProp = BottomTabNavigationProp<AppRoutesProps>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>()

export const AppRoutes = () => {
  const styled = useStyled()

  const { colors } = styled.config.tokens

  return (
    <Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray200,
        tabBarInactiveTintColor: colors.gray400,
        tabBarStyle: {
          display:
            route.name === 'my-advert-details' ||
            route.name === 'others-advert-details' ||
            route.name === 'edit' ||
            route.name === 'new' ||
            route.name === 'preview'
              ? 'none'
              : 'flex',
          backgroundColor: '#FFF',
          borderTopWidth: 0,
          height: 72,
        },
      })}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <House
              style={{ width: 88, height: 88 }}
              color={color}
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />
      <Screen
        name="others-advert-details"
        component={OthersAdvertDetails}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="my-advert-details"
        component={MyAdvertDetails}
        options={{ tabBarButton: () => null }}
      />
      <Screen
        name="my-adverts"
        component={MyAdverts}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Tag
              style={{ width: 88, height: 88 }}
              color={color}
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />

      <Screen
        name="edit"
        component={EditAdvert}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="new"
        component={NewAdvert}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="preview"
        component={PreviewAdvert}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="sign-out"
        component={Empty}
        options={{
          tabBarIcon: ({ focused }) => (
            <SignOut
              style={{ width: 88, height: 88 }}
              color={colors.redlight}
              weight={focused ? 'bold' : 'regular'}
            />
          ),
        }}
      />
    </Navigator>
  )
}
