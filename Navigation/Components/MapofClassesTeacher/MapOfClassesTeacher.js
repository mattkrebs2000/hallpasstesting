import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';


export default function Phonelessstudents({ setCoursename, userdata, deleteToDo, id, idselected, setSelectedclass, selectedclass, setClasstrue, classtrue, coursename}) {


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
             <Text style = {styles.unselected}>You Have no Registerd {'\n'}Classses right now.{'\n'}{'\n'}To Create One{'\n'}Return to Main Menu {'\n'}-then select-{'\n'}Create A Class
          </Text>
          </Pressable>
          </View> : item.classname.includes("Extra Help") ? <View >
          <Pressable
            style={
              item.id === idselected && item.classname === coursename ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            <Text style ={styles.unselected
            }>{item.classname}</Text>
            
          </Pressable>
          </View>: item.classname.includes("Detention") ? <View >
          <Pressable
            style={
              item.id === idselected && item.classname === coursename ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            <Text style ={styles.unselected
            }>{item.classname}</Text>
            
          </Pressable>
          <Text style={styles.unselected}>_________</Text>
          </View>: item.id === idselected && item.classname === coursename && item.donewithworkphonepassavailable ? <View >
          <Pressable
            style={
              item.id === idselected ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            <Text style ={styles.unselected
            }>Period: {item.period}  {'\n'}Class: {item.classname} {'\n'} In Room: {item.location}</Text><Text style={styles.disable}>Current Settings</Text><Text style={styles.unselected}>Class Duration: {item.lengthofclasses} minutes.{'\n'}Bathroom Pass: {item.timelimitnonbathroompass} minutes.{'\n'}Get Drink of Water: {item.drinkofwater} minutes.{'\n'}1-Way Hall Passes: {item.timelimitnonbathroompass} minutes.{'\n'}Phone Pass: {item.phonepassexclusivetime > 0 ? item.phonepassexclusivetime + " minutes." : "Not Accessible"}{'\n'}Done w/ Work Pass is Available</Text>
            
          </Pressable>
          </View>: item.id === idselected && item.classname === coursename && !item.donewithworkphonepassavailable ? <View >
          <Pressable
            style={
              item.id === idselected ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            <Text style ={styles.unselected
            }>Period: {item.period}  {'\n'}Class: {item.classname} {'\n'} In Room: {item.location}</Text><Text style={styles.disable}>Current Settings</Text><Text style={styles.unselected}>Class Duration: {item.lengthofclasses} minutes.{'\n'}Bathroom Pass: {item.timelimitnonbathroompass} minutes.{'\n'}Get Drink of Water: {item.drinkofwater} minutes.{'\n'}1-Way Hall Passes: {item.timelimitnonbathroompass} minutes.{'\n'}Phone Pass: {item.phonepassexclusivetime > 0 ? item.phonepassexclusivetime + " minutes." : "Not Accessible"}{'\n'}Done w/ Work Pass is Unavailable</Text>
            
          </Pressable>
          </View>:<View >
          <Pressable
            style={
              item.id === idselected & item.classname === coursename ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            <Text style ={styles.unselected
            }>Period: {item.period}  {'\n'}Class: {item.classname} {'\n'} In Room: {item.location}</Text>
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