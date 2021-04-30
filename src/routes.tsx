import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Login from './pages/Login';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Repos from './pages/Repos';
import Stars from './pages/Stars';

const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Search" component={Search} />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Repos" component={Repos} />
          <Drawer.Screen name="Stars" component={Stars} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
