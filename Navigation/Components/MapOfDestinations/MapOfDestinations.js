import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

export default function Phonelessstudents({ Currentlocation, Teacherdestination, setCoursenamedestination, seconddata, id, Idselecteddestination, setSelectedclassdestination, Selectedclass, newlocation, disable, disabledonewithworkphonepass, classisover, ledby}) {

  // const selectHandler = (value) => {
  //   setSelectedclassdestination(value);
  // };

  const selectHandler = (value) => {

    if (value.id != Idselecteddestination) {

      setSelectedclassdestination(value);
   
    }
    else {
      setSelectedclassdestination("");
    }
  };

  return (
                    
<ScrollView>
      {seconddata.map((item) =>  {
          console.log(item.location)
        return (
          <View key={item.id}>
         
          {(classisover === false || typeof classisover === "undefined") && newlocation && disable && disabledonewithworkphonepass ? <Pressable
            style={
              item.id === Idselecteddestination ? styles.selected : styles.unselected
            }
            onPress={item.location === "Break From Work Pass " || item.location === "Done with work Phone Pass" ? null : () => selectHandler(item) }>
            { item.location === newlocation  || item.location === "Bathroom" || item.location === "Get Drink of Water" ? <Text style ={styles.unselected}>{item.location}</Text> : item.location === "Break From Work Pass " || item.location === "Done with work Phone Pass" ? <Text style ={styles.disable}>{item.location}</Text> : <Text style ={styles.unselected
            }>{item.teacheriscalled} - {item.location}</Text> }
          </Pressable> : (classisover === false || typeof classisover === "undefined") && !newlocation && disable && disabledonewithworkphonepass ?  <Pressable
            style={
              item.id === Idselecteddestination ? styles.selected : styles.unselected
            }
            onPress={item.location === "Break From Work Pass " || item.location === "Done with work Phone Pass"  ? null : () => selectHandler(item) }>
            {item.location === "Bathroom" || item.location === "Get Drink of Water" ? <Text style ={styles.unselected}>{item.location}</Text> : item.location === "Break From Work Pass " || item.location === "Done with work Phone Pass" ?  <Text style ={styles.disable}>{item.location}</Text> : <Text style ={styles.unselected
            }>{item.teacheriscalled} - {item.location}</Text> }
          </Pressable> : (classisover === false || typeof classisover === "undefined") && newlocation && !disable && disabledonewithworkphonepass ? <Pressable
            style={
              item.id === Idselecteddestination ? styles.selected : styles.unselected
            }
            onPress={item.location === "Done with work Phone Pass" ? null : () => selectHandler(item) }>
            {item.location === newlocation || item.location === "Bathroom" || item.location === "Get Drink of Water" ||item.location === "Break From Work Pass " ?  <Text style ={styles.unselected
            }>{item.location}</Text> : item.location === "Done with work Phone Pass" ?  <Text style ={styles.disable}>{item.location}</Text> :<Text style ={styles.unselected
            }>{item.teacheriscalled} - {item.location}</Text> }
          </Pressable>: (classisover === false || typeof classisover === "undefined") && !newlocation && !disable && disabledonewithworkphonepass ? <Pressable
            style={
              item.id === Idselecteddestination ? styles.selected : styles.unselected
            }
            onPress={item.location === "Done with work Phone Pass"  ? null : () => selectHandler(item) }>
            {item.location === "Bathroom" || item.location === "Get Drink of Water" || item.location === "Break From Work Pass " ? <Text style ={styles.unselected
            }>{item.location}</Text> : item.location === "Done with work Phone Pass" ?  <Text style ={styles.disable}>{item.location}</Text> : <Text style ={styles.unselected
            }>{item.teacheriscalled} - {item.location}</Text> }
          </Pressable>: (classisover === false || typeof classisover === "undefined") && newlocation && disable && !disabledonewithworkphonepass ? <Pressable
            style={
              item.id === Idselecteddestination ? styles.selected : styles.unselected
            }
            onPress={item.location === "Break From Work Pass " ? null : () => selectHandler(item) }>
            { item.location === newlocation  || item.location === "Bathroom" || item.location === "Get Drink of Water" ||item.location === "Done with work Phone Pass" ? <Text style ={styles.unselected}>{item.location}</Text> : item.location === "Break From Work Pass " ? <Text style ={styles.disable}>{item.location}</Text> : <Text style ={styles.unselected
            }>{item.teacheriscalled} - {item.location}</Text> }
          </Pressable> : (classisover === false || typeof classisover === "undefined") && !newlocation && disable && !disabledonewithworkphonepass ?  <Pressable
            style={
              item.id === Idselecteddestination ? styles.selected : styles.unselected
            }
            onPress={item.location === "Break From Work Pass " ? null : () => selectHandler(item) }>
            {item.location === "Bathroom" || item.location === "Get Drink of Water" || item.location === "Done with work Phone Pass" ? <Text style ={styles.unselected}>{item.location}</Text> : item.location === "Break From Work Pass " ?  <Text style ={styles.disable}>{item.location}</Text> : <Text style ={styles.unselected
            }>{item.teacheriscalled} - {item.location}</Text> }
          </Pressable> : (classisover === false || typeof classisover === "undefined") && newlocation && !disable && !disabledonewithworkphonepass ? <Pressable
            style={
              item.id === Idselecteddestination ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            {item.location === newlocation || item.location === "Bathroom" || item.location === "Get Drink of Water" || item.location === "Break From Work Pass " || item.location === "Done with work Phone Pass" ? <Text style ={styles.unselected
            }>{item.location}</Text> : <Text style ={styles.unselected
            }>{item.teacheriscalled} - {item.location}</Text> }
          </Pressable> : (classisover === false || typeof classisover === "undefined") && !newlocation && !disable && !disabledonewithworkphonepass ? <Pressable
            style={
              item.id === Idselecteddestination ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            {item.location === "Bathroom" || item.location === "Get Drink of Water" || item.location === "Break From Work Pass " || item.location === "Done with work Phone Pass" ? <Text style ={styles.unselected
            }>{item.location}</Text> : <Text style ={styles.unselected
            }>{item.teacheriscalled} - {item.location}</Text> }
          </Pressable> : ledby === "Admin" ? <View>{ item.ledby === "Admin" ? <Pressable
            style={
              item.id === Idselecteddestination ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            <Text style ={styles.unselected
            }> Location: {item.location}{'\n'} With: {item.teacheriscalled}</Text>
          </Pressable> :  <Pressable
            style={
              item.id === Idselecteddestination? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            <Text style ={styles.unselected
            }> Period: {item.period}  {'\n'}Class: {item.classname} {'\n'} In Room: {item.location}{'\n'} With: {item.teacheriscalled}</Text>
          </Pressable> }</View>: <Pressable
            style={
              item.id === Idselecteddestination ? styles.selected : styles.unselected
            }
            onPress={item.location === "Done with work Phone Pass" || item.location === "Break From Work Pass " ? () => selectHandler(item) : null }>
            {item.location === "Done with work Phone Pass" || item.location === "Break From Work Pass " ? <Text style ={styles.unselected}>{item.location}</Text> : <Text style ={styles.disable}>{item.location}</Text> }
          </Pressable> }
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
      backgroundColor: '#013469',
      color: "#999",
      textAlign: "center",
      fontSize: 17,
      margin: 6,
      flex: 1,
      textDecorationLine: 'line-through',
    
      },


});