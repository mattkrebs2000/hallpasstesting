import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

export default function Phonelessstudents({setIdselected, idselected, userdata, deleteToDo, id, setSelected, selected}) {


    const selectHandler = (value) => {
      if (value.id != idselected) {
        setSelected(value);
      } else {
        setSelected("");
      }
        
      };

  return (
                    
<ScrollView>
      {userdata.map((item) =>  {
         
        return (
         
          <View  key={item.id}>
            <View >
          <Pressable
            style={
              item.id === idselected ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item)}>
            <Text style ={styles.unselected
            }>{item.localfirstname} {item.locallastname}</Text>
          </Pressable>
         
          
          </View>
          </View>
        );
      })}
      </ScrollView>

  );
}


const styles = StyleSheet.create({

  unselected: {
    backgroundColor: '#013469',
    textAlign: "center",
    fontSize: 17,
    margin: 6,
    flex: 1, 
    color: "#ffffff",
    borderWidth: 3,
    borderColor: "#013469",
  },
  selected: {
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
    flex: 1
  },

});