import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignIn from './screens/Auth/SignIn';

const App = () => {
  return (
    <SafeAreaProvider>
      <SignIn />
    </SafeAreaProvider>
  );
};

export default App;
