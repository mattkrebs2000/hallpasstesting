import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';


export default function Phonelessstudents({  second,listofmadestudents ,originalschools, idselected, setSelectedschool}) {


  const selectHandler = (value) => {
      console.log("selected School was run", value, second, value.locallastname);
    setSelectedschool(value);
  };

 { return (
                    
<ScrollView>
      {second ? listofmadestudents.map((item) =>  {
        return (
          <View  key={item.id}>
       
        <TouchableOpacity
            style={
              item.id === idselected ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            <Text style ={
              item.id === idselected ? styles.selected : styles.unselected
            }>{item.localfirstname} {item.locallastname}{'\n'}Student of: {item.teacheraddingstudent}</Text>
          </TouchableOpacity>
        
  
          
          </View>
        );
      }) : originalschools.map((item) =>  {
        return (
          <View  key={item.id}>
       
        <TouchableOpacity
            style={
              item.id === idselected ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            <Text style ={
              item.id === idselected ? styles.selected : styles.unselected
            }>{item.school} {'\n'}{item.town} {'\n'}{item.state}</Text>
          </TouchableOpacity>
        
  
          
          </View>
        );
      })}     
      </ScrollView>

  ) }
}


const styles = StyleSheet.create({

  unselected: {
    color: "#FFF",
    backgroundColor: "#013469",
    margin: 6,
    fontSize: 17,
    borderRadius: 10,
    textAlign: "center",
    marginLeft: 25,
    marginRight: 25,
    flex: 1,
  

  },
  selected: {
    color: "#fff",
    backgroundColor: "#E43522",
    margin: 6,
    fontSize: 17,
    borderRadius: 10,
    textAlign: "center",
    marginLeft: 25,
    marginRight: 25,
    flex: 1
  },

});