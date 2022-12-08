import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';


export default function Phonelessstudents({ setCoursename, userdata, deleteToDo, id, idselected, setSelectedclass, selectedclass, setClasstrue, classtrue, classesarray, allclasses }) {

    const selectHandler = (value) => {

        if (value.id != idselected) {

            setSelectedclass(value);

        }
        else {
            setSelectedclass("");
        }
    };


        return (

            <ScrollView>

                {classesarray.map((item, i) => {
                    return (
                        <View key={i}>

                            {item.classname === "There are no consequences." ? <View >
                <Pressable>

                  <Text style={styles.unselected}>You do not have a "Pass" history{'\n'}And have not been marked as 'Tardy.'
                  </Text>
                </Pressable>


              </View> : item.destination === "Late to Class" ?
                <View >
                  <Pressable
                    style={
                      item.id === idselected ? styles.selected : styles.unselected
                    }
                    onPress={() => selectHandler(item)}>
                    <Text style={styles.unselected
                    }>Record Number: {userdata.length - i}.{'\n'}{item.coursename} - {item.destination}{'\n'}{new Date(item.leftclass).toString().substr(4, 11)} - {item.timereturned}{'\n'}{((Math.round(item.differenceoverorunderinminutes * 10)) / 10) * (-1)} minutes late.</Text>
                  </Pressable>
                </View> :
                <View>
                  <Pressable
                    style={
                      item.id === idselected ? styles.selected : styles.unselected
                    }
                    onPress={() => selectHandler(item)}>
                    <Text style={styles.unselected
                    }>Record Number: {userdata.length - i}.{'\n'}{new Date(item.leftclass).toString().substr(4, 11)} @ {item.timeleftclass}{'\n'}From: {item.coursename} {'\n'}Rule: {item.destination} - {item.timeallowedonpass} min.{'\n'}Time Returned: {item.timereturned}{'\n'}Over/Under Result {(Math.round(item.differenceoverorunderinminutes * 10)) / 10}</Text>
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