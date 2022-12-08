import React, { useState, useEffect } from "react";

import CryptoES from "crypto-es";
import Results from "./Subcomponents/ResultsContainer";
import StateResults from "./Subcomponents/StateResultsContainer";
import TownResults from "./Subcomponents/TownResultsContainer";
import SignIn from "./SignIn";
import Classes from './Mapofrelatedrules/mapofrelatedrules';


import {
    useNavigation,
    NavigationContainer,
    DrawerActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Alert, SafeAreaView, Text, View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';

import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion } from "@firebase/firestore";


const height = Dimensions.get("window").height;

export default function SignUp({ route, navigation }) {

    const { userinformation, teacherid, classid, coursename, section, location, school, teacher, town, state, firstname, lastname, id, percent, total2, getadjustmentsandplustotal2, getstatus, passid
    } = route.params;
  
    const [userdata, setUserdata] = useState([]);
    const [classesarray, setClassesarray] = useState([]);
    const [selectedclass, setSelectedclass] = useState("");

    const [idselected, setIdselected] = useState();
    

    const [showspinner, setShowspinner] = useState(true);
    const [classtrue, setClasstrue] = useState(false);



    useEffect(() => {
        console.log("THIS IS THE IDddddddddddddd");
        getlocationsqrcodes();

    }, []);

  

    async function getlocationsqrcodes() {

        if (userdata.length === 0) {
            const q = query(collection(firebase, "Expectations"), where("teacherid", "==", teacherid));

            const querySnapshot = await getDocs(q)
                .then(function (snapshot) {
                    let array = []
                    snapshot.forEach(doc => {
                        array.push(doc.data())
                    })
                    if (array.length === 0) {
                        setUserdata([{ classname: "You haven't Registered" }])
                    } else {
                        setUserdata(array);
                    }
                })


            setShowspinner(false);

        }
    };

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

    useEffect(() => {

        let idselect = selectedclass.id;
     
        console.log(selectedclass, "This is the selected class", selectedclass.id);
      
        setIdselected(idselect);
       
    }, [selectedclass]);

    // Deletes a class and then reruns classes that are still there.

    return (
        <SafeAreaView style={styles.largercontainer}>
            <View style={styles.container1}>
                {coursename ? <View><Text style={styles.error}>Now Active:{'\n'}{coursename} - {section} </Text></View> : <View><Text style={styles.error}>No Class is Active</Text></View>}
            </View>

            <View style={styles.container2}>

                <Classes userdata={userdata} id={id} setSelectedclass={setSelectedclass} selectedclass={selectedclass} idselected={idselected}/>

            </View>

            <View style={styles.section3}>

                <View><ActivityIndicator
                    size="large"
                    color="#FFF"
                    animating={showspinner}
                    style={{
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    }} /></View>


<Text style={styles.paragraph2}>___________________</Text>

<View>
    <TouchableOpacity onPress={() => navigation.navigate("Mainmenustudent", {
          userinformation: userinformation, teacherid: teacherid, classid: classid, coursename: coursename, section: section, location: location, school: school, teacher: teacher, town: town, state: state, school: school, firstname: firstname, lastname: lastname, id: id, percent: percent, total2: total2, getadjustmentsandplustotal2: getadjustmentsandplustotal2, getstatus: getstatus, passid: passid
    })}><Text style={styles.paragraph2}>Return To Main Menu</Text></TouchableOpacity>
</View>


             
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
        backgroundColor: "#000",

    },
    container1: {
        height: "10%",
        backgroundColor: '#000',
        width: "100%",
        justifyContent: "center",


    },
    error: {

        backgroundColor: '#000',
        color: "#FFF",
        marginLeft: "3%",
        marginRight: "3%",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",

    },
    error5: {

        backgroundColor: '#000',
        color: "#FFF",
        marginLeft: "3%",
        marginRight: "3%",
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: "center",

    },
    error1: {

        backgroundColor: '#000',
        color: "#000",
        marginLeft: "3%",
        marginRight: "3%",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",

    },
    container2: {
        height: "55%",
        backgroundColor: "#013469",
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
        backgroundColor: '#000000',

        margin: 2,
        textAlign: "center",
        fontSize: 20,
        width: "90%",
        borderColor: "#E43522",
        borderWidth: 4,
        justifyContent: "center",
        color: "#fff",
    },
    Newrowa: {
        backgroundColor: '#000000',
        margin: 4,
        textAlign: "center",
        fontSize: 20,
        borderColor: "#E43522",
        borderWidth: 4,
        justifyContent: "center",
        color: "#fff",
        flex: 1,
    },

    Newrowb: {
        backgroundColor: '#000000',
        margin: 4,
        textAlign: "center",
        fontSize: 20,
        borderColor: "#E43522",
        borderWidth: 4,
        justifyContent: "center",
        color: "#fff",
        flex: .4,
    },

    paragraph2: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        backgroundColor: '#000000',
        color: "#fff",

        justifyContent: "center",
        marginTop: 30,
    },

    paragraph4: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000',
        color: "#fff",
        justifyContent: "center",
        lineHeight: 30,

    },
    section3: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: "#000",
        color: "#fff",
        alignContent: "center",
        height: "100%",
        height: "35%",

    },


    paragraph6: {
        color: "#fff",
        fontSize: 17,
        marginRight: 7


    },
    textContainer: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        marginBottom: 20,
    },
    paragraph2: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        backgroundColor: '#000',
        color: "#fff",
        justifyContent: "center",
        marginTop: 30,
    },
});
