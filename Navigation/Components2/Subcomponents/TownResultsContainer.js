import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { scale, ScaledSheet } from 'react-native-size-matters';
import Output from "./TownOutput";

import { auth, firebase } from "../../Firebase/Config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "@firebase/firestore";

const ResultsContainer = ({ filteredtowns, town, setTown, textsearchedtowns,setSearchingtowns, searchingtowns, newtownarray, setNewtownarray }) => {
  
  const [getpropertytown, setGetpropertytown] = useState([]);

  useEffect(() => {
    newarray = [];
    for (let i = 0; i < filteredtowns.length; i++) {
      newarray.push(filteredtowns[i].town)
    }
    console.log("HERE IS THE NEW ARRAY", newarray);
    setGetpropertytown(newarray);
  }, [filteredtowns]);


  useEffect(() => {

    const a = getpropertytown;

    function count_duplicate(a) {
      let counts = {};
      let array = [];

      for (let i = 0; i < a.length; i++) {
        if (counts[a[i]]) {
          counts[a[i]] += 1
        } else {
          array.push(a[i]);
          counts[a[i]] = 1
        }
      }
      console.log("YOO", array);
      setNewtownarray(array);
    }
    count_duplicate(a)
  }, [getpropertytown])


  return (

    newtownarray.length > 0 &&
    newtownarray.map((info, value) => (
      <View key={value}>
        {searchingtowns ?
          <View style={styles.container} key={value}>
            <TouchableOpacity onPress={
              () => { setSearchingtowns(false); setTown(info); }}>
              <Output
                town={info}
              />
            </TouchableOpacity>
          </View>

          : <View></View>}
      </View>
    ))

  )
};

export default ResultsContainer;

const styles = ScaledSheet.create({
  container: {
    height: 30,
    backgroundColor:  "#000", 
    alignItems: "center",
  },

});