import React from "react";
import { StyleSheet, View, Text,Image} from "react-native";

import { AppLoading, Font } from "expo";

const Output = ({ town }) => {

    
  return (
  <View>
    <View style= {styles.container}>
     <Text style={styles.text} >{town}</Text>
    </View>
  </View>
  )};

export default Output;

const styles = StyleSheet.create({
  container: {
   width:280,
   height: 40,
   alignItems: "center"
  
  }, 
  text: {

    backgroundColor: '#013469',
    margin: 10,
    fontSize: 15,
    width: "70%",
    borderColor: "#E43522",
    borderWidth: 2,
    color: "#fff",
    borderRadius: 10,
    textAlign: "center",

  }
});