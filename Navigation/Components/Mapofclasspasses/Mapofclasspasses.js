import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';


export default function Phonelessstudents({ setCoursename, userdata, deleteToDo, id, idselected, setSelectedclass, selectedclass, setClasstrue, classtrue, classesarray, localpercent, setTest, test }) {

  

  const selectHandler = (value) => {

    if (value.id != idselected) {
      setSelectedclass(value);
      setTest(0);
    }
    else {
      setSelectedclass("");
      setTest(1);
    }
  };
    return (

      <ScrollView>

        {userdata.map((item, i) => {
          return (
            <View key={i}>

              {item.classname === "You haven't Registered" ? <View >
                <Pressable>

                  <Text style={styles.unselected}>There are no passes yet.
                  </Text>
                </Pressable>


              </View> : item.destination === "Late to Class" ?
                <View >
                  <Pressable
                    style={
                      item.id === idselected ? styles.selected : styles.unselected
                    }
                    onPress={() => selectHandler(item)}>
                    <Text style={item.leftclass === 0 ? styles.begin : item.leftclass > 0 && item.returned === 0 ? styles.end : styles.unselected
                    }>{item.firstname} {item.lastname} - {item.destination}{'\n'}{new Date(item.leftclass).toString().substr(4, 11)} - {item.timereturned}{'\n'}{((Math.round(item.differenceoverorunderinminutes * 10)) / 10) * (-1)} minutes late.</Text>
                  </Pressable>
                </View> : item.timeleftclass === 0  ? <View>
                  <Pressable
                    style={
                      item.id === idselected ? styles.selected : styles.unselected
                    }
                    onPress={() => selectHandler(item)}>
                    <Text style={item.leftclass === 0 ? styles.begin : item.leftclass > 0 && item.returned === 0 ? styles.end : styles.unselected
                    }>{item.firstname} {item.lastname}{'\n'}This Pass Has Not Yet Begun.{'\n'}Rule: {item.destination} - {item.timeallowedonpass} min.{'\n'}Time Returned: {item.timereturned}{'\n'}Over/Under Result {(Math.round(item.differenceoverorunderinminutes * 10)) / 10}</Text>
                  </Pressable>


                </View> :
                <View>
                  <Pressable
                    style={
                      item.id === idselected ? styles.selected : styles.unselected
                    }
                    onPress={() => selectHandler(item)}>
                    <Text style={item.leftclass === 0 ? styles.begin : item.leftclass > 0 && item.returned === 0 ? styles.end : styles.unselected
                    }>{item.firstname} {item.lastname}{'\n'}{new Date(item.leftclass).toString().substr(4, 11)} @ {item.timeleftclass}{'\n'}Rule: {item.destination} - {item.timeallowedonpass} min.{'\n'}Time Returned: {item.timereturned}{'\n'}Over/Under Result {(Math.round(item.differenceoverorunderinminutes * 10)) / 10}</Text>
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
 begin: {
    backgroundColor: '#00FF00',
    textAlign: "center",
    fontSize: 17,
    margin: 6,
    flex: 1,
    color: "#000000",
    borderWidth: 3,
    borderColor: "#013469",
  },
  end: {
    backgroundColor: '#E43522',
    textAlign: "center",
    fontSize: 17,
    margin: 6,
    flex: 1,
    color: "#000000",
    borderWidth: 3,
    borderColor: "#013469",
  },
  selected: {
    color: "#ffffff",
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