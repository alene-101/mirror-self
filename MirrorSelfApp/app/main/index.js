import React from 'react';
import { View, Text } from 'react-native';

// require at runtime so we can surface a clearer error instead of "Element type is invalid"
export default function HomeRoute() {
  const mod = require('../../screens/HomeScreen');
  const HomeScreen = mod && (mod.default || mod.HomeScreen);

  if (!HomeScreen) {
    // helpful message in browser console
    // eslint-disable-next-line no-console
    console.warn('HomeScreen import resolved to:', mod);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home screen failed to load — check exports. See console for details.</Text>
      </View>
    );
  }

  return <HomeScreen />;
}