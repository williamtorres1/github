import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Search } from '../pages/Search';
import { Profile } from '../pages/Profile';
import { Repos } from '../pages/Repos';
import { Stars } from '../pages/Stars';

const { Navigator, Screen } = createStackNavigator();

export const AppRoutes: React.FC = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="Search" component={Search} />
    <Screen name="Profile" component={Profile} />
    <Screen name="Repos" component={Repos} />
    <Screen name="Stars" component={Stars} />
  </Navigator>
);
