import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, SafeAreaView, StyleSheet, Button, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion, orderBy, limit } from "@firebase/firestore";
import Destinations from './MapOfDestinations/MapOfDestinations';


const height = Dimensions.get("window").height;

const Destination = ({ route, navigation }) => {

    const { userinformation, teacherid, coursename, classid, teacher, Selectedclassdestination, youcangetpass, section, currentlocation, school, state, town, locationdestination, firstname, lastname, currentsessionid, ledby, drinkofwater, exclusivetime,  donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroomlocal, passid,id, teacheridforreturn, maxstudentsonphonepass, newlocation, endofclasssession, adjustmentandoverunder,total2, getcurrentdifference, } = route.params;

    console.log("newlocation", userinformation, teacherid, coursename, classid, teacher, Selectedclassdestination, youcangetpass, section, currentlocation, school, state, town, locationdestination, firstname, lastname, "newloction")

    const [donewithworkplease, setDonewithworkpleaase] = useState();
   
    useEffect(() => {
       setDonewithworkpleaase(true);
     }, []);



    return (
        <SafeAreaView style={styles.largercontainer}>
            <View style={styles.container1}>

                <Text style={styles.error}>Your {locationdestination}{'\n'}is almost ready</Text></View>

            <View style={styles.container2}>
                <ScrollView>

                    <Text style={styles.paragraph3}>A few reminders: </Text>
                    <Text style={styles.paragraph3}>1. If you haven't already let the teacher know that you are done with your work and ask that confirmation be sent to your phone</Text>
                    <Text style={styles.paragraph3}>2. Make sure your work is accessible in case the teacher wants to check it</Text>
                    <Text style={styles.paragraph3}>3. As soon as you are given the go ahead you may leave this App and use your phone as you wish</Text>
                    <Text style={styles.paragraph3}>4. If the teacher checks your work and finds that you are not finished you must put your phone away and complete your work </Text>
                </ScrollView>
            </View>

            <View style={styles.section3}>

                <Text style={styles.paragraph2}>___________________ {'\n'}</Text>

               <Text style={styles.paragraph2} onPress={() => navigation.navigate("Mainmenustudent", {
                   userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater:drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid,
            maxstudentsonphonepass: maxstudentsonphonepass,
            bathroompassinuse: bathroompassinuse, id: id, bathroomtime: bathroomtime, endofclasssession: endofclasssession,  adjustmentandoverunder: adjustmentandoverunder, donewithworkplease:donewithworkplease
                })} >Once the 'GoAhead' is given{'\n'} You may touch here.{'\n'}See it in Main Menu</Text>
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
        backgroundColor: '#000000',

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
        margin: 10
    },
    container2: {
        width: "100%",
        padding: 30,
     backgroundColor: "#013469",
        alignItems: "center",
        justifyContent: "center",
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
        backgroundColor: "#000"

    },

});
export default Destination; 