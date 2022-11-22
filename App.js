import { StyleSheet } from 'react-native';
import RootStack from './src/components/RootStackComponent';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store/config';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import BottomTabs from './src/components/BottomTabsComponent';

export default function App() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <BottomTabs></BottomTabs>
          {/* <RootStack style={styles.container}/>  */}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 60,
    margin: 10
  },
});
