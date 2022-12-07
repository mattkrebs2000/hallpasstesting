import React, { useEffect, useState } from "react";

import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import Output from "./StateOutput";

import { auth, firebase } from "../../Firebase/Config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "@firebase/firestore";

const ResultsContainer = ({ filteredstates, state, setState, stateArray, textsearchedstates, setSearchingstate, searchingstate, number, setNumber, newstatearray, setNewstatearray }) => {




    useEffect(() => {
        if(state.length > 0) {
            setSearchingstate(true);
        }else {
            setSearchingstate(false);
        }
      }, [filteredstates])

  return (

    filteredstates.length > 0 &&
    filteredstates.map((info, value) => (
      <View key={value}>
        {searchingstate ?
          <View style={styles.container}>
            <TouchableOpacity onPress={
              () => { setSearchingstate(false); setState(info.name)}}>
              <Output
                state = {info.name}
              />
            </TouchableOpacity>
          </View>

          : <View></View>}
      </View>
    ))

  )
};

export default ResultsContainer;

const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor:"#000", 
    alignItems: "center",
  },

});