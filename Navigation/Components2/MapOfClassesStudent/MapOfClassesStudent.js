import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';


export default function Phonelessstudents({ setCoursename, userdata, id, idselected, setSelectedclass, selectedclass}) {


  // const selectHandler = (value) => {
  //   setSelectedclass(value);
  // };


  const selectHandler = (value) => {

    if (value.id != idselected){

      setSelectedclass(value);
   
    }
    else {
      setSelectedclass("");
    }
  };


  return (
                    
<ScrollView>
      {userdata.map((item) =>  {
        return (
          <View  key={item.id}>
            <View >
         { item.ledby === "Admin" ? <Pressable
            style={
              item.id === idselected ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            <Text style ={styles.unselected
            }> Location: {item.location}{'\n'} With: {item.teacheriscalled}</Text>
          </Pressable> :  <Pressable
            style={
              item.id === idselected ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            <Text style ={styles.unselected
            }> Period: {item.period}  {'\n'}Class: {item.classname} {'\n'} In Room: {item.location}{'\n'} With: {item.teacheriscalled}</Text>
          </Pressable> }
        
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

