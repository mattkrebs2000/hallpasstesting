import React, { useState } from 'react';
import { ScrollView,View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';




export default function RadioButton({ first, answers, onSelect }) {


  const selectHandler = (value) => {
    onSelect(value);
    console.log(value, "This is the value");
  };

  return (
  <View>
      {answers.map((item) => {
        return (
         
            <View key={item.value}>
          <TouchableOpacity
            style={
              item.value === first ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item.value)}>
            <Text style = {
              item.value === first ? styles.selected : styles.unselected
            }> {item.value}</Text>
          </TouchableOpacity>
          </View>
        );
      })}
  </View>
  );
}


const styles = StyleSheet.create({
    option: {
      fontSize: 20,
      color: '#FF0000',
      textAlign: 'center',
    },
    unselected: {
      color: "#fff",
      backgroundColor: "#013469",
      margin: 6,
      fontSize: 20,
      borderRadius: 10,
      textAlign: "center",
      marginLeft: 10,
      marginRight: 10,

    },
    selected: {
      color: "#fff",
   backgroundColor: "#E43522",
      margin: 6,
      fontSize: 20,
      borderRadius: 10,
      textAlign: "center",
      marginLeft: 10,
      marginRight: 10,
    },
  });