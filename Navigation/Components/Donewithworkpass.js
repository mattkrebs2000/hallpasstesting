import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, StyleSheet, Button, TouchableHighlight, LogBox } from 'react-native';

import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, arrayUnion, FieldValue } from "@firebase/firestore";

import { auth, firebase } from "../Firebase/Config";





export default function App3({route, navigation}) {

  LogBox.ignoreAllLogs();

  const {teacherid,  coursename,  classid,teacher,  Selectedclassdestination, youcangetpass, section, currentlocation,school, state,town, locationdestination,  firstname, lastname,  userinformation, ledby, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, currentsessionid, bathroompassinuse, totalinlineforbathroom, id, passid, teacheridforreturn, leftclass, expectedreturn, maxstudentsonphonepass, newlocation, endofclasssession } = route.params;
  console.log( "In Pass",passid, "passid", bathroomtime, expectedreturn, expectedreturn2, "In Pass")

  const [currentdifference, setCurrentdifference] = useState(0);
  const [realtimeleave, setRealtimeleave] = useState(0);
  const [currentdate, setCurrentdate] = useState("");
  const [day, setDay] = useState("");

  const [leavetimeGlobal, setLeavetimeGlobal] = useState();

  const [leftclass2, setLeftclass2] = useState();
  const [expectedreturn2, setExpectedreturn2] = useState();


  useEffect(() => {
    let newtime = new Date();
    setLeavetimeGlobal(newtime);
setLeftclass2(leftclass);
setExpectedreturn2(expectedreturn);

  }, [expectedreturn]);
  


  useEffect(() => {

    if (leavetimeGlobal)  {
    console.log("locationdestination", locationdestination, "locationdestination");
    // const newtime = leavetimeGlobal.toLocaleTimeString();
   
    const formatAMPM = () => {
      let hours = leavetimeGlobal.getHours();
      let minutes = leavetimeGlobal.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes.toString().padStart(2, '0');
      let strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }

const p = formatAMPM(leavetimeGlobal);

setRealtimeleave(p);

    console.log("current difference", currentdifference, "current differeence");
    setCurrentdate((leavetimeGlobal.getMonth()+1) + "/" + leavetimeGlobal.getDate() + "/" + leavetimeGlobal.getFullYear());
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
    const s = new Date();
    const t = s.getTime();
    const v = (t - leavetimeGlobal)/60000;
    const u = v.toFixed(0);
    setCurrentdifference(u);
    setTimeout(() => {
      setCurrentdifference(0);
    }, 5000);
  }

  return (
    <View style={styles.container}>
        {locationdestination === "Done with work Phone Pass" ?  <Text style={styles.paragraph}>
        {school}{'\n'}{'\n'}
        Today is {day}{'\n'}{currentdate}. 
        {'\n'}{'\n'}
        {firstname} {lastname}
        {'\n'} is on a pass from 
        {'\n'}{currentlocation}.
        {'\n'} {'\n'}
        Issued at: {realtimeleave}.{'\n'}{'\n'}
        
        {firstname} {lastname} has completed {'\n'}
        Today's Work!
      </Text> : locationdestination === "Break From Work Pass " ?  <Text style={styles.paragraph}>
        {school}{'\n'}{'\n'}
        Today is {day}{'\n'}{currentdate}. 
        {'\n'}{'\n'}
        {firstname} {lastname}
        {'\n'} is on a pass from 
        {'\n'}{currentlocation}.
        {'\n'} {'\n'}
        Issued at: {realtimeleave}.{'\n'}{'\n'}
        {firstname} {lastname} is using {'\n'}
        A Phone Pass right now. 
      </Text>: <Text style={styles.paragraph}>
        {school}{'\n'}{'\n'}
        Today is {day}{'\n'}{currentdate}. 
        {'\n'}{'\n'}
        {firstname} {lastname}
        {'\n'} is on a pass from 
        {'\n'}{currentlocation}.
        {'\n'} {'\n'}
        Issued at: {realtimeleave}.{'\n'}{'\n'}
        Going To: {locationdestination}
      </Text>} 
      
   <Pressable
        onPress={() => navigation.navigate('Mainmenustudent', {
          teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname,  teacherid: teacherid, coursename: coursename, Selectedclassdestination: Selectedclassdestination, ledby: ledby, drinkofwater:drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime,
           currentsessionid: currentsessionid, id: id, passid: passid, day:day,teacheridforreturn:teacheridforreturn, leftclass2:leftclass2, expectedreturn2:expectedreturn2, leftclass2:leftclass2, bathroompassinuse:bathroompassinuse,   maxstudentsonphonepass:maxstudentsonphonepass,  newlocation: newlocation, endofclasssession: endofclasssession,
         })}
      >
        <Text style={styles.paragraph}>Return to Main Menu</Text>
      </Pressable>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: 2,
  },
  paragraph: {
    margin: 24,
    fontSize:20,
    textAlign: 'center',
    padding: 20,
    color: '#FFFFFF',
    backgroundColor:'#000000',

  },
  text: {
    color: '#FFFFFF',
    textAlign: "center"
    
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    color: "#fff"
  },
  maintext1: {
    fontSize: 16,
    margin: 20,
    color: "#f00"
  },
});
