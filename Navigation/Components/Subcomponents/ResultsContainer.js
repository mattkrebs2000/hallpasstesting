import React, { useEffect, useState } from "react";

import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import Output from "./Output";

import { auth, firebase } from "../../Firebase/Config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "@firebase/firestore";

const ResultsContainer = ({ textsearched, posts, email, username, school, setschool, setSearching, searching, number, setNumber, onlyadmin, setOnlyadmin }) => {
  const [getproperty, setGetproperty] = useState([]);

  useEffect(() => {
    newarray = [];
    for (let i = 0; i < posts.length; i++) {
      newarray.push(posts[i].school)
    }
    console.log("HERE IS THE NEW ARRAY", newarray);
    setGetproperty(newarray);
  }, [posts]);


  useEffect(() => {

    const a = getproperty;

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
      console.log("YOO", array.length, array, "YOO");
      setOnlyadmin(array);
    }
    count_duplicate(a)
  }, [getproperty])


  var occurrence = function (posts, school) {
    console.log("Hi", posts.length)
    let postss = [];
    for (let i in posts) {
      let match = false;
      let postt = posts[i];

      for (let prop in postt) {

        let lower = JSON.stringify(postt[prop]).toLowerCase();
        if (lower.match(school.toString().toLowerCase(), 1)) {
          match = true;
        }
      }
      if (match === true) {

        postss.push(postt)

      }
    }
    setNumber(postss.length)

  };



  useEffect(() => {
    occurrence(posts, school)
  }, [school])

  return (

    onlyadmin.length > 0 &&
    onlyadmin.map((info, value) => (
      <View key={value}>
        {searching ?
          <View style={styles.container} key={value}>
            <TouchableOpacity onPress={
              () => { setSearching(false); setschool(info);}}>
              <Output
                school={info}
                number={number}
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
    backgroundColor: "#000",
    alignItems: "center",
   
  },

});