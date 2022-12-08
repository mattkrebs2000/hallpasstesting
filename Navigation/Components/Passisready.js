import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, SafeAreaView, StyleSheet, Button, View, TouchableOpacity, Text, ScrollView} from 'react-native';
import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, getFirestore ,collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion } from "@firebase/firestore";
import Destinations from './MapOfDestinations/MapOfDestinations';


const height = Dimensions.get("window").height;

const Destination = ({route, navigation}) => {

  const { userinformation, teacherid, coursename, classid, teacher, Selectedclassdestination, youcangetpass, section, currentlocation, school, state, town, locationdestination,  firstname, lastname, ledby, exclusivetime, drinkofwater, donewithworkpass, bathroomtime, nonbathroomtime, currentsessionid, bathroompassinuse, totalinlineforbathroom, id, passid, teacheridforreturn,   maxstudentsonphonepass,  newlocation, adjustmentandoverunder, total2, getcurrentdifference, endofclasssession} = route.params;

  console.log(totalinlineforbathroom, "totalinlineforbathroom", "passisready");

  const [timeallowed, setTimeallowed] = useState();

  useEffect(() => {
    if (locationdestination === "Break From Work Pass ") {
      setTimeallowed(exclusivetime)
    } else if (locationdestination === "Bathroom") {
      setTimeallowed(bathroomtime) 
    }
      else if (locationdestination === "Get Drink of Water") {
        setTimeallowed(drinkofwater) 
    } else {
      setTimeallowed(nonbathroomtime)
    }
  }, []);

  useEffect(() => {

    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity >
                <Text accessibilityLabel="Guest" style={styles.error}>
                </Text>
            </TouchableOpacity>
        ),
    });
}, []);


const cancelpass = async () => {

  const userDoc = doc(firebase, "passes",
      passid);

  await deleteDoc(userDoc)

      .then(function () {
         cancelpass2();

      })
};

async function cancelpass2() {

if (locationdestination === "Bathroom") {

  await updateDoc(doc(firebase, "users", id), {
    status: "",
    passid: "",
    outonbathroompass: false,
}).catch((error) => {
    console.log(error); alert(error);
})

await updateDoc(doc(firebase, "classesbeingtaught", classid), {
  totalinlineforbathroom: totalinlineforbathroom - 1 
}).catch((error) => {
  console.log(error); alert(error);
})

.then(async () => {
  navigation.navigate("Mainmenustudent", {
    userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater:drinkofwater,exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid,
    maxstudentsonphonepass: maxstudentsonphonepass,
    bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, id: id, bathroomtime: bathroomtime,  adjustmentandoverunder: adjustmentandoverunder, endofclasssession: endofclasssession,
 });
})

} else {


  await updateDoc(doc(firebase, "users", id), {
    status: "",
    passid: ""
}).catch((error) => {
    console.log(error); alert(error);

}).then(async () => {
  navigation.navigate("Mainmenustudent", {
    userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater:drinkofwater,exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid,
    maxstudentsonphonepass: maxstudentsonphonepass,
    bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, id: id, bathroomtime: bathroomtime,  adjustmentandoverunder: adjustmentandoverunder, endofclasssession: endofclasssession,
 });
})
}

}
  return (
    <SafeAreaView style={styles.largercontainer}>
    <View style={styles.container1}>
      
      {locationdestination === "Break From Work Pass " ? <Text style={styles.error}>Your {locationdestination}{'\n'}is now ready</Text> : locationdestination === "Bathroom" ? <Text style={styles.error}>Your Pass to the {locationdestination}{'\n'}is now ready</Text>:<Text style={styles.error}>Your Pass to {locationdestination}{'\n'}is now ready</Text>}</View>
   
    <View style={styles.container2}>
    <ScrollView>

    <Text style={styles.paragraph3}>A few reminders: </Text>
 {locationdestination == "Bathroom" ? <Text style={styles.paragraph3}>1. You must "zap out" now and then "zap in" again when you get back to this class. To maintain your priviledges, you should do this before reaching the set time limit of {bathroomtime} minutes.</Text> :  locationdestination === "Break From Work Pass " ? <Text style={styles.paragraph3}>1. You must "zap out" now and then "zap in" again before reaching your time limit which is {exclusivetime} minutes. If you fail to do this you will lose this priviledge. </Text> : locationdestination === "Get Drink of Water" ? <Text style={styles.paragraph3}>1. You must "zap out" now and then "zap in" again before reaching your time limit which is {drinkofwater} minutes. If you fail to do this you will lose this priviledge. </Text> : <Text style={styles.paragraph3}>1. You must "zap out" now and then "zap in" again when you reach your destination. To maintain your priviledges, you should do this before reaching the set time limit of {nonbathroomtime} minutes.</Text> }
 <Text style={styles.paragraph3}>2. Your pass details are all accessible on the "Pass" screen. </Text>
 <Text style={styles.paragraph3}>3. Before "Zapping Out" please ask your teacher if it is OK to Check Out.</Text>
 </ScrollView>
</View>

 <View style={styles.section3}>

 <Text style={styles.paragraph2}>___________________ {'\n'}</Text>

 {locationdestination ? (<Text style={styles.paragraph2} onPress={() => navigation.navigate("Scanner", { userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater:drinkofwater, exclusivetime: exclusivetime, donewithworkpass:donewithworkpass, bathroomtime:bathroomtime, currentsessionid: currentsessionid, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, id: id, passid: passid, teacheridforreturn:teacheridforreturn,   maxstudentsonphonepass:maxstudentsonphonepass, newlocation: newlocation, timeallowed:timeallowed, adjustmentandoverunder: adjustmentandoverunder, total2:total2, endofclasssession: endofclasssession,getcurrentdifference:getcurrentdifference, })} >If Permission is Given {'\n'} Touch Here to{'\n'} "Zap Out" </Text>) : (null)}
               <Text style={styles.paragraph2} onPress={() =>  cancelpass()} >Cancel This Pass</Text>
          </View> 
 </SafeAreaView>

  );
}
const styles = StyleSheet.create({
  
  largercontainer: {
    height: height,
    backgroundColor: "#000",
    height: "100%"

},
  
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: 2,
  },
  paragraph: {
    margin: 24,
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
    color: '#FFFFFF',
    backgroundColor:'#000000',

  },
  text: {
    color: '#FFFFFF',
    textAlign: "center"
    
  },
  paragraph2: {

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
    backgroundColor: '#000000',
    color: "#fff",

    justifyContent: "center",
    margin: 10,
},
paragraph3: {

  fontSize: 18,
  fontWeight: 'bold',
  textAlign: "center",
  backgroundColor: '#013469',
  color: "#FFF",
  margin: 10,

},
container2: {
  
  backgroundColor: "#000",
  width: "100%",
  padding: 30,
backgroundColor: "#013469",
alignItems:"center",
justifyContent:"center",
maxHeight: "45%",
},
container1: {
  height: "15%",
  backgroundColor: '#000',
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: "#000"

},
error: {

  backgroundColor: '#000',
  color: "#FFF",
  marginLeft: "3%",
  marginRight: "3%",
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: "center"

},
section3: {

  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
  backgroundColor: "#000",
  color: "#fff",
  alignContent: "center",
  height: "30%",
  backgroundColor:"#000"

},

});
export default Destination; 