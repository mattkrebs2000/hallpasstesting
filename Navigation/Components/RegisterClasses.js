import React, { useState, useEffect } from "react";

import CryptoES from "crypto-es";
import Results from "./Subcomponents/ResultsContainer";
import StateResults from "./Subcomponents/StateResultsContainer";
import TownResults from "./Subcomponents/TownResultsContainer";
import SignIn from "./SignIn";
// import admin from 'firebase-admin';




import {
    useNavigation,
    NavigationContainer,
    DrawerActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { SafeAreaView, Text, View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

import { auth, firebase, db } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion } from "@firebase/firestore";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";


// import admin from 'firebase-admin';
// import functions from 'firebase-functions';

// admin.initializeApp(functions.config().firebase);

// const db = admin.firestore();


const height = Dimensions.get("window").height;

export default function SignUp({ route, navigation }) {

    const { idofcurrentclass, currentsessionid, endlastclass, userinformation, role, bathroompasslimit, ifnegativeplusminus, nonbathroompasslimit, drinkpasslimit, exclusivephonepassmaxstudents, exclusivephonepasstimelmit, lengthofclass, classiscurrent, nameofcurrentclass, starttimeofcurrentclass, classid, coursename, section, teacherid,
        email, starttime, lengthofclassesforacomputer, inpenalty, stoptimepenalty, starttimepenalty, totaltimepenalty, alreadyused, teacher, Selectedclassdestination, youcangetpass, currentlocation, locationdestination, firstname, lastname, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, lengthofclasses, endlastclasssubstitute, sessionended, thelastid, phonepassduration, overunder, bathroompassduration, drinkpassduration, otherpassduration, maxstudentsphonepass, donewithworkphonepass, consequenceid, id, teacheriscalled, school, state, town, sessionending,maxstudentsbathroom, linkedclass
    } = route.params;
    console.log(drinkofwater, drinkpassduration,drinkpasslocal," Drink of Water ,Register Classes ");

    const [location, setLocation] = useState("");
    const [classname, setClassname] = useState("");

    const [localfirstname, setLocalfirstname] = useState("");
    const [locallastname, setLocallastname] = useState("");
    const [arrayofdocs, setArrayofdocs] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [iscalled, setIscalled] = useState("");
    const [period, setPeriod] = useState("");


    const [howmanyclasses, setHowmanyclasses] = useState(0);
    const [idsofpasses, setIdsofpasses] = useState();

    const [lengthofclasslocal, setLengthofclasslocal] = useState();
    const [bathroompasslocaal, setBathroompasslocal] = useState();
    const [nonbathroompasslocal, setNonbathroompasslocal] = useState();
    const [phonepasslocal, setPhonepasslocal] = useState();
    const [drinkpasslocal, setDrinkpasslocal] = useState(); 
    const [maxstudentsonphonepasslocal, setMaxstudentonphonepasslocal] = useState();
    const [donewithworkphonepasslocal, setDonewithworkphonepasslocal] = useState();


    useEffect(() => {
     console.log(drinkpasslocal, "drinpasslocal is here")
}, [drinkpasslocal]);

    useEffect(() => {
        getpresets();
}, []);

    const getpresets = () => {

        console.log("1Watts this RUN?");
        if (id) {
            console.log("2Watts this RUN?");
            const docRef = doc(firebase, "users", id);

            const docData = getDoc(docRef)

                .then((docSnap) => {
                  
                    let object = docSnap.data();

                    setLengthofclasslocal(object.lengthofclasses);
                    setBathroompasslocal(object.bathroompass);
                    setNonbathroompasslocal(object.nonbathroompass);
                    setPhonepasslocal(object.phonepass); 
                    setDrinkpasslocal(object.drinkpass);
                    setMaxstudentonphonepasslocal(object.maxstudentsphonepass);
                    setDonewithworkphonepasslocal(object.donewithworkphonepassavailable);

                })
                console.log("3Watts this RUN?");
        }
    }



    useEffect(() => {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() =>
                        navigation.navigate("Mainmenuteacher", {
                            idofcurrentclass: idofcurrentclass, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, nonbathroompasslimit: nonbathroompasslimit,drinkpasslimit:drinkpasslimit, 
                            ifnegativeplusminus: ifnegativeplusminus, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, coursename: coursename, section: section, location: location, teacherid: id, teacheriscalled: teacheriscalled,
                            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, exclusivetime: exclusivetime, drinkofwater:drinkofwater,donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, bathroompassduration: bathroompassduration, drinkpassduration:drinkpassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, currentsessionid: currentsessionid, sessionending: sessionending, maxstudentsbathroom: maxstudentsbathroom,
                            classid: classid, linkedclass:linkedclass
                        })}
                    >

                        <Text accessibilityLabel="Guest" style={styles.error5}>
                            Main Menu
                        </Text>
                    </TouchableOpacity>
                ),
            });

    }, []);



    const endpasses = () => {

        if (sessionending < Date.now()) {
            const q = query(collection(firebase, "passes"), where("classsessionid", "==", currentsessionid), where("returned", "==", 0));

            const querySnapshot = getDocs(q)
                .then(function (snapshot) {
                    let array = []
                    snapshot.forEach(doc => {
                        array.push({id: doc.data().id, expectedreturn: doc.data().whenlimitwillbereached,endofclasssession: doc.data().endofclasssession })
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


    const signoutfunction = () => {
        auth.signOut();
        console.log("Someone has just been logged out")
    }


    const ifitshtere = () => {
        if (sessionending < Date.now()) {
            updateDoc(doc(firebase, "classsessions", currentsessionid), {
                status: "Completed"
            })
                .catch(error => {
                    console.log(error); alert("2", error);
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



    async function editorcreate2() {

        const usersRef = firebase;

        const docRef = await addDoc(collection(firebase, "classesbeingtaught"), {
            classname: classname,
            location: location,
            teacherid: id,
            school: school,
            town: town,
            state: state,
            teacheriscalled: teacheriscalled,
            period: period,
            passesareavailable: false,
            acceptingincomingstudents: true,
            ledby: role,
            timelimitbathroompass: bathroompasslocaal,
            timelimitnonbathroompass: nonbathroompasslocal,
            phonepassexclusivetime:phonepasslocal,
            drinkofwater: drinkpasslocal,
            ifoverundernegativepassaccess:1,
            exclusivephonepassmaxstudents: maxstudentsonphonepasslocal,
            bathroompassmaxstudents: 1, 
            donewithworkphonepassavailable: donewithworkphonepasslocal,
            inusebathroompass: 0,
            inuseexclusivephonepass: 0,
            totalinlineforbathroom: 0,
            totalinlineforexclusivephone: 0,
            lengthofclassescomputer: (lengthofclasslocal * 60000),
            lengthofclasses: lengthofclasslocal,
            linkto: "Not Linked"

        }).then(async (userRec) => {
            console.log("IS THere ANything Here", userRec.id, "IS THERE ANYTHING HERE?")
            const user = userRec.id;
            await updateDoc(doc(firebase, "classesbeingtaught", user), {
                id: user,
            }).catch((error) => {
                console.log(error); alert(error);
            });
        }).then(async () => {
            await navigation.navigate("Mainmenuteacher", {
                idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus:ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit:drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater:drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, bathroompassduration: bathroompassduration, drinkpassduration:drinkpassduration, 
                overunder:overunder,otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom:maxstudentsbathroom, linkedclass:linkedclass
            });
        })
            .catch((error) => {
                console.log(error); alert(error);
            });
    }


    return (
        <SafeAreaView style={styles.largercontainer}>
            <View style={styles.container1}>
                <Text style={styles.error}> {'\n'} {'\n'}Input the period, name and location {'\n'}Of a class that you teach.</Text>
            </View>
            <KeyboardAvoidingView
                style={styles.container2}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={80}>
                <View contentContainerStyle={styles.container}>
                    <View style={styles.textContainer}>
                        <TextInput
                            style={styles.Newrowz}
                            placeholder="Period"
                            placeholderTextColor="#BEBEBE"
                            onChangeText={(text) => setPeriod(text)}
                            value={period}
                        />
                        <TextInput
                            style={styles.Newrowy}
                            placeholder="Title of Class"
                            placeholderTextColor="#BEBEBE"
                            onChangeText={(text) => setClassname(text)}
                            value={classname}
                        />
                        <TextInput
                            style={styles.Newrowz}
                            placeholder="Location"
                            placeholderTextColor="#BEBEBE"
                            onChangeText={(text) => setLocation(text)}
                            value={location}
                        />

                    </View>


                </View>
            </KeyboardAvoidingView>
            <View style={styles.section3}>
                {period && classname && location ? <Text style={styles.paragraph2} onPress={editorcreate2} >Add this Class</Text> : <Text style={styles.paragraph2} >Complete All Fields Before Adding</Text>}
                <Text>{'\n'}</Text>
                <Text style={styles.paragraph4} onPress={() => navigation.navigate("ClassesTeacher", {
                    idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit,  drinkpasslimit:drinkpasslimit, ifnegativeplusminus:ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                    email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater:drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration:drinkpassduration, bathroompassduration: bathroompassduration, overunder:overunder,otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom:maxstudentsbathroom, linkedclass:linkedclass
                })}>See Your Classes</Text>
                <Text>{'\n'}</Text>

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
        height: 155,
        backgroundColor: '#000',
        width: "100%",
        justifyContent: "center",
    },
    container2: {
        height: "20%",
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
        fontSize: 16,
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
        fontSize: 16,
        borderColor: "#E43522",
        borderWidth: 4,
        justifyContent: "center",
        color: "#fff",
        flex: .5,
    },

    paragraph2: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        backgroundColor: '#000000',
        color: "#fff",
        height: "5%",
        justifyContent: "center"
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
        marginTop: 30,
    },

    error: {
        fontSize: 17,
        backgroundColor: '#000000',
        color: "#fff",
        height: "100%",
        textAlign: "center",
        marginTop: "10%",
        marginLeft: "3%",
        marginRight: "3%",
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
    Newrowz: {
        backgroundColor: '#013469',
        margin: 5,
        textAlign: "center",
        fontSize: 16,
        width: "70%",
        borderColor: "#E43522",
        borderWidth: 2,
        justifyContent: "center",
        color: "#fff",
        borderRadius: 10,
        flex: .55
    },
    Newrowy: {
        backgroundColor: '#013469',
        margin: 5,
        textAlign: "center",
        fontSize: 16,
        width: "70%",
        borderColor: "#E43522",
        borderWidth: 2,
        justifyContent: "center",
        color: "#fff",
        borderRadius: 10,
        flex: 1
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

});

