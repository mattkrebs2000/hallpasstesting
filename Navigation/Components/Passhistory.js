import React, { useState, useEffect } from "react";

import CryptoES from "crypto-es";
import Results from "./Subcomponents/ResultsContainer";
import StateResults from "./Subcomponents/StateResultsContainer";
import TownResults from "./Subcomponents/TownResultsContainer";
import SignIn from "./SignIn";
import Passes from './MapofClassesTeacher/Mapofpasshistory/Mapofpasshistory';


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


const height = Dimensions.get("window").height;

export default function SignUp({ route, navigation }) {

    const { idofcurrentclass, currentsessionid, endlastclass, userinformation, school, state, town, role, bathroompasslimit, ifnegativeplusminus, nonbathroompasslimit, exclusivephonepassmaxstudents, exclusivephonepasstimelmit, lengthofclass, classiscurrent, nameofcurrentclass, starttimeofcurrentclass, classid, coursename, section, location, teacherid, teacheriscalled,
        email, starttime, lengthofclassesforacomputer, inpenalty, stoptimepenalty, starttimepenalty, totaltimepenalty, alreadyused, teacher, Selectedclassdestination, youcangetpass, currentlocation, locationdestination, firstname, lastname, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, lengthofclasses, endlastclasssubstitute, thelastid, phonepassduration, overunder, drinkpassduration, bathroompassduration, otherpassduration, maxstudentsphonepass, donewithworkphonepass, consequenceid, id, sessionending, maxstudentsbathroom, totalclasstime, idselected, penaltyminutes, adjustments, abc, drinkpasslimit, linkedclass
    } = route.params;
    console.log("this is the class id", classid, "this is the class id", currentsessionid, "starttime = ", starttime, "userinformation now in ClassesSessions.js", userinformation, "userinformation now in CLassesTeacher.js");

    const [userdata, setUserdata] = useState([]);
    const [classdata, setClassdata] = useState();
    const [classesarray, setClassesarray] = useState([]);
    const [selectedclass, setSelectedclass] = useState("");
    const [idselected2, setIdselected2] = useState();

    const [showspinner, setShowspinner] = useState(true);
    const [classtrue, setClasstrue] = useState(false)
    const [classbegin, setclassbegin] = useState("");
    const [duration, setduration] = useState(0);
    const [sessionended, setSessionended] = useState(false);
    const [allclasses, setAllclasses] = useState(false)

    const [idsofpasses, setIdsofpasses] = useState();
    const [empty, setEmpty] = useState();

    const [newoverunder, setNewoverunder] = useState();

    useEffect(() => {
        console.log(newoverunder, "this is the newoverunder");
    }, [newoverunder]);

    useEffect(() => {
        console.log(newoverunder, "this is the newoverunder");
    }, []);

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
                        setIdsofpasses(array); console.log(array, "This is the pass ");
                    }
                })
        }

    }
    useEffect(() => {
        if (typeof idsofpasses != "undefined") {
            const t = Date.now();

            for (let s = 0; s < idsofpasses.length; s++) {

                const r = new Date(idsofpasses[s].endofclasssession)

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

    const switchthis = () => {
        if (allclasses === true) {
            setAllclasses(false)
        } else {
            setAllclasses(true)
        }
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


    useEffect(() => {
        setEmpty(false);
    }, []);

    useEffect(() => {
        console.log(empty, "setEmpgy")
    }, [empty]);

    const createTwoButtonAlert = () =>


        Alert.alert('Please be aware.', 'This will permanently remove this pass from the system.', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete Pass', onPress: () => deleteToDo() },
        ]);

    const createTwoButton = () => {


        Alert.alert('Please be aware.', 'This will permanently remove all of this students passes (for this class) from the system.', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete Passes', onPress: () => deleteAll() },
        ]);

    }

    useEffect(() => {
        console.log("THIS IS THE IDddddddddddddd");
        getlocationsqrcodes();
    }, []);

    useEffect(() => {
        const filteredData = userdata.filter((person) => {
            return person.classid === classid || person.linkedclass === classid;
        })
        setClassesarray(filteredData)
    }, [userdata]);

    useEffect(() => {

        if (classesarray.length === 0) {
            setClassesarray([{ classname: "You haven't Registered" }]);
            setEmpty(true);
            setNewoverunder(0);

        } else {
            figureoutoverunder();
        }

    }, [classesarray]);

    const figureoutoverunder = () => {

        const array = [];

        for (let w = 0; w < classesarray.length; w++) {
            if (classesarray[w].returned < Date.now()) {
                array.push(classesarray[w].differenceoverorunderinminutes)

            }
        }
        setNewoverunder(array.reduce((a, b) => a + b, 0));
    }




    async function getlocationsqrcodes() {

        if (userdata.length === 0) {
            const q = query(collection(firebase, "passes"), where("studentid", "==", idselected), orderBy("endofclasssession", "desc"));



            const querySnapshot = await getDocs(q)


                .then(function (snapshot) {
                    let statusarray = []
                    let array = []
                    snapshot.forEach(doc => {
                        array.push(doc.data())
                        statusarray.push(doc.data().status)

                    })
                    if (array.length === 0) {
                        setUserdata([{ classname: "You haven't Registered" }]);
                        setEmpty(true);

                    } else {
                        setIdselected2();
                        setEmpty(false);
                        setUserdata(array);
                        console.log("HEEEEEEEEYYYYY,", idselected, "HEEEEEEEEEEEEy");
                    }


                    if (statusarray.includes("Happening Now")) {
                        setSessionended(false)
                    } else {
                        setSessionended(true)
                    }


                })

            console.log("Was this run", userdata, "Was this run")
            setShowspinner(false);

        }
    };



    useEffect(() => {
        if (coursename) {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.navigate("Studentsenrolled", {
                        idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, drinkpasslimit: drinkpasslimit, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                        email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, drinkpassduration: drinkpassduration, phonepassduration: phonepassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom,
                        newoverunder: newoverunder, penaltyminutes: penaltyminutes, adjustments: adjustments, abc: abc, linkedclass:linkedclass
                    })}

                    >

                        <Text accessibilityLabel="Guest" style={styles.error5}>
                            Students
                        </Text>
                    </TouchableOpacity>
                ),
            });
        } else {

            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.navigate("Studentsenrolled", {
                        idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                        email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, drinkpassduration: drinkpassduration, phonepassduration: phonepassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom,
                        newoverunder: newoverunder, penaltyminutes: penaltyminutes, adjustments: adjustments, abc: abc, linkedclass:linkedclass
                    })}>

                        <Text accessibilityLabel="Guest" style={styles.error5}>
                            Students
                        </Text>
                    </TouchableOpacity>
                ),
            });

        }

    }, [coursename]);



    // useEffect(() => {

    //     if (typeof classesarray != "undefined") {
    // console.log(classesarray[0].classname, "this is the classesarrayYYYYYY")
    //     }
    // }, [classesarray]);


    useEffect(() => {
        let classbegin = selectedclass.classbegin;
        let duration = selectedclass.lengthofclass;
        let idselect = selectedclass.id;


        setduration(duration);
        setclassbegin(classbegin);

        setIdselected2(idselect);


        console.log(selectedclass, "This is the selected class", selectedclass.id);
    }, [selectedclass]);



    const deleteToDo = () => {
        deleteitspasses();
    };

    const deleteAll = () => {
        deleteAllpasses();
    };


    const deleteitspasses = async () => {

        const userDoc = doc(firebase, "passes",
            idselected2)


        await deleteDoc(userDoc)
            .then(async () => {
                setUserdata([]);
            })
    };

    useEffect(() => {
        if (userdata.length === 0) {
            getlocationsqrcodes();
        }
    }, [userdata]);

    const deleteAllpasses = async () => {
        const v = query(collection(firebase, "passes"), where("studentid", "==", idselected), where("classid", "==", classid));

        const querySnapshot = await getDocs(v)

            .then(function (snapshot) {

                snapshot.forEach(docs => {
                    deleteDoc(doc(firebase, "passes", docs.data().id))
                })
                console.log("Did anything change?")
            })

    }

    return (
        <SafeAreaView style={styles.largercontainer}>
            <View style={styles.container1}>
                {allclasses === true ? <View><TouchableOpacity><Text style={styles.error} onPress={() => switchthis()}>Passes/Tardies:{'\n'}{firstname} {lastname}{'\n'}All Classes</Text></TouchableOpacity></View> : <View><TouchableOpacity><Text style={styles.error} onPress={() => switchthis()}>Passes/Tardies:{'\n'}{firstname} {lastname} - {coursename}{'\n'}Over/Under Sum: {(Math.round(newoverunder * 10)) / 10}</Text></TouchableOpacity></View>}
            </View>

            <View style={styles.container2}>

                <Passes userdata={userdata} id={id} setSelectedclass={setSelectedclass} selectedclass={selectedclass} idselected={idselected2} classesarray={classesarray} allclasses={allclasses} />

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

                {idselected2 && allclasses === false && empty != true ? <Text style={styles.paragraph2} onPress={(e) => createTwoButtonAlert()} >Delete Pass/Tardy </Text> : idselected2 && allclasses === false && empty === true
                    ? <Text style={styles.paragraph2}>   </Text> : allclasses === false ? <Text style={styles.paragraph2} onPress={(e) => createTwoButton()}>Delete All Passes/Tardies </Text> : <Text style={styles.paragraph2}>   </Text>}

                <Text style={styles.paragraph2}>___________________ {'\n'}</Text>

                <Text style={styles.paragraph2} onPress={() => navigation.navigate("Studentsenrolled", {
                    idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled, teacheriscalled: teacheriscalled,
                    email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, drinkpassduration: drinkpassduration, phonepassduration: phonepassduration, overunder: overunder, bathroompassduration: bathroompassduration, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom,
                    newoverunder: newoverunder, penaltyminutes: penaltyminutes, adjustments: adjustments, abc: abc, linkedclass:linkedclass
                })}  >Back To Students </Text>


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
        height: "16%",
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
        height: "49%",

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
