import React, { useState, useEffect } from "react";
import Passes from './Mapofclasspasses/Mapofclasspasses';

import { Alert, SafeAreaView, Text, View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Pressable } from 'react-native';

import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion, orderBy, limit } from "@firebase/firestore";


const height = Dimensions.get("window").height;

export default function SignUp({ route, navigation }) {

    const { idofcurrentclass, currentsessionid, endlastclass, userinformation, school, state, town, role, bathroompasslimit, ifnegativeplusminus, nonbathroompasslimit, exclusivephonepassmaxstudents, exclusivephonepasstimelmit, lengthofclass, classiscurrent, nameofcurrentclass, starttimeofcurrentclass, classid, coursename, section, location, teacherid, teacheriscalled,
        email, starttime, lengthofclassesforacomputer, inpenalty, stoptimepenalty, starttimepenalty, totaltimepenalty, alreadyused, teacher, Selectedclassdestination, youcangetpass, currentlocation, locationdestination, firstname, lastname, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, lengthofclasses, endlastclasssubstitute, thelastid, phonepassduration, overunder, drinkpassduration, bathroompassduration, otherpassduration, maxstudentsphonepass, donewithworkphonepass, consequenceid, id, sessionending, maxstudentsbathroom, totalclasstime, idselected, penaltyminutes, adjustments, abc, drinkpasslimit, linkedclass
    } = route.params;
    console.log(currentmax2, "current max", maxstudentsbathroom, "maxstudentsbathroom", totalinlineforbathroom, "totalinline", howmany, "howmanypeopleinline");

    const [userdata, setUserdata] = useState([]);
    const [classdata, setClassdata] = useState();
    const [selectedclass, setSelectedclass] = useState("");
    const [idselected2, setIdselected2] = useState();
    const [empty, setEmpty] = useState();

    const [showspinner, setShowspinner] = useState(true);
    const [classtrue, setClasstrue] = useState(false)
    const [classbegin, setclassbegin] = useState("");
    const [duration, setduration] = useState(0);
    const [sessionended, setSessionended] = useState(false);

    const [idsofpasses, setIdsofpasses] = useState();

    const [newoverunder, setNewoverunder] = useState();
    const [returnedzero, setReturnedzero] = useState();
    const [limitreached, setLimitreached] = useState();
    const [studentid, setStudentid] = useState();
    const [dest, setDest] = useState();
    const [howmany, setHowmanypeople] = useState();
    const [leftclassonpass, setLeftclassonpass] = useState();
    const [userdatabefore, setUserdatabefore] = useState();
    const [localpercent, setLocalpercent] = useState();
    const [test, setTest] = useState([]);
    const [helpgiven, setHelpgiven] = useState(false);
    const [studentfirstname, setStudentfirstname] = useState();

    const [currentmax2, setCurrentmax2] = useState();

    useEffect(() => {
        setCurrentmax2(maxstudentsbathroom);
    }, []);

    const letthenextstudentgo = () => {
        setCurrentmax2(currentmax2 + 1);
    }

    const reducemaxbathroom = () => {
        if (currentmax2 > 1) {
            setCurrentmax2(currentmax2 - 1);
        }
    }

    useEffect(() => {
        if (currentmax2 > -2) {
            updateDoc(doc(firebase, "classesbeingtaught", classid), {
                bathroompassmaxstudents: currentmax2
            }).catch((error) => {
                console.log(error); alert(error);
            })
        } else {
            null
        }
    }, [currentmax2]);


    useEffect(() =>
        onSnapshot(doc(firebase, "classesbeingtaught", classid), (doc) => {
            checkDatabaseData2();
            getlocationsqrcodes();
        }
        ), []);



    useEffect(() => {
        let classbegin = selectedclass.classbegin;
        let duration = selectedclass.lengthofclass;
        let idselect = selectedclass.id;
        let returned = selectedclass.returned;
        let limit = selectedclass.whenlimitwillbereached;
        let student = selectedclass.studentid;
        let destination = selectedclass.destination;
        let left = selectedclass.leftclass;

        let first = selectedclass.firstname;

        setStudentfirstname(first);
        setStudentid(student);
        setDest(destination);
        setLeftclassonpass(left);

        setReturnedzero(returned);
        setduration(duration);
        setclassbegin(classbegin);
        setLimitreached(limit);

        setIdselected2(idselect);

    }, [selectedclass]);

    useEffect(() => {
        if (typeof classid != "undefined") {
            checkDatabaseData2();
        }
        setHelpgiven(false);
    }, []);

    useEffect(() => {
        setHelpgiven(false);
    }, [idselected2]);



    useEffect(() => {
        console.log(howmany, "howmanypeople")
    }, [howmany]);


    async function checkDatabaseData2() {
        console.log("12Did it get this far? ");

        const docRef = doc(firebase, "classesbeingtaught", classid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setHowmanypeople(docSnap.data().inusebathroompass)
        } else {
            // doc.data() will be undefined in this case
        }
    };


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
        console.log("THIS IS THE IDddddddddddddd");
        getlocationsqrcodes();
    }, []);


    useEffect(() => {
        console.log("THIS IS THE IDddddddddddddd");
        getlocationsqrcodes();
    }, [test]);





    useEffect(() => {
        userdata.forEach(obj => {
            console.log(obj.id, obj.differenceoverorunderinminutes, "THI SI SIS THE USSERDATA")
        });
    }, [userdata]);



    // useEffect(() => {

    //     if (typeof userdatabefore != "undefined") {
    //         const filteredData = userdatabefore.filter((person) => {
    //             if (person.timepassinitiated > 0) {
    //                 return person.timepassinitiated > (Date.now() - 432000000)
    //             } else {
    //                 return person.leftclass > (Date.now() - 432000000);
    //             }
    //         })

    //         setUserdata(filteredData)
    //     }
    // }, [userdatabefore]);


    async function getlocationsqrcodes() {

        if (typeof userdatabefore === "undefined") {

            // Should be changed back to this as soon as "timepassinitiated" is on all pass documnents

            // const q = query(collection(firebase, "passes"), where("classid", "==", classid), orderBy("timepassinitiated", "desc"), limit(20));

            const q = query(collection(firebase, "passes"), where('classesinvolved', 'array-contains-any', [classid]), orderBy("timepassinitiated", "desc"), limit(20));





            // const q = query(collection(firebase, "passes"), where("classid", "==", classid));


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
                        // setIdselected2();

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
            setShowspinner(false);

        }
    };



    useEffect(() => {
        if (coursename) {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.navigate("Mainmenuteacher", {
                        idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, drinkpasslimit: drinkpasslimit, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                        email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, drinkpassduration: drinkpassduration, phonepassduration: phonepassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom,
                        newoverunder: newoverunder, penaltyminutes: penaltyminutes, adjustments: adjustments, abc: abc, linkedclass: linkedclass
                    })}>

                        <Text accessibilityLabel="Guest" style={styles.error5}>
                            Main Menu
                        </Text>
                    </TouchableOpacity>
                ),
            });
        } else {

            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.navigate("Mainmenuteacher", {
                        idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                        email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, drinkpassduration: drinkpassduration, phonepassduration: phonepassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom,
                        newoverunder: newoverunder, penaltyminutes: penaltyminutes, adjustments: adjustments, abc: abc, linkedclass: linkedclass
                    })}>

                        <Text accessibilityLabel="Guest" style={styles.error5}>
                            Main Menu
                        </Text>
                    </TouchableOpacity>
                ),
            });

        }

    }, [coursename]);

    const createTwoButtonAlert = () =>


        Alert.alert('Please be aware.', 'This will permanently remove this pass from the system.', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete Pass', onPress: () => deleteToDo() },
        ]);

    const deleteToDo = async () => {

        const userDoc = doc(firebase, "passes",
            idselected2)

        await deleteDoc(userDoc)
            .then(async () => {
                getlocationsqrcodes();
            })
    };

    async function ReturnStudnet2() {
        if (howmany > 0) {

            await updateDoc(doc(firebase, "classesbeingtaught", classid), {
                inusebathroompass: howmany - 1,
            }).catch((error) => {
                console.log(error); alert(error);
            }).then(async () => {
                console.log("comppleted");
                setHowmanypeople(howmany - 1);
            })
        } else {
            await updateDoc(doc(firebase, "classesbeingtaught", classid), {
                inusebathroompass: 0,
            }).catch((error) => {
                console.log(error); alert(error);
            }).then(async () => {
                console.log("comppleted");
                setHowmanypeople(0);
            })
        }

    }

    async function ReturnStudentFromPass() {

        const r = new Date();
        const t = Date.now();

        const ontime = limitreached > t;

        console.log("2 was this run?,", t, r, "endofclasssession", "newDate")

        const currentdiff = ((limitreached - t) / 60000);

        if (dest === "Bathroom") {
            await updateDoc(doc(firebase, "passes", idselected2), {
                returned: t,
                timereturned: r.toLocaleTimeString([], { hour12: true }),
                returnedbeforetimelimit: ontime,
                differenceoverorunderinminutes: currentdiff,

            }).catch((error) => {
                console.log(error); alert(error);
            }),


                await updateDoc(doc(firebase, "users", studentid), {
                    passid: "",
                    status: "",

                }).catch((error) => {
                    console.log(error); alert(error);
                }),

                await updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    inusebathroompass: howmany - 1,
                }).catch((error) => {
                    console.log(error); alert(error);

                }).then(async () => {
                    console.log("comppleted")
                })
        } else {

            await updateDoc(doc(firebase, "passes", idselected2), {
                returned: t,
                timereturned: r.toLocaleTimeString([], { hour12: true }),
                returnedbeforetimelimit: ontime,
                differenceoverorunderinminutes: currentdiff,

            }).catch((error) => {
                console.log(error); alert(error);
            }),


                await updateDoc(doc(firebase, "users", studentid), {
                    passid: "",
                    status: "",

                }).catch((error) => {
                    console.log(error); alert(error);
                }).then(async () => {
                    console.log("comppleted")
                })
        }
        getlocationsqrcodes();
    }


    async function Sendonpass() {
        await updateDoc(doc(firebase, "classesbeingtaught", classid), {
            removescanneraddbutton: true
        }).catch((error) => {
            console.log(error); alert(error);

        }).then(async (check) => {
            setHelpgiven(true);
            setIdselected2(null);
        }).catch((error) => {
            console.log(error); alert(error);
        });
    }


    useEffect(() => {
        if (typeof userdata != "undefined") {
            setUserdatabefore();
        }
    }, [userdata]);


    return (
        <SafeAreaView style={styles.largercontainer}>
            <View style={styles.container1}>
                <View><TouchableOpacity><Text style={styles.error}>Passes/Tardies:{'\n'}{coursename} -- Bathroom ({howmany}-{currentmax2}) </Text></TouchableOpacity></View>
            </View>

            <View style={styles.container2}>

                <Passes userdata={userdata} id={id} setSelectedclass={setSelectedclass} selectedclass={selectedclass} idselected={idselected2} localpercent={localpercent} test={test} setTest={setTest} />

            </View>
            <ScrollView>
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



                    {idselected2 && leftclassonpass === 0 && helpgiven === false ? <Text style={styles.paragraph2} onPress={(e) => Sendonpass()} >Give Shortcut: Send On Pass</Text> : idselected2 && returnedzero == 0 && helpgiven === false ? <Text style={styles.paragraph2} onPress={() => Sendonpass()}>Give Shortcut: Return Pass</Text> : idselected2 && returnedzero == 0 && helpgiven === true ? <Text style={styles.paragraph2}>{studentfirstname} has Shortcut option</Text> : <Text style={styles.paragraph2}>    </Text>}

                    {idselected2 ? <Text style={styles.paragraph2} onPress={(e) => createTwoButtonAlert()} >Delete Pass/Tardy </Text> : <Text style={styles.paragraph2}>    </Text>}

                    {idselected2 && returnedzero === 0 && leftclassonpass != 0 ? <Text style={styles.paragraph2} onPress={(e) => ReturnStudentFromPass()}>Return Pass</Text> : <Text style={styles.paragraph2} onPress={(e) => ReturnStudnet2()}>Reset Bathroom Availability</Text>}

                    <Pressable>
                        <Text style={styles.paragraph2} onPress={() => letthenextstudentgo()}>Increase Total Number of{'\n'}Students Allowed in Bathroom</Text>
                    </Pressable>
                    {currentmax2 > 1 ? <Pressable onPress={() => reducemaxbathroom()}>
                        <Text style={styles.paragraph2}>Decrease Total Number of{'\n'}Students Allowed in Bathroom</Text>
                    </Pressable> : <Pressable>
                        <Text style={styles.paragraph2}>               {'\n'}           </Text>
                    </Pressable>}

                    <Text style={styles.paragraph2}>___________________ {'\n'}</Text>

                    <Text style={styles.paragraph2} onPress={() => navigation.navigate("Mainmenuteacher", {
                        idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled, teacheriscalled: teacheriscalled,
                        email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, drinkpassduration: drinkpassduration, phonepassduration: phonepassduration, overunder: overunder, bathroompassduration: bathroompassduration, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom,
                        newoverunder: newoverunder, penaltyminutes: penaltyminutes, adjustments: adjustments, abc: abc, linkedclass: linkedclass
                    })}  >Return to Main Menu</Text>

                    <Text style={styles.paragraph2}>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>


                </View>
            </ScrollView>
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
