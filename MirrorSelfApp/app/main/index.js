import React from 'react';
import { View, Text } from 'react-native';

// require at runtime so we can surface a clearer error instead of "Element type is invalid"
export default function HomeRoute() {
  const mod = require('../../screens/Home');
  const Home = mod && (mod.default || mod.Home);

  if (!Home) {
    // helpful message in browser console
    // eslint-disable-next-line no-console
    console.warn('Home import resolved to:', mod);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home failed to load — check exports. See console for details.</Text>
      </View>
    );
  }

  return <Home />;
}