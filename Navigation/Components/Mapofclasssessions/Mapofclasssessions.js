import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';


export default function Phonelessstudents({ setCoursename, userdata, deleteToDo, id, idselected, setSelectedclass, selectedclass, setClasstrue, classtrue}) {

//   useEffect(() => {
//     console.log(userdata.length, "This is the userdata")
// if (userdata.length === 1) {
// setSelectedclass(userdata)
// }
// console.log(userdata.length, "This is the userdata",selectedclass, userdata, "SEE THE USERDATA")
// }, []);

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
          
             <Text style = {styles.unselected}>There are no Sessions{'\n'}Associated with this class.{'\n'}{'\n'}To Create One{'\n'}Return to Main Menu {'\n'}-then select-{'\n'}Begin A New Class
            
          </Text>
          </Pressable>
         
          
          </View>:
            <View >
          <Pressable
            style={
              item.id === idselected ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item) }>
            <Text style ={styles.unselected
            }> Class Number: {userdata.length - i}.{'\n'}{item.status} {'\n'}Began at {item.classbegin}{'\n'}on {item.todaysdate}.{'\n'}{item.lengthofclass} minute class.{'\n'}{(item.passesnolongeravailable - item.classbeginnumber)/60000} minute class.</Text>
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

});