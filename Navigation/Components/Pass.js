import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Pressable, ScrollView, Text, View, StyleSheet, Button, TouchableHighlight, LogBox } from 'react-native';

import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, arrayUnion, FieldValue } from "@firebase/firestore";

import { auth, firebase } from "../Firebase/Config";




export default function App3({ route, navigation }) {

  LogBox.ignoreAllLogs();

  const { teacherid, coursename, classid, teacher, Selectedclassdestination, youcangetpass, section, currentlocation, school, state, town, locationdestination, firstname, lastname, userinformation, ledby, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, currentsessionid, bathroompassinuse, totalinlineforbathroom, id, passid, teacheridforreturn, leftclass, expectedreturn, maxstudentsonphonepass, newlocation, timeallowed, adjustmentandoverunder, total2, getcurrentdifference, realtimeleave, rightnow, currentdate, endofclasssession } = route.params;

  console.log(id, "id", passid, "getexistingpassid", school, "school", state, "state", town, "town", firstname, "firstname", lastname, "lastname", classid, "passclassid", currentsessionid, "passclasssessionid", currentlocation, "passlocation", coursename, "passcoursename", locationdestination, "passdestination", bathroomtime, "timeallowed", teacheridforreturn, "passteacheridreturn", teacherid, "teacheridfrompass", timeallowed, "timeallowed", expectedreturn, "expectedreturnfrompass", rightnow, "passrightnow", currentdate, "passcurrentdate", realtimeleave, "passrealtimeleave", "HEEEEYEEYEE THIS IS ALL THAT IT GETS")

  const [currentdifference, setCurrentdifference] = useState(0);

  const [day, setDay] = useState("");

  const [leavetimeGlobal, setLeavetimeGlobal] = useState();

  const [leftclass2, setLeftclass2] = useState();
  const [rightnow2, setRightnow2] = useState();
  const [sound, setSound] = React.useState();



  useEffect(() => {
    playSound();
    console.log(expectedreturn, "THIIS IS THE EXPECTED RETURN!!!!")
    var ac = new Date();
    setRightnow2(ac);

  }, []);

  useEffect(() => {
    console.log(expectedreturn, "expectedreturn, Expectedreturn")

  }, [expectedreturn]);

  useEffect(() => {

    if (coursename) {
      navigation.setOptions({
        headerLeft: () => (
          <Pressable>
            <Text accessibilityLabel="Guest" style={styles.error5}>
            </Text>
          </Pressable>
        ),
      });
    }

  }, []);


  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/Confirm.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  }


  useEffect(() => {
    console.log("How often is this run")
    setLeavetimeGlobal(rightnow2);
    setLeftclass2(leftclass);

  }, [expectedreturn, rightnow2]);

  useEffect(() => {
    if (leavetimeGlobal) {
      dayofweekFinder();
    }
  }, [leavetimeGlobal]);


  const dayofweekFinder = () => {
    switch (leavetimeGlobal.getDay()) {
      case 1:
        return (
          setDay("Monday")
        );
      case 2:
        return (
          setDay("Tuesday")
        );
      case 3:
        return (
          setDay("Wednesday")
        );
      case 4:
        return (
          setDay("Thursday")
        );
      case 5:
        return (
          setDay("Friday")
        );
      case 6:
        return (
          setDay("Saturday")
        );
      case 0:
        return (

          setDay("Sunday")

        );
    }
  };

  const ComputeTimeOut = () => {
    let g = Date.now();
    const v = ((g - rightnow) / 60000);

    setCurrentdifference(v);
    setTimeout(() => {
      setCurrentdifference(0);
    }, 5000);
  }


  return (
    <View style={locationdestination.includes("urse") ? styles.container2 : styles.container}>

      <View style={locationdestination.includes("urse") ? styles.sectionA2 : styles.sectionA}>

        <View style={locationdestination.includes("urse") ? styles.barcodebox2 : styles.barcodebox}>

          {locationdestination === "Done with work Phone Pass" ? <Text style={styles.paragraph}>{'\n'}
            {school}
            {day} {currentdate}
            {'\n'}{'\n'}
            {firstname} {lastname}
            {'\n'} is coming from {currentlocation}
            {'\n'} {'\n'}
            Issued at: {realtimeleave}{'\n'}{'\n'}

            {firstname} {lastname} has completed {'\n'}
            Today's Work!
            {'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text> : locationdestination === "Break From Work Pass " ? <Text style={styles.paragraph}>{'\n'}
              {school}{'\n'}{'\n'}
              {day} {currentdate}
              {'\n'}{'\n'}
              {firstname} {lastname}
              {'\n'} is in {currentlocation} right now
              {'\n'} {'\n'}
              Using a Phone Pass
              {'\n'} {'\n'}
              Issued at: {realtimeleave}.{'\n'}{'\n'}
              {'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text> : <Text style={locationdestination.includes("urse") ? styles.paragraph2 : styles.paragraph}>
            {'\n'}{school}{'\n'}{'\n'}
            {day} {currentdate}
            {'\n'}{'\n'}
            {firstname} {lastname}
            {'\n'} is coming from {currentlocation}
            {'\n'} {'\n'}
            Issued at: {realtimeleave}{'\n'}{'\n'}
            Going To: {locationdestination}
            {'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}
          </Text>}
        </View>

      </View>

      <View style={styles.sectionB}>
        <ScrollView>

          {locationdestination != newlocation ? <Pressable
            onPress={() => navigation.navigate('Scanner', {
              teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, teacherid: teacherid, coursename: coursename, Selectedclassdestination: Selectedclassdestination, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime,
              currentsessionid: currentsessionid, id: id, passid: passid, day: day, teacheridforreturn: teacheridforreturn, leftclass2: leftclass2, leftclass2: leftclass2, bathroompassinuse: bathroompassinuse, maxstudentsonphonepass: maxstudentsonphonepass, newlocation: newlocation, adjustmentandoverunder: adjustmentandoverunder, total2: total2, getcurrentdifference: getcurrentdifference, expectedreturn2: expectedreturn, endofclasssession: endofclasssession, day:day
            })}
          >
            <Text style={locationdestination.includes("urse") ? styles.paragraph2 : styles.paragraph}>Return this Pass!</Text>
          </Pressable> : <Pressable onPress={() => navigation.navigate('Mainmenustudent', {
            teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, teacherid: teacherid, coursename: coursename, Selectedclassdestination: Selectedclassdestination, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime,
            currentsessionid: currentsessionid, id: id, passid: passid, day: day, teacheridforreturn: teacheridforreturn, leftclass2: leftclass2, leftclass2: leftclass2, bathroompassinuse: bathroompassinuse, maxstudentsonphonepass: maxstudentsonphonepass, newlocation: newlocation, adjustmentandoverunder: adjustmentandoverunder, total2: total2, getcurrentdifference: getcurrentdifference,
          })}
          >
            <Text style={styles.paragraph}>Return Pass</Text>
          </Pressable>}



          {currentdifference !== 0 ? (<View style={locationdestination.includes("urse") ? styles.paragraph2 : styles.paragraph}>
            <Text style={locationdestination.includes("urse") ? styles.text2 : styles.text}>You left class {'\n'} Just over {Math.round(currentdifference)} minute(s) ago. {'\n'}The time limit for{'\n'} This pass is {timeallowed} minutes. {'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
          </View>) : (<View style={styles.text}>

            <Pressable
              style={locationdestination.includes("urse") ? styles.paragraph2 :  styles.paragraph}
              onPress={() => ComputeTimeOut()}
            >
              <Text style={locationdestination.includes("urse") ? styles.paragraph2 : styles.text}>Check time {'\n'}Since you left class{'\n'}{'\n'} {'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
            </Pressable>

          </View>)}
        </ScrollView>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#E43522',
    padding: 3,
    justifyContent: 'flex-end',
  },
  container2: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#ffa500',
    padding: 3,
    justifyContent: 'flex-end',
  },

  sectionA: {

    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: "#013469",
    color: "#fff",
    justifyContent: 'center',
    flex: .6,
  },

  sectionA2: {

    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: "#ffa500",
    color: "#000",
    justifyContent: 'center',
    flex: .6,
  },
  sectionB: {

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: "#E43522",
    color: "#fff",
    flex: .4
  },
  paragraph: {
    marginTop: 5,
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
    color: '#FFFFFF',
    backgroundColor: '#013469',
  },
  paragraph2: {
    marginTop: 5,
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
    color: '#000000',
    backgroundColor: '#ffa500',
  },


  text: {
    color: '#FFFFFF',
    textAlign: "center",
    fontSize: 18,

  },

  text2: {
    color: '#000000',
    textAlign: "center",
    fontSize: 18,

  },
  barcodebox: {
    alignItems: 'center',
    width: "100%",
    backgroundColor: '#013469',
    justifyContent: 'center',
    height: 350
  },

  barcodebox2: {
    alignItems: 'center',
    width: "100%",
    backgroundColor: '#ffa500',
    justifyContent: 'center',
    height: 350
  },


});