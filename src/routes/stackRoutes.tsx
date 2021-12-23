import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../pages/Home'
import { Detail } from '../pages/Detail'
import { Search } from '../pages/Search'
import { Platform } from '../pages/Platform'

const Stack = createNativeStackNavigator()

export const StackRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ headerShown: false, title: 'Detalhes' }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Sua busca',
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff'
          },
          headerStyle: {
            backgroundColor: '#141A29'
          }
        }}
      />
      <Stack.Screen
        name="Platform"
        component={Platform}
        options={{
          title: 'Plataformas',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#141A29'
          }
        }}
      />
    </Stack.Navigator>
  )
}
