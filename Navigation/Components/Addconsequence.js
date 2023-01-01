import React, { useState, useEffect } from "react";
import CryptoES from "crypto-es";
import Results from "./Subcomponents/ResultsContainer";
import StateResults from "./Subcomponents/StateResultsContainer";
import TownResults from "./Subcomponents/TownResultsContainer";
import SignIn from "./SignIn";

import {
    useNavigation,
    NavigationContainer,
    DrawerActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { SafeAreaView, Text, View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc } from "@firebase/firestore";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const height = Dimensions.get("window").height;

export default function SignUp({ route, navigation }) {

    const { idofcurrentclass, currentsessionid, endlastclass, userinformation, role, bathroompasslimit, nonbathroompasslimit, ifnegativeplusminus, exclusivephonepassmaxstudents, exclusivephonepasstimelmit, lengthofclass, classiscurrent, nameofcurrentclass, starttimeofcurrentclass, classid, coursename, section, id, school, town, state, location, teacherid, teacheriscalled,
        email, starttime, lengthofclassesforacomputer, inpenalty, stoptimepenalty, starttimepenalty, totaltimepenalty, alreadyused, teacher, Selectedclassdestination, youcangetpass, currentlocation, locationdestination, firstname, lastname, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, lengthofclasses, endlastclasssubstitute, sessionended, thelastid, phonepassduration, overunder, drinkpassduration, bathroompassduration, drinkpasslimit, otherpassduration, maxstudentsphonepass, donewithworkphonepass, consequenceid, sessionending, maxstudentsbathroom, linkedclass
    } = route.params;

    console.log(teacheriscalled, "teacheriscalled", "userinformation now in QuickSignup.js");

    const [code, setCode] = useState();
    const [description, setDescription] = useState();
    const [idofclass, setIdofclass] = useState("");
    const [idsofpasses, setIdsofpasses] = useState();




    const endpasses = () => {

        if (sessionending < Date.now()) {
            const q = query(collection(firebase, "passes"), where("classsessionid", "==", currentsessionid), where("returned", "==", 0));

            const querySnapshot = getDocs(q)
                .then(function (snapshot) {
                    let array = []
                    snapshot.forEach(doc => {
                        array.push({ id: doc.data().id, expectedreturn: doc.data().whenlimitwillbereached, endofclasssession: doc.data().endofclasssession })
                    })
                    if (array.length === 0) {
                        console.log("No passes to change")
                    } else {
                        setIdsofpasses(array);
                    }
                })
        }

    }


    useEffect(() => {
        if (typeof idsofpasses != "undefined") {
            const t = Date.now();
         
            for (let s = 0; s < idsofpasses.length; s++) {

                const r = new Date(idsofpasses[s].endofclasssession);

                updateDoc(doc(firebase, "passes", idsofpasses[s].id), {

                    returned: idsofpasses[s].endofclasssession,
                    timereturned: r.toLocaleTimeString([], { hour12: true }),
                    returnedbeforetimelimit: idsofpasses[s].expectedreturn > idsofpasses[s].endofclasssession,
                    differenceoverorunderinminutes: (idsofpasses[s].expectedreturn - idsofpasses[s].endofclasssession) / 60000,

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }
        }
    }, [idsofpasses]);

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


    const ifitshtere = () => {
        if (sessionending < Date.now()) {
            updateDoc(doc(firebase, "classsessions", currentsessionid), {
                status: "Completed"
            })
                .catch(error => {
                    console.log(error); alert(error);
                })
            endpasses();
        }
    }

    useEffect(() => {
        refresh3();
    }, []);


    async function refresh3() {

        if (typeof currentsessionid != "undefined") {
            const docRef = doc(firebase, "classsessions", currentsessionid);

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                ifitshtere();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            console.log("THIIIIS was NOW RUN")

        }
    }


    useEffect(() => {
        console.log("Here is the classid", classid)
        setIdofclass(classid)
    }, []);



    async function addproblembehavior() {

        const docRef = await addDoc(collection(firebase, "Expectations"), {
            classid: classid,
            teacherid: id,
            code: code,
            description: description,


        }).then(async (userRec) => {
            let user = userRec.id;
            await updateDoc(doc(firebase, "Expectations", user), {
                id: user
            }).catch((error) => {
                console.log(error); alert(error);
            });

        }).then(async (userRec) => {
            alert("You Have Added A Target Behavior.")
        })
    }

    return (
        <SafeAreaView style={styles.largercontainer}>
            <View style={styles.container1}>
                <Text style={styles.error}>{coursename}, Section {section} </Text>
            </View>
            <KeyboardAvoidingView
                style={styles.container2}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={80}>
                <ScrollView contentContainerStyle={styles.container}>

                    <TextInput
                        style={styles.Newrow}
                        placeholder="Title of Rule/Behavior"
                        placeholderTextColor="#BEBEBE"
                        onChangeText={(text) => setCode(text)}
                        value={code}
                        maxLength={25} />
                    <TextInput
                        style={styles.Newrowy}
                        placeholder="Description of Rule/Behavior"
                        placeholderTextColor="#BEBEBE"
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                        width={250}
                        multiline={true}
                    />

                </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.section3}>
         
                {typeof code != "undefined" && typeof description != "undefined" ? <Text style={styles.paragraph2} onPress={addproblembehavior} >Add Behavior</Text> : <Text style={styles.paragraph2}>Please complete both fields</Text>}

                <Text style={styles.paragraph2}>___________________ {'\n'}</Text>

                <Text style={styles.paragraph2} onPress={() => navigation.navigate("Mainmenuteacher", {
                    idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit,
                    ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                    email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, exclusivetime: exclusivetime, drinkofwater: drinkofwater, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, bathroompassduration: bathroompassduration, drinkpassduration: drinkpassduration, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, currentsessionid: currentsessionid, sessionending: sessionending, maxstudentsbathroom: maxstudentsbathroom, linkedclass:linkedclass

                })} >Return to Main Menu </Text>
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
        height: "100%",
        backgroundColor: "#000"
    },
    container1: {
        backgroundColor: '#000',
        width: "100%",
        justifyContent: "center",
        height: "10%",
    },

    container2: {
        height: "25%",
        backgroundColor: '#000',
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
        height: "30%",
    },
    section3: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: "#000",
        color: "#fff",
        justifyContent: "center",
        height: "55%",

    },

    error: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#000',
        color: "#fff",
        textAlign: "center",
        margin: "2%"

    },
    paragraph6: {
        color: "#fff",
        fontSize: 17,
        marginRight: 7


    },
    Newrowy: {
        backgroundColor: '#013469',
        margin: 10,
        textAlign: "center",
        fontSize: 18,
        padding: 4,
        borderColor: "#E43522",
        borderWidth: 2,
        justifyContent: "center",
        color: "#fff",
        borderRadius: 30,
        maxWidth: "90%",
        maxHeight: "50%",
        width: "90%",

    },
    Newrow: {
        textAlign: "center",
        width: "90%",
        padding: 4,
        backgroundColor: '#013469',
        margin: 10,
        textAlign: "center",
        fontSize: 18,
        borderColor: "#E43522",
        borderWidth: 2,
        justifyContent: "center",
        color: "#fff",
        borderRadius: 20,
        height: 30,

    },

});