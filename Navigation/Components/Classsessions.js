import React, { useState, useEffect } from "react";
import CryptoES from "crypto-es";
import Results from "./Subcomponents/ResultsContainer";
import StateResults from "./Subcomponents/StateResultsContainer";
import TownResults from "./Subcomponents/TownResultsContainer";
import SignIn from "./SignIn";
import Classes from './Mapofclasssessions/Mapofclasssessions';


import {
    useNavigation,
    NavigationContainer,
    DrawerActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Alert, SafeAreaView, Text, View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';

import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion, orderBy } from "@firebase/firestore";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import AndroidSwipeRefreshLayoutNativeComponent from "react-native/Libraries/Components/RefreshControl/AndroidSwipeRefreshLayoutNativeComponent";

const height = Dimensions.get("window").height;

export default function SignUp({ route, navigation }) {

    const { idofcurrentclass, currentsessionid, endlastclass, userinformation, school, state, town, role, id, bathroompasslimit, ifnegativeplusminus, nonbathroompasslimit, exclusivephonepassmaxstudents, exclusivephonepasstimelmit, lengthofclass, classiscurrent, nameofcurrentclass, starttimeofcurrentclass, classid, coursename, section, location, teacherid, teacheriscalled,
        email, starttime, lengthofclassesforacomputer, inpenalty, stoptimepenalty, starttimepenalty, totaltimepenalty, alreadyused, teacher, Selectedclassdestination, youcangetpass, currentlocation, locationdestination, firstname, lastname, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, lengthofclasses, endlastclasssubstitute, thelastid, phonepassduration, overunder, drinkpassduration, bathroompassduration, otherpassduration, maxstudentsphonepass, donewithworkphonepass, consequenceid, sessionending, maxstudentsbathroom, drinkpasslimit, linkedclass
    } = route.params;
    console.log(currentsessionid, "here is the currentsessionid", "this is the class id", classid, "this is the class id", currentsessionid, "starttime = ", starttime, "userinformation now in ClassesSessions.js", userinformation, "userinformation now in CLassesTeacher.js");

    const [userdata, setUserdata] = useState([]);
    const [classesarray, setClassesarray] = useState([]);
    const [selectedclass, setSelectedclass] = useState("");

    const [idselected, setIdselected] = useState("");

    const [showspinner, setShowspinner] = useState(true);
    const [classtrue, setClasstrue] = useState(false)
    const [classbegin, setclassbegin] = useState("");
    const [duration, setduration] = useState(0);
    const [sessionended, setSessionended] = useState(false);

    const [idsofpasses, setIdsofpasses] = useState();
    const [totalclasstime, setTotalclasstime] = useState();

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
                console.log(idsofpasses[s], "this is the object");

                updateDoc(doc(firebase, "passes", idsofpasses[s].id), {

                    returned: idsofpasses[s].endofclasssession,
                    timereturned: r.toLocaleTimeString([], { hour12: true }),
                    returnedbeforetimelimit: idsofpasses[s].expectedreturn > idsofpasses[s].endofclasssession,
                    differenceoverorunderinminutes: (idsofpasses[s].expectedreturn - idsofpasses[s].endofclasssession) / 60000,


                }).catch((error) => {
                    console.log(error); alert("1", error);
                })
            }
        }
    }, [idsofpasses]);


    const createTwoButtonAlert = () =>


        Alert.alert('Please be aware.', 'This will permanently remove this session along with all of its associated passes and consequences.', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete Session', onPress: () => deleteToDo() },
        ]);



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


    const createTwoButton = () => {


        Alert.alert('Please be aware.', 'This will permanently remove all of your current sessions from the current class along with their associated passes and consequences.', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete Sessions', onPress: () => deleteAll() },
        ]);

    }


    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user && id) {

            getlocationsqrcodes();

        } else {
            console.log("kicking me out");
        }
    });


    useEffect(() => {
        console.log("THIS IS THE IDddddddddddddd");
        getlocationsqrcodes();
    }, []);



    async function getlocationsqrcodes() {

        if (userdata.length === 0) {
            const q = query(collection(firebase, "classsessions"), where("classesbeingtaughtid", "==", classid), orderBy("classbeginnumber", "desc"));

            const querySnapshot = await getDocs(q)


                .then(function (snapshot) {
                    let numberarray = []
                    let statusarray = []
                    let array = []
                    snapshot.forEach(doc => {
                        let number = doc.data().lengthofclass;
                        if (number > lengthofclasses) {
                            numberarray.push(lengthofclasses) 
                            array.push(doc.data())
                            statusarray.push(doc.data().status) 
                        } else {
                        numberarray.push(number)
                        array.push(doc.data())
                        statusarray.push(doc.data().status)
                        }
                    })
                    if (array.length === 0) {
                        setUserdata([{ classname: "You haven't Registered" }])
                    } else {
                        setUserdata(array);
                        setTotalclasstime(numberarray.reduce((a, b) => a + b, 0))
                    }


                    if (statusarray.includes("Happening Now")) {
                        setSessionended(false)
                    } else {
                        setSessionended(true)
                    }


                })
            setShowspinner(false);

        }
    };



    useEffect(() => {
        if (coursename) {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() =>
                        navigation.navigate("Mainmenuteacher", {

                            idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit: drinkpasslimit,
                            ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration,
                            overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, currentsessionid: currentsessionid, sessionending: sessionending,
                            idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit: drinkpasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass

                        })}
                    >

                        <Text accessibilityLabel="Guest" style={styles.error5}>
                            Main Menu
                        </Text>
                    </TouchableOpacity>
                ),
            });
        } else {

            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() =>
                        navigation.navigate("Mainmenuteacher", {
                            idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit: drinkpasslimit,
                            ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, bathroompassduration: bathroompassduration, drinkpassduration: drinkpassduration,
                            overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, currentsessionid: currentsessionid, sessionending: sessionending, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass

                        })}
                    >

                        <Text accessibilityLabel="Guest" style={styles.error5}>
                            Main Menu
                        </Text>
                    </TouchableOpacity>
                ),
            });

        }

    }, [coursename]);






    useEffect(() => {
        let classbegin = selectedclass.classbegin;
        let duration = selectedclass.lengthofclass;
        let idselect = selectedclass.id;
        setduration(duration);
        setclassbegin(classbegin);
        setIdselected(idselect);
    }, [selectedclass]);

    // Deletes a class and then reruns classes that are still there.

    const deleteToDo = () => {

        deletesession();
        deleteitspasses();
        deletitsconsequences();

    };


    useEffect(() => {
        console.log(userdata.length, "Hello AGAIN")
        if (userdata.length === 0) {
            getlocationsqrcodes()
            console.log(userdata, "HELLO AGAIN")
        }
    }, [userdata]);

    const deletesession = async () => {

        const userDoc = doc(firebase, "classsessions",
            idselected)
        console.log("HEEEEEEEEYYYYY,", idselected, "HEEEEEEEEEEEEy");

        await deleteDoc(userDoc)

            .then(function () {
               setUserdata([]);

            })
    };

    const deleteitspasses = async () => {
        const s = query(collection(firebase, "passes"), where("classsessionid", "==", idselected));

        const querySnapshot = await getDocs(s)

            .then(function (snapshot) {

                snapshot.forEach(docs => {
                    deleteDoc(doc(firebase, "passes", docs.data().id))
                })
                console.log("Deleted Sessions of class?")
            })

    }

    const deletitsconsequences = async () => {
        const s = query(collection(firebase, "consequencephoneuse"), where("sessionid", "==", idselected));

        const querySnapshot = await getDocs(s)

            .then(function (snapshot) {

                snapshot.forEach(docs => {
                    deleteDoc(doc(firebase, "consequencephoneuse", docs.data().id))
                })
                console.log("Deleted Sessions of class?")
            })

    }

    const deleteAll = () => {

        deleteAllsessions();
        deleteAllpasses();
        deletAllconsequences();

    };


    const deleteAllsessions = async () => {
        const q = query(collection(firebase, "classsessions"), where("classesbeingtaughtid", "==", classid));

        const querySnapshot = await getDocs(q)

            .then(function (snapshot) {

                snapshot.forEach(docs => {
                    deleteDoc(doc(firebase, "classsessions", docs.data().id))
                })
                console.log("Did anything change?")
            })
            .then(function () {
                setUserdata([{ classname: "You haven't Registered" }])
                setSessionended(true);

            })

    }
    const deleteAllpasses = async () => {
        const v = query(collection(firebase, "passes"), where("classid", "==", classid));

        const querySnapshot = await getDocs(v)

            .then(function (snapshot) {

                snapshot.forEach(docs => {
                    deleteDoc(doc(firebase, "passes", docs.data().id))
                })
                console.log("Did anything change?")
            })

    }

    const deletAllconsequences = async () => {
        const v = query(collection(firebase, "consequencephoneuse"), where("classid", "==", classid));

        const querySnapshot = await getDocs(v)

            .then(function (snapshot) {

                snapshot.forEach(docs => {
                    deleteDoc(doc(firebase, "consequencephoneuse", docs.data().id))
                })
                console.log("Did anything change?")
            })

    }


    return (
        <SafeAreaView style={styles.largercontainer}>
            <View style={styles.container1}>
                {coursename ? <View><Text style={styles.error}>Now Active:{'\n'}{coursename} - {section}  ({totalclasstime} min.)</Text></View> : <View><Text style={styles.error}>No Class is Active</Text></View>}
            </View>

            <View style={styles.container2}>

                <Classes userdata={userdata} id={id} setSelectedclass={setSelectedclass} selectedclass={selectedclass} idselected={idselected} lengthofclasses={lengthofclasses}/>

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

                {userdata.map((item) => item.classname) == "You haven't Registered" ? <Text style={styles.paragraph2}>   </Text> : idselected ? <Text style={styles.paragraph2} onPress={(e) => createTwoButtonAlert()} >Delete Selected Session </Text> : <Text style={styles.paragraph2} onPress={(e) => createTwoButton()}>Delete All Sessions </Text>}

                <Text style={styles.paragraph2}>___________________ {'\n'}</Text>

                <Text style={styles.paragraph2} onPress={() => navigation.navigate("Mainmenuteacher", {
                    idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit: drinkpasslimit,
                    ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                    email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, bathroompassduration: bathroompassduration, drinkpassduration: drinkpassduration, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, currentsessionid: currentsessionid, sessionending: sessionending, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass

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
    container2: {
        height: "35%",
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
