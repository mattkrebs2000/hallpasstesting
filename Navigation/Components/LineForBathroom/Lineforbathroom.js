import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';


export default function Phonelessstudents({ firstname, lastname, userdata, id, idselected, setSelectedclass, selectedclass}) {


  // const selectHandler = (value) => {
  //   setSelectedclass(value);
  // };

  return (
                    
<ScrollView>
      {userdata && userdata.map((item, i) =>  {
        return (
          <View  key={i}>
            <View >
        <Pressable
            style={
              id === item.studentid ? styles.selected : styles.unselected
            }
           >
            <Text style ={styles.unselected
            }> Name: {item.firstname} {item.lastname}{'\n'} Place in Line: {i+1}</Text>
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