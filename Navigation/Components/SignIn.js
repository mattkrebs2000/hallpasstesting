import { Alert, ScrollView, SafeAreaView, Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform, StyleSheet, Dimensions, LogBox, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { firebase, auth } from "../Firebase/Config";
import { admin, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, deleteUser} from "@firebase/auth";


import { doc, getDoc } from '@firebase/firestore';

const height = Dimensions.get("window").height;

export default function SignIn({ route, navigation }) {

  LogBox.ignoreAllLogs();

  const [id2, setId] = useState();
  const [school2, setSchool] = useState();
  const [state2, setState] = useState();
  const [town2, setTown] = useState();
  const [role2, setRole] = useState();
  const [firstname2, setFirstname] = useState();
  const [lastname2, setLastname] = useState();
  const [teacheriscalled2, setTeacheriscalled] = useState();
  const [email2, setEmail] = useState();


  const [errorMessage, setErrorMessage] = useState("");
  const [emaillocal, setEmaillocal] = useState("");
  const [passwordlocal, setPasswordlocal] = useState("");


  const [someoneisloggedin, setsomeoneisloggedin] = useState();


  const signoutfunction = () => {
    setEmaillocal("");
    setPasswordlocal("");
    setRole("");
    setId("");
    auth.signOut();

  }


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Text accessibilityLabel="Guest" style={styles.paragraph23}>
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity>
          <Text accessibilityLabel="Guest" style={styles.paragraph23}>
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);


  useEffect(() => {
    auth.signOut();
  }, []);

  const auth = getAuth();


  onAuthStateChanged(auth, (user) => {

    if (user) {
      setsomeoneisloggedin(true);
      if (user.email === emaillocal) {
        const uid = user.uid;
        setId(uid)
      }

    } else {
      setsomeoneisloggedin(false);
      console.log("NOONE IS LOGGED IN", id2)
      setId("");
      setRole("");

    }

  });

  useEffect(() => {
    console.log("Here is id",id2)
    if (id2) {
      getinfo()
    }

  }, [id2]);

  useEffect(() => {
    if (role2) {
      sendaway()
    }

  }, [role2]);

  const getinfo = () => {

    const docRef = doc(firebase, "users", id2);
    const docData = getDoc(docRef)

      .then((docSnap) => {

        if (docSnap.exists()) {

        if (docSnap.data().teacheriscalled) {
          AsyncStorage.setItem('teacheriscalled', docSnap.data().teacheriscalled);
          console.log("there was a teacheriscalled")
        } else {
          console.log("there was not a teachers is called")
        }

        if (docSnap.data().localfirstname) {
          AsyncStorage.setItem('firstname', docSnap.data().localfirstname);
          console.log("there was a firstnaame")
        } else {
          console.log("there was not a firstname is called")
        }

        if (docSnap.data().locallastname) {
          AsyncStorage.setItem('lastname', docSnap.data().locallastname);
          console.log("there was a lastname")
        } else {
          console.log("there was not a lastname is called")
        }
        if (docSnap.data().role) {
          AsyncStorage.setItem('role', docSnap.data().role);
          console.log("there was a role")
        } else {
          console.log("there was not a role is called")
        }
        if (docSnap.data().id) {
          AsyncStorage.setItem('id', docSnap.data().id);
          console.log("there was an id")
        } else {
          console.log("there was not an id called")
        } if (docSnap.data().school) {
          AsyncStorage.setItem('school', docSnap.data().school);
          console.log("there was an school")
        } else {
          console.log("there was not a school called")
        }
        if (docSnap.data().town) {
          AsyncStorage.setItem('town', docSnap.data().town);
          console.log("there was an town")
        } else {
          console.log("there was not a town called")
        }
        if (docSnap.data().state) {
          AsyncStorage.setItem('state', docSnap.data().state);
          console.log("there was an state")
        } else {
          console.log("there was not a state called")
        }
        if (docSnap.data().email) {
          AsyncStorage.setItem('email', docSnap.data().email);
          console.log("there was an email")
        } else {
          console.log("there was not a email called")
        }




        setEmail(docSnap.data().email)
        setSchool(docSnap.data().school);
        setTown(docSnap.data().town);
        setState(docSnap.data().state);
        setFirstname(docSnap.data().localfirstname);
        setLastname(docSnap.data().locallastname);
        setTeacheriscalled(docSnap.data().teacheriscalled);
        setEmaillocal("");
        setPasswordlocal("");
        setRole(docSnap.data().role);

      } else {
    
        Alert.alert('The user "Document" cannot be found. The user needs to recreate the account.');
        }

      })
  }

  const authi = getAuth();

  const sendaway = () => {

    if (role2 === "Student") {

      navigation.navigate("Mainmenustudent", { school2: school2, state2: state2, town2: town2, role2: role2, firstname2: firstname2, lastname2: lastname2, id2: id2, email2: email2 });

    } if (role2 === "Teacher" || role2 === "Admin") {

      navigation.navigate("Mainmenuteacher", { school2: school2, state2: state2, town2: town2, role2: role2, teacheriscalled2: teacheriscalled2, id2: id2, email2: email2 });

    } else {
      console.log("Slow your role");
    }
  }


  const login = () => {

    signInWithEmailAndPassword(auth, emaillocal, passwordlocal).catch((error) => {

      const errorMessage = error.message;
      alert(errorMessage);
    });
  };

 

  return (
    <SafeAreaView style={styles.largercontainer}>
      <View style={styles.container1}>
        <Text style={styles.error}>Log In</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.container2}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={80}>
        <ScrollView contentContainerStyle={styles.container}>
          <TextInput
            style={styles.Newrow}
            placeholder='Email'
            placeholderTextColor="#BEBEBE"
            value={emaillocal.toLowerCase()}
            onChangeText={setEmaillocal} />
          <TextInput
            style={styles.Newrow22} />
          <TextInput
            style={styles.Newrow}
            placeholder='Password'
            placeholderTextColor="#BEBEBE"
            secureTextEntry={true}
            value={passwordlocal.toLowerCase()}
            onChangeText={setPasswordlocal} />

        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.section3}>
        {someoneisloggedin === false && emaillocal != "" && passwordlocal != "" ? <TouchableOpacity style={styles.touchable}>
          <Text style={styles.paragraph22} onPress={login} color="#f7b267">Login</Text>
        </TouchableOpacity> : someoneisloggedin === true ? <TouchableOpacity style={styles.touchable}>
          <Text style={styles.paragraph222} color="#f7b267">You are logged in</Text>
        </TouchableOpacity> : <TouchableOpacity style={styles.touchable}>
          <Text style={styles.paragraph222} color="#f7b267">              </Text>
        </TouchableOpacity>}


        <Text style={styles.paragraph2}>___________________ </Text>
        <Text style={styles.paragraph2}>Don't have an account? </Text>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.paragraph22} onPress={() => navigation.navigate("Signup")} >SignUp</Text>
        </TouchableOpacity>

        <Text style={styles.paragraph2}>___________________ </Text>

        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.paragraph22} onPress={() => signoutfunction()}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

}



const styles = StyleSheet.create({

  container: {
    backgroundColor: "#000",
    alignItems: "center",
    width: "100%",
  },
  largercontainer: {
    height: height,
    backgroundColor: "#000"
  },
  container1: {
    height: "10%",
    backgroundColor: '#000',
    width: "100%",
    justifyContent: "center",
  },
  container2: {
    height: "35%",
    backgroundColor: "#000",
    width: "100%",

  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#000000',
    color: "#fff",
    height: "100%",
    textAlign: "center",
    marginTop: "10%",
  },
  Newrow: {
    backgroundColor: '#013469',
    margin: 10,
    textAlign: "center",
    fontSize: 20,
    width: "70%",
    borderColor: "#E43522",
    borderWidth: 2,
    justifyContent: "center",
    color: "#fff",
    borderRadius: 10,
  },
  Newrow22: {

    height: .1,
  },


  paragraph2: {


    fontSize: 18,
    textAlign: "center",
    backgroundColor: '#000000',
    color: "#fff",
    height: "14%"
  },

  paragraph4: {

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000',
    color: "#fff",
    justifyContent: "center",
    height: "30%",
  },
  section3: {

    fontSize: 18,

    textAlign: 'center',
    backgroundColor: "#000",
    color: "#fff",
    alignContent: "center",
    height: "45%",
    marginTop: 30,
  },

  error: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#000000',
    color: "#fff",
    height: "100%",
    textAlign: "center",
    marginTop: "10%",
  },
  touchable: {
    height: "14%",
    alignItems: "center",
  },

  paragraph22: {
    textAlign: "center",
    fontSize: 18,
    width: "50%",
    justifyContent: "center",
    color: "#fff",
  },


  paragraph222: {
    textAlign: "center",
    fontSize: 18,
    width: "50%",
    justifyContent: "center",
    color: "#999",
  },

  paragraph23: {
    textAlign: "center",
    fontSize: 16,
    width: "50%",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    marginRight: 10,
  },


});