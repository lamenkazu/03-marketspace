import { useStyled } from '@gluestack-style/react'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import House from 'phosphor-react-native/src/icons/House'
import SignOut from 'phosphor-react-native/src/icons/SignOut'
import Tag from 'phosphor-react-native/src/icons/Tag'

import { MyAdvertDetails } from '@/screens/app/Details/MyAdvertDetails'
import { OthersAdvertDetails } from '@/screens/app/Details/OthersAdvertDetails'
import { PreviewAdvert } from '@/screens/app/Details/PreviewAdvert'
import { Empty } from '@/screens/app/Empty'
import { EditAdvert } from '@/screens/app/Form/EditAdvert'
import { NewAdvert } from '@/screens/app/Form/NewAdvert'
import { Home } from '@/screens/app/Home'
import { MyAdverts } from '@/screens/app/MyAdverts'

type AppRoutesProps = {
  home: undefined
  'others-advert-details': {
    id: string
  }
  'my-adverts': undefined
  'my-advert-details': {
    id: string
  }
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
