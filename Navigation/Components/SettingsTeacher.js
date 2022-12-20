import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Button, View, TouchableOpacity, Text, ScrollView, Pressable, LogBox, Switch } from 'react-native';
import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion } from "@firebase/firestore";
import Slider from '@react-native-community/slider';



const Destination = ({ route, navigation }) => {

    const { idofcurrentclass, currentsessionid, endlastclass, userinformation, school, state, town, role, id, exclusivephonepasstimelmit, classiscurrent, nameofcurrentclass, starttimeofcurrentclass, classid, coursename, section, location, teacherid, teacheriscalled,
        email, starttime, lengthofclassesforacomputer, inpenalty, stoptimepenalty, starttimepenalty, totaltimepenalty, alreadyused, teacher, Selectedclassdestination, youcangetpass, currentlocation, locationdestination, firstname, lastname, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, lengthofclasses, endlastclasssubstitute, sessionended, thelastid, phonepassduration, overunder, drinkpassduration, bathroompassduration,otherpassduration, maxstudentsphonepass, donewithworkphonepass, consequenceid, sessionending, maxstudentsbathroom,linkedclass
    } = route.params;

    console.log("In Teaceher Settings", ifnegativeplusminus, "ifnegativeplusminus", bathroompasslimit, "bathroompasslimit", currentsessionid, "currentsessionid", starttime, "starttime", timeincomputer, "timeincomputer", classid, "classid", "In Teacher Settings")


    LogBox.ignoreAllLogs();

    const [bathroompasslimit, setBathroompasslimit] = useState();
    const [drinkpasslimit, setDrinkpasslimit] = useState();

    const [ifnegativeplusminus, setIfnegativeplusminus] = useState();



    const [nonbathroompasslimit, setNonbathroompasslimit] = useState();
    const [exclusivephonepasstimelimit, setExclusivephonepasstimelimit] = useState();
    const [exclusivephonepassmaxstudents, setExclusivephonepassmaxstudents] = useState();
    const [changeismade1, setChangeismade1] = (useState(0))
    const [offerdonewithworkphonepass, setOfferdonewithworkphonepass] = useState(true);
    const [lengthofclass, setLengthofclass] = useState(-2);
    const [timeincomputer, setTimeincomputer] = useState();
    const [idsofpasses, setIdsofpasses] = useState();



    const endpasses = () => {

        if (sessionending < Date.now()) {
            const q = query(collection(firebase, "passes"), where("classsessionid", "==", currentsessionid), where("returned", "==", 0));

            const querySnapshot = getDocs(q)
                .then(function (snapshot) {
                    let array = []
                    snapshot.forEach(doc => {
                        array.push({ id: doc.data().id, expectedreturn: doc.data().whenlimitwillbereached,endofclasssession: doc.data().endofclasssession })
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


    const toggleSwitch = () => setOfferdonewithworkphonepass(previousState => !previousState);

    useEffect(() => {
        if (lengthofclass > -1) {
            setTimeincomputer(lengthofclass * 60000);
        }
    }, [lengthofclass]);

    useEffect(() => {

        setLengthofclass(lengthofclasses);
        setExclusivephonepasstimelimit(phonepassduration);
        setBathroompasslimit(bathroompassduration);
        setDrinkpasslimit(drinkpassduration);

        setNonbathroompasslimit(otherpassduration);
        setOfferdonewithworkphonepass(donewithworkphonepass);
        setIfnegativeplusminus(overunder);

    }, [lengthofclasses, phonepassduration, overunder, bathroompassduration, otherpassduration, maxstudentsphonepass, donewithworkphonepass, drinkpassduration]);


    useEffect(() => {
  if (phonepassduration > 0) {
    setExclusivephonepassmaxstudents(50)
  } else {
    setExclusivephonepassmaxstudents(0) 
  }        
    }, [phonepassduration]);

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
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() =>
                        navigation.navigate("Mainmenuteacher", {
                            idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit,
                            drinkpasslimit:drinkpasslimit,
                            nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater:drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, overunder: overunder, bathroompassduration: bathroompassduration, 
                            drinkpassduration:drinkpassduration, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom,
                            drinkpassduration:drinkpassduration, linkedclass:linkedclass
                        })}
                    >

                        <Text accessibilityLabel="Guest" style={styles.error5}>
                            Main Menu
                        </Text>
                    </TouchableOpacity>
                ),
            });

    }, []);

    useEffect(() => {
        if (changeismade1 > 0) {
            toggleSwitch();
            console.log(changeismade1, offerdonewithworkphonepass)
        }
    }, [changeismade1]);

    useEffect(() => {

        console.log(changeismade1, offerdonewithworkphonepass, offerdonewithworkphonepass)

    }, [offerdonewithworkphonepass]);


    console.log(lengthofclass, "starttime = ", starttime, "settingsteacher,", classid, coursename, bathroompasslimit, ifnegativeplusminus, userinformation, role, school, state, town, teacheriscalled, "SettingsTeacher");

    useEffect(() => {
        if (typeof role === "undefined" || typeof school === "undefined" || typeof state === "undefined" || typeof town === "undefined") {
            navigation.navigate("SignIn");
        } else {
            console.log("Everything is cool!")
        }
    }, []);


    //As new settings are added both functions must be modified



    const thisclassupdatesettings1 = () => {

        console.log(currentsessionid, "currentsessionid", "thisclassupdatesettings1 was run");
        //Copy from here. . .
        if (classid) {


            if (lengthofclass) {
                console.log("lengthofclasswasrun");
                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    lengthofclasses: lengthofclass,
                    lengthofclassescomputer: timeincomputer

                }).catch((error) => {
                    console.log(error); alert(error);
                })

            }
            if (bathroompasslimit) {
                console.log("bathroomtimelimit");
                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    timelimitbathroompass: bathroompasslimit

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }

            if (drinkpasslimit) {
                console.log("bathroomtimelimit");
                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    drinkofwater: drinkpasslimit

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }

            if (nonbathroompasslimit) {
                console.log("nonbathroompasslimit");
                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    timelimitnonbathroompass: nonbathroompasslimit

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }
            if (exclusivephonepasstimelimit > -1) {
                console.log("exclusivephonepasstimelimit");
                updateDoc(doc(firebase, "classesbeingtaught", classid), {

                    phonepassexclusivetime: exclusivephonepasstimelimit

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }

            if (exclusivephonepassmaxstudents) {
                console.log("exclusivephonepassmaxstudents");
                updateDoc(doc(firebase, "classesbeingtaught", classid), {

                    exclusivephonepassmaxstudents: exclusivephonepassmaxstudents

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }
            if (changeismade1 > 0) {
                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    donewithworkphonepassavailable: offerdonewithworkphonepass

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }
        }

        // . . . To here - (change 'classid' to 'docs.data().id') paste it inside . . . 
    }



    const thisclassupdatesettings = () => {

        console.log("thisclassupdatesettings was run");
        //Copy from here. . .

        if (classid && classiscurrent && (Date.now() < sessionending)) {
            if (lengthofclass) {
                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    lengthofclasses: lengthofclass,
                    lengthofclassescomputer: timeincomputer

                }).catch((error) => {
                    console.log(error); alert(error);
                })

                updateDoc(doc(firebase, "classsessions", currentsessionid), {
                    lengthofclass: lengthofclass,
                    passesnolongeravailable: timeincomputer + starttime,

                }).catch((error) => {
                    console.log(error); alert(error);
                })


            }
            if (bathroompasslimit) {
                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    timelimitbathroompass: bathroompasslimit

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }
            if (drinkpasslimit) {
                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    drinkofwater: drinkpasslimit

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }
            if (nonbathroompasslimit) {
                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    timelimitnonbathroompass: nonbathroompasslimit

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }
            if (exclusivephonepasstimelimit > -1) {
                updateDoc(doc(firebase, "classesbeingtaught", classid), {

                    phonepassexclusivetime: exclusivephonepasstimelimit

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }

            if (exclusivephonepassmaxstudents) {
                updateDoc(doc(firebase, "classesbeingtaught", classid), {

                    exclusivephonepassmaxstudents: exclusivephonepassmaxstudents

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }
            if (changeismade1 > 0) {
                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    donewithworkphonepassavailable: offerdonewithworkphonepass

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }

            // . . . To here - (change 'classid' to 'docs.data().id') paste it inside . . . 
        } else if (classid) {
            if (lengthofclass) {
                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    lengthofclasses: lengthofclass,
                    lengthofclassescomputer: timeincomputer

                }).catch((error) => {
                    console.log(error); alert(error);
                })

            }
            if (bathroompasslimit) {
                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    timelimitbathroompass: bathroompasslimit

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }

            if (drinkpasslimit) {
                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    drinkofwater: drinkpasslimit

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }
            if (nonbathroompasslimit) {
                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    timelimitnonbathroompass: nonbathroompasslimit

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }
            if (exclusivephonepasstimelimit > -1) {
                updateDoc(doc(firebase, "classesbeingtaught", classid), {

                    phonepassexclusivetime: exclusivephonepasstimelimit

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }

            if (exclusivephonepassmaxstudents) {
                updateDoc(doc(firebase, "classesbeingtaught", classid), {

                    exclusivephonepassmaxstudents: exclusivephonepassmaxstudents

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }
            if (changeismade1 > 0) {
                updateDoc(doc(firebase, "classesbeingtaught", classid), {
                    donewithworkphonepassavailable: offerdonewithworkphonepass

                }).catch((error) => {
                    console.log(error); alert(error);
                })
            }

        }
    }

    //This function in a similar way
    async function allclassesupdatesettings() {

        console.log("allclassesupdatesettings was run")

        const q = query(collection(firebase, "classesbeingtaught"), where("teacherid", "==", id));

        const querySnapshot = await getDocs(q)

            .then(function (snapshot) {

                if (lengthofclass) {

                    snapshot.forEach(docs => {

                        updateDoc(doc(firebase, "classesbeingtaught", docs.data().id), {
                            lengthofclasses: lengthofclass,
                            lengthofclassescomputer: timeincomputer

                        }).catch((error) => {
                            console.log(error); alert(error);
                        })

                    })
                    updateDoc(doc(firebase, "users", id), {
                        lengthofclasses: lengthofclass,
                    }).catch((error) => {
                        console.log(error); alert(error);
                    })
                }

                if (bathroompasslimit) {

                    snapshot.forEach(docs => {

                        updateDoc(doc(firebase, "classesbeingtaught", docs.data().id), {
                            timelimitbathroompass: bathroompasslimit

                        }).catch((error) => {
                            console.log(error); alert(error);
                        })

                    })
                    updateDoc(doc(firebase, "users", id), {
                        bathroompass: bathroompasslimit,
                    }).catch((error) => {
                        console.log(error); alert(error);
                    })
                }
                if (drinkpasslimit) {

                    snapshot.forEach(docs => {

                        updateDoc(doc(firebase, "classesbeingtaught", docs.data().id), {
                            drinkofwater: drinkpasslimit

                        }).catch((error) => {
                            console.log(error); alert(error);
                        })

                    })
                    updateDoc(doc(firebase, "users", id), {
                        bathroompass: bathroompasslimit,
                    }).catch((error) => {
                        console.log(error); alert(error);
                    })
                }
                if (nonbathroompasslimit) {

                    snapshot.forEach(docs => {
                        updateDoc(doc(firebase, "classesbeingtaught", docs.data().id), {
                            timelimitnonbathroompass: nonbathroompasslimit

                        }).catch((error) => {
                            console.log(error); alert(error);
                        })
                    })
                    updateDoc(doc(firebase, "users", id), {
                        nonbathroompass: nonbathroompasslimit,
                    }).catch((error) => {
                        console.log(error); alert(error);
                    })
                }
                if (exclusivephonepasstimelimit > -1) {
                    snapshot.forEach(docs => {
                        updateDoc(doc(firebase, "classesbeingtaught", docs.data().id), {

                            phonepassexclusivetime: exclusivephonepasstimelimit

                        }).catch((error) => {
                            console.log(error); alert(error);
                        })
                    })
                    updateDoc(doc(firebase, "users", id), {
                        phonepass: exclusivephonepasstimelimit,
                    }).catch((error) => {
                        console.log(error); alert(error);
                    })
                }

                if (exclusivephonepassmaxstudents) {
                    snapshot.forEach(docs => {
                        updateDoc(doc(firebase, "classesbeingtaught", docs.data().id), {

                            exclusivephonepassmaxstudents: exclusivephonepassmaxstudents

                        }).catch((error) => {
                            console.log(error); alert(error);
                        })
                    })
                    updateDoc(doc(firebase, "users", id), {
                        maxstudentsphonepass: exclusivephonepassmaxstudents,
                    }).catch((error) => {
                        console.log(error); alert(error);
                    })
                }
                if (changeismade1 > 0) {
                    snapshot.forEach(docs => {
                        updateDoc(doc(firebase, "classesbeingtaught", docs.data().id), {
                            donewithworkphonepassavailable: offerdonewithworkphonepass

                        }).catch((error) => {
                            console.log(error); alert(error);
                        })
                    })
                    updateDoc(doc(firebase, "users", id), {
                        donewithworkphonepassavailable: offerdonewithworkphonepass,
                    }).catch((error) => {
                        console.log(error); alert(error);
                    })
                }
                console.log("Did anything change?")
            })
        console.log("HERE IS THE USERDATA Heres ISE THE USER DATA")

    };
    return (
        <View style={styles.container}>
            {(exclusivephonepassmaxstudents > 0 || lengthofclass || bathroompasslimit  || drinkpasslimit || nonbathroompasslimit || exclusivephonepasstimelimit > -1 || changeismade1 > 0) && typeof currentsessionid === "undefined" && coursename && classiscurrent && (Date.now() < sessionending) ? <TouchableOpacity onPress={() =>
                thisclassupdatesettings1()}><Text style={styles.paragraph9}>Press here to set change(s) {'\n'}To {coursename} - {section} {'\n'}{'\n'}-Current Class Session- </Text></TouchableOpacity> : (exclusivephonepassmaxstudents > 0 || lengthofclass || bathroompasslimit || drinkpasslimit || nonbathroompasslimit || exclusivephonepasstimelimit > -1 || changeismade1 > 0) && coursename ? <TouchableOpacity onPress={() =>
                    thisclassupdatesettings()}><Text style={styles.paragraph9}>Press here to save change(s) {'\n'}To {coursename} - {section} {'\n'}{'\n'}-Current and Future Sessions- </Text></TouchableOpacity> : (exclusivephonepassmaxstudents > 0 || lengthofclass || bathroompasslimit || drinkpasslimit || nonbathroompasslimit || exclusivephonepasstimelimit > -1 || changeismade1 > 0) ? <TouchableOpacity onPress={() => allclassesupdatesettings()}><Text style={styles.paragraph9}>Press here to save change(s) {'\n'}To ALL of your Classes'{'\n'}{'\n'}-Future Sessions-</Text></TouchableOpacity> : <TouchableOpacity><Text style={styles.paragraph9}>Adjust Settings{'\n'}Before Pressing Here{'\n'}{'\n'}</Text></TouchableOpacity>}


            <ScrollView>
                <View>

                    <Text style={styles.paragraph19}>Settings{'\n'}{'\n'}___________________{'\n'}{'\n'}</Text>


                    <Text style={styles.paragraph2}>Class Duration</Text></View>
                <View style={styles.button}>
                    <Slider
                        value={60}
                        onValueChange={(event) => {
                            setLengthofclass(event);
                        }}
                        style={{ width: 300, height: 40 }}
                        minimumValue={10}
                        maximumValue={180}
                        minimumTrackTintColor="#E43522"
                        step={1}
                        maximumTrackTintColor="gray"
                    />
                </View>
                {lengthofclass > -2 ? <Text style={styles.paragraph2}>{lengthofclass} minute </Text> : <Text style={styles.paragraph2}>  </Text>}

                <Text style={styles.paragraph23}> ___________________ </Text>

                <View><Text style={styles.paragraph2}>Time Limit for{'\n'} Bathroom Pass </Text></View>
                <View style={styles.button}>
                    <Slider
                        value={10}
                        onValueChange={(event) => {
                            setBathroompasslimit(event);
                        }}
                        style={{ width: 300, height: 40 }}
                        minimumValue={5}
                        maximumValue={30}
                        minimumTrackTintColor="#E43522"
                        step={1}
                        maximumTrackTintColor="gray"
                    />
                </View>
                {typeof bathroompasslimit != "undefined" ? <Text style={styles.paragraph2}>{bathroompasslimit} minutes </Text> : <Text style={styles.paragraph2}>  </Text>}

                <Text style={styles.paragraph23}> ___________________ </Text>



                <View><Text style={styles.paragraph2}>Time Limit for{'\n'} Drink of Water Pass </Text></View>
                <View style={styles.button}>
                    <Slider
                        value={5}
                        onValueChange={(event) => {
                            setDrinkpasslimit(event);
                        }}
                        style={{ width: 300, height: 40 }}
                        minimumValue={0}
                        maximumValue={20}
                        minimumTrackTintColor="#E43522"
                        step={1}
                        maximumTrackTintColor="gray"
                    />
                </View>
                {typeof drinkpasslimit != "undefined" ? <Text style={styles.paragraph2}>{drinkpasslimit} minutes </Text> : <Text style={styles.paragraph2}>  </Text>}

                <Text style={styles.paragraph23}> ___________________ </Text>

                <View><Text style={styles.paragraph2}>Time Limit for{'\n'} 1-Way Hall Passes  </Text></View>
                <View style={styles.button}>
                    <Slider
                        value={10}
                        onValueChange={(event) => {
                            setNonbathroompasslimit(event);
                        }}
                        style={{ width: 300, height: 40 }}
                        minimumValue={5}
                        maximumValue={30}
                        minimumTrackTintColor="#E43522"
                        step={1}
                        maximumTrackTintColor="gray"
                    />
                </View>
                {typeof nonbathroompasslimit != "undefined" ? <Text style={styles.paragraph2}>{nonbathroompasslimit} minutes </Text> : <Text style={styles.paragraph2}>  </Text>}
                <Text style={styles.paragraph23}> ___________________ </Text>


                <View><Text style={styles.paragraph2}>Time Limit for{'\n'} Break From Work Pass  </Text></View>
                <View style={styles.button}>
                    <Slider
                        value={10}
                        onValueChange={(event) => {
                            setExclusivephonepasstimelimit(event);
                        }}
                        style={{ width: 300, height: 40 }}
                        minimumValue={0}
                        maximumValue={30}
                        minimumTrackTintColor="#E43522"
                        step={1}
                        maximumTrackTintColor="gray"
                    />
                </View>
                {exclusivephonepasstimelimit > 0 ? <Text style={styles.paragraph2}>{exclusivephonepasstimelimit} minutes</Text> : exclusivephonepasstimelimit == 0 ? <Text style={styles.paragraph2}>Inaccessible</Text> : <Text style={styles.paragraph2}>       </Text>}
             
                <Text style={styles.paragraph23}> ___________________ </Text>

                <View style={styles.container}>

                    <View>{changeismade1 == 0 ? <Text style={styles.paragraph2}>Done With Work Phone Pass {'\n'}       </Text> : offerdonewithworkphonepass ? <Text style={styles.paragraph2}>Done With Work Phone Pass {'\n'}Will be Accessible</Text> : <Text style={styles.paragraph2}>Done With Work Phone Pass {'\n'}Will be Inaccessible</Text>}</View>
                    <Switch
                        trackColor={{ false: 'gray', true: '#E43522' }}
                        thumbColor={offerdonewithworkphonepass ? 'white' : 'white'}
                        ios_backgroundColor="#E43522"
                        onValueChange={() => setChangeismade1(changeismade1 + 1)}
                        value={offerdonewithworkphonepass}
                    />
                </View>
                <Text>  {'\n'}  </Text>
                <Text style={styles.paragraph23}> ___________________ </Text>

                <Text>{'\n'} {'\n'} {'\n'} {'\n'} {'\n'} {'\n'} {'\n'} {'\n'} </Text>

            </ScrollView>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000000',
        padding: 2,
        alignItems: "center"

    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        margin: 24,
        fontSize: 40,
        textAlign: 'center',
        padding: 10,
        color: '#FFFFFF',
        backgroundColor: '#000000',
        fontWeight: "bold",

    },
    paragraph9: {
        margin: 24,
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
        color: '#FFFFFF',
        backgroundColor: '#000000',
        fontWeight: "bold"


    },
    paragraph2: {
        margin: 24,
        fontSize: 17,
        textAlign: 'center',
        padding: 10,
        color: '#FFF',
        backgroundColor: '#000000',

    },
    paragraph21: {
       marginLeft: 35,
        fontSize: 17,
        textAlign: 'justify',
        padding: 10,
        color: '#FFF',
        backgroundColor: '#000000',

    },
    paragraph23: {
        fontSize: 8,
        textAlign: 'center',
        color: '#FFF',
        backgroundColor: '#000000',

    },


    text: {
        color: '#FFFFFF',
        textAlign: "center"

    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
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

    paragraph19: {
        margin: 24,
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
        color: '#FFFFFF',
        backgroundColor: '#000000',
        fontWeight: "bold"


    },
    paragraph99: {

        fontSize: 19,
      marginLeft:20,
        color: '#FFFFFF',
        backgroundColor: '#000000',
        fontWeight: "bold",



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
export default Destination; 