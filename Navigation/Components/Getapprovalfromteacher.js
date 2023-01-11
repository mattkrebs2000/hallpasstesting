import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Dimensions, SafeAreaView, StyleSheet, Button, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion } from "@firebase/firestore";
import Destinations from './MapOfDestinations/MapOfDestinations';


const height = Dimensions.get("window").height;

const Destination = ({ route, navigation }) => {

  const { userinformation, teacherid, coursename, classid, teacher, Selectedclassdestination, youcangetpass, section, currentlocation, school, state, town, locationdestination, firstname, lastname, ledby, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, currentsessionid, bathroompassinuse, totalinlineforbathroom, id, passid, teacheridforreturn, maxstudentsonphonepass, newlocation, endofclasssession, overunderstatus, lengthofclasssession, getadjustmentss, adjustmentandoverunder, total2, getcurrentdifference, maxstudentsbathroom, linkedclass, pnumber, numberofrecentpasses, passesallowedinweekifonpenalty } = route.params;


  const [initialtext, setInitialtext] = useState("");
  const [startingnumber, setStartingnumber] = useState();
  const [inputtext, setInputtext] = useState();
  const [twotextsaretrue, setTwotextsaretrue] = useState();




  console.log(section, "section", "passisready");

  //Not needed if its not complex

  useEffect(() => {
    console.log("WHATEVEEEREEE")
    if (typeof inputtext != "undefined") {

      if (inputtext === initialtext) {
        setTwotextsaretrue(true);
      } else {
        setTwotextsaretrue(false);
      }
    }
  }, [initialtext, inputtext]);

  useEffect(() => {

    if (coursename) {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity>
            <Text accessibilityLabel="Guest" style={styles.error}>
            </Text>
          </TouchableOpacity>
        ),
      });
    }

  }, []);

  useEffect(() => {
      setInitialtext("Because I have taken too much time on previous passes, I must write out this statement before making a pass, and I am only allowed a small number of passes every seven days. I should be careful not to use these passes if I do not really need to. When I run out, I will not be allowed to go on a pass. To get out of all of this, I can make up lost time with the teacher after/before school.")
  }, []);


  return (
    <SafeAreaView style={styles.largercontainer}>
      <View>
        <ScrollView>
          <View style={styles.container1}>
            <ScrollView>
              <View><Text style={styles.paragraph5}>Because your plus-minus minus for this class is a negative number you must write out the statement below into the Input Box (exactly as it appears) before you are able to make a pass. Because you are now on penalty, you are only allowed {passesallowedinweekifonpenalty} passes every seven days. This pass that you are currently trying to make is pass number: {numberofrecentpasses + 1} </Text><Text style={styles.paragraph55}>   </Text></View>
            </ScrollView>
          </View>

          <ScrollView>
            <View style={styles.container2}>
              <Text style={styles.paragraph3}>Your Statement To Rewrite: </Text>
              <ScrollView>
              <Text style={styles.paragraph33} selectable={false}>{initialtext}</Text>
              </ScrollView>
            </View>
          </ScrollView>

          <View style={styles.section3}>
            <ScrollView>

              <TextInput
                style={initialtext.includes(inputtext) ? styles.Newrowyy : styles.Newrowy}
                placeholder="Create Contract Here"
                placeholderTextColor="#BEBEBE"
                onChangeText={(text) => setInputtext(text)}
                value={inputtext}
                multiline={true}
              />

              <Text style={styles.paragraph2}>___________________ {'\n'}</Text>

              {twotextsaretrue ? <Text style={styles.paragraph2} onPress={() => navigation.navigate("Destination", {
                userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid,
                maxstudentsonphonepass: maxstudentsonphonepass,
                bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, id: id, bathroomtime: bathroomtime, endofclasssession: endofclasssession, overunderstatus: overunderstatus, lengthofclasssession: lengthofclasssession, getadjustmentss: getadjustmentss, adjustmentandoverunder: adjustmentandoverunder, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass, pnumber: pnumber
              })} >Make A Pass</Text> : null}

              <Text style={styles.paragraph2}>{'\n'}</Text>
              <Text style={styles.paragraph2}> {'\n'}</Text>
              <Text style={styles.paragraph2}>{'\n'}</Text>
              <Text style={styles.paragraph2}>{'\n'}</Text>
              <Text style={styles.paragraph2}>{'\n'}</Text>

            </ScrollView>
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>

  );
}
const styles = StyleSheet.create({

  largercontainer: {
    height: height,
    backgroundColor: "#000",
    height: "100%",
    alignItems: "center"
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
    backgroundColor: '#000000',

  },

  paragraph5: {
    fontSize: 17,
    textAlign: 'center',
    padding: 20,
    color: '#FFFFFF',
    backgroundColor: '#000000',
  },

  paragraph55: {
    fontSize: 17,
    textAlign: 'center',
    padding: 10,
    paddingTop: 0,
    color: '#FFFFFF',
    backgroundColor: '#000000',
    textDecorationLine: 'underline',

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

  paragraph33: {

    fontSize: 18,
    textAlign: "center",
    backgroundColor: '#013469',
    color: "#FFF",
    margin: 10,

  },
  container2: {
    width: "100%",
    padding: 10,
    backgroundColor: "#013469",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: "100%",
    height: "100%",
    alignSelf: "center",
  },
  container1: {
    height: "25%",
    backgroundColor: '#000',
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",


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
    height: "50%",
    width: "100%",
    alignSelf: "center",



  },
  Newrowy: {
    backgroundColor: '#013469',
    margin: 20,
    textAlign: "center",
    fontSize: 16,

    borderColor: "#E43522",
    borderWidth: 2,
    justifyContent: "center",
    color: "#fff",
    borderRadius: 10,

    maxWidth: "90%",
    maxHeight: "50%",
    padding: 15

  },
  Newrowyy: {
    backgroundColor: '#ffff00',
    margin: 20,
    textAlign: "center",
    fontSize: 16,

    borderColor: "#E43522",
    borderWidth: 2,
    justifyContent: "center",
    color: "#000000",
    borderRadius: 10,

    maxWidth: "90%",
    maxHeight: "50%",
    padding: 15

  },

});
export default Destination; 
