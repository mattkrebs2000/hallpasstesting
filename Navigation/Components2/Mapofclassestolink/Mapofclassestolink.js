import React, { useState } from 'react';
import { ScrollView,View, Text, Pressable, StyleSheet, TouchableOpacity, seconddata } from 'react-native';




export default function RadioButton({ seconddata, id, setSelectedclass, selectedclass, idselected, classname }) {

    const selectHandler = (value) => {

        if (value.id != idselected){
    
          setSelectedclass(value);
       
        }
        else {
          setSelectedclass("");
        }
      };
  return (
  <View>
      {seconddata.map((item) => {
        return (
         
            <View key={item.id}>
          <Pressable
            style={
              item.id === idselected ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item)}>
            <Text style ={styles.unselected
            }> {item.classname}</Text>
          </Pressable>
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
      borderWidth: 3,
      borderColor: "#013469",

    },
    selected: 
{
    color: "#fff",
    backgroundColor: "#013469",
    borderWidth: 3,
    borderColor: "#E43522",
    margin: 6,
    fontSize: 20,
    borderRadius: 20,
    textAlign: "center",
    marginLeft: 25,
    marginRight: 25,
}
  });