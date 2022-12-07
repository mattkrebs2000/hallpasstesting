
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, LogBox} from 'react-native';
import { Navigation } from "./Navigation/Navigation"
import 'react-native-gesture-handler';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
