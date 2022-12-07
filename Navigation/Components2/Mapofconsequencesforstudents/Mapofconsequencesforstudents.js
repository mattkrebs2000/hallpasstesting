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

                {userdata.map((item, i) => {
                    return (
                        <View key={i}>

                            {item.classname === "There are no consequences." ? <View >
                                <Pressable>

                                    <Text style={styles.unselected}>You do not have a "Penalty" History.

                                    </Text>
                                </Pressable>


                            </View> :
                                <View >
                                    <Pressable
                                        style={
                                            item.id === idselected ? styles.selected : styles.unselected
                                        }
                                        onPress={() => selectHandler(item)}>
                                        <Text style={styles.unselected
                                        }>Penalty Number: {userdata.length - i}.{'\n'}{item.date} @ {item.timeeitwasmade}{'\n'}During: {item.coursename}{'\n'}For {Math.round(item.penaltyminutes)} minutes{'\n'}{item.code}</Text>
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