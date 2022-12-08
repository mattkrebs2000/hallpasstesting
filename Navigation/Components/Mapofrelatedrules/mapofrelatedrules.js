import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';


export default function Phonelessstudents({ setCoursename, userdata, deleteToDo, id, idselected, setSelectedclass, selectedclass, setClasstrue, classtrue}) {


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

      {userdata.map((item, i) =>  {
        return (
          <View  key={i}>
           {item.classname === "You haven't Registered" ? <View >
          <Pressable>
             <Text style = {styles.unselected}>For This Class{'\n'}Your Teacher Has Not Connected{'\n'}Any Specific Rules To This App.
          </Text>
          </Pressable>
          </View>: item.id === idselected ? <View >
          <Pressable
            style={
              item.id === idselected ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            <Text style ={styles.unselected
            }>{item.code}{'\n'}{'\n'} {item.description}</Text>
            
          </Pressable>
          </View>: <View >
          <Pressable
            style={
              item.id === idselected ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            <Text style ={styles.unselected
            }>{item.code}</Text>
          </Pressable>
          </View>}
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

  disable: {
   
    color: "#FFF",
    textAlign: "center",
    fontSize: 17,
    marginTop: 10,
  
 
    textDecorationLine: 'underline',
  
    },


});