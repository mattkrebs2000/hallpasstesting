import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, LogBox} from 'react-native';
import { Navigation } from "./Navigation/Navigation";


const App2 = () => {

LogBox.ignoreAllLogs();

  return (
      <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
   
   
  },
});

 export default App2;