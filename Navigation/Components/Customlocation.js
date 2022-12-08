import { Text, Button, StatusBar, TextInput, KeyboardAvoidingView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
// Import our hooks
import React, { useRef, useEffect, useState } from 'react';
import { useForm, useController } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
// create our ref

import { Alert } from 'react-native-web';



const App = ({ route, navigation }) => {

  const { userinformation, teacherid, coursename, classid, teacher,  Selectedclassdestination,  youcangetpass, section, currentlocation, school, state, town,locationdestination, firstname,  lastname, ledby, exclusivetime, drinkofwater,  donewithworkpass, bathroomtime,  nonbathroomtime,  currentsessionid, bathroompassinuse, totalinlineforbathroomlocal, passid, id, teacheridforreturn, maxstudentsonphonepass, endofclasssession, lengthofclasssession, } = route.params;

const runthis = () => {

    if (newlocation.length > 0) {

console.log("WHEN DIT THIS RUN? ", newlocation, "newlocation")

      navigation.navigate("Destination", { userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby,  drinkofwater:drinkofwater, drinkofwater:drinkofwater,exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroomlocal, passid: passid, id: id, teacheridforreturn: teacheridforreturn, maxstudentsonphonepass: maxstudentsonphonepass, newlocation: newlocation, endofclasssession: endofclasssession,lengthofclasssession:lengthofclasssession })

    }

  };

  console.log("userinformation now in CustomLocation.js", userinformation, "userinformation now in CustomLocation.js");
  const [newlocation, setNewlocation] = useState();

  const { control, handleSubmit } = useForm();



  useEffect(() => {

    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity>
                <Text accessibilityLabel="Guest" style={styles.error}>
                </Text>
            </TouchableOpacity>
        ),
    });
}, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.Newrowy}
        placeholder="Where are you going?"
        placeholderTextColor="#BEBEBE"
        onChangeText={(text) => setNewlocation(text)}
        value={newlocation}
      />
      {newlocation ? <Text style={styles.paragraph} onPress={() => runthis()}>Submit</Text>: null}
    </View>

  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
   alignItems: "center"
  },
  header: {

    padding: 20,
    backgroundColor: '#336699',
  },
  paragraph: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  legal: {
    margin: 10,
    color: '#013469',
    fontSize: 12,
    textAlign: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
  Newrow: {
    backgroundColor: '#000000',

    margin: 40,
    textAlign: "center",
    fontSize: 20,
    width: "90%",
    borderColor: "#E43522",
    borderWidth: 4,
    justifyContent: "center",
    color: "#fff",
},
Newrowy: {
  backgroundColor: '#013469',
  margin: 20,
  textAlign: "center",
  fontSize: 16,
  width: "70%",
  borderColor: "#E43522",
  borderWidth: 2,
  justifyContent: "center",
  color: "#fff",
  borderRadius: 10,
  flex: .06
},

});

