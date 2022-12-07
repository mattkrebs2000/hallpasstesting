import React, { useState, useEffect } from "react";
import { Pressable } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import Students from './Mapofstudentsnotyetenrolled/Mapofstudentsnotyetenrolled';

import { SafeAreaView, Text, View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';

import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification, deleteUser, signInWithEmailAndPassword } from "@firebase/auth";
import { orderBy, limit, onSnapshot, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, arrayUnion, FieldValue } from "@firebase/firestore"



const height = Dimensions.get("window").height;

export default function SignUp({ route, navigation }) {
    const { idofcurrentclass, currentsessionid, endlastclass, userinformation, school, state, town, role, bathroompasslimit, nonbathroompasslimit, drinkpasslimit, ifnegativeplusminus, exclusivephonepassmaxstudents, exclusivephonepasstimelmit, lengthofclass, classiscurrent, nameofcurrentclass, starttimeofcurrentclass, classid, coursename, section, location, teacherid, teacheriscalled, id,
        email, starttime, lengthofclassesforacomputer, inpenalty, stoptimepenalty, starttimepenalty, totaltimepenalty, alreadyused, teacher, Selectedclassdestination, youcangetpass, currentlocation, locationdestination, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, lengthofclasses, endlastclasssubstitute, sessionended, thelastid, phonepassduration, overunder, bathroompassduration, drinkpassduration, otherpassduration, maxstudentsphonepass, donewithworkphonepass, consequenceid, sessionending, maxstudentsbathroom, newoverunder, newconsequence, linkedclass
    } = route.params;


    const [userdata, setUserdata] = useState([]);
    const [userdata2, setUserdata2] = useState();
    const [userdata3, setUserdata3] = useState();
    const [consequences, setConsequences] = useState();
    const [selected, setSelected] = useState("");

    const [selected2, setSelected2] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [idselected, setIdselected] = useState("");
    const [idselected2, setIdselected2] = useState("");
    const [count, setCount] = useState(0);
    const [available, setAvailable] = useState(true);
    const [bathroomoccupied, setBathroomoccupied] = useState(false);
    const [destination, setDestination] = useState("");
    const [phonepassawarded, setphonepassawarded] = useState(false);
    const [phonetimestart, setPhonetimestart] = useState(0);
    const [currenttime, setCurrenttime] = useState(0);
    const [tallyphonetimeingoodstanding, setTallyphonetimeingoodstanding] = useState(0);
    const [tallyphonetimenotingoodstanding, setTallyphonetimenotingoodstanding] = useState(0);

    const [showspinner, setShowspinner] = useState(true);

    const [indefinitepenalty, setIndefinitepenalty] = useState();
    const [changehasbeenmade, setChangehasbeenmade] = useState(false);
    const [temporary, setTemporary] = useState();
    const [penaltyminutes, setPenaltyminutes] = useState();
    const [overunderlocal, setOverunderlocal] = useState();
    const [overunder2, setOverunder2] = useState();
    const [adjustments, setAdjustments] = useState();
    const [currentlevel, setCurrentlevel] = useState();
    const [abc, setAbc] = useState();

    const [localstarttime, setLocalstarttime] = useState();
    const [localconsequencepenaltyid, setLocalconsequencepenaltyid] = useState();

    const [newconsequenceid, setNewconsequenceid] = useState();

    const [idsfromthisclass, setIdsfromthisclaass] = useState();

    const [totalclasstime, setTotalclasstime] = useState();
    const [updatecompleted, setUpdatecompleted] = useState();
    const [totalpenaltyinutes, setTotalpenaltyminutes] = useState();
    const [localpercent, setLocalpercent] = useState();
    const [localphonepassquote, setlocalphonepassquote] = useState();
    const [localingoodstanding, setLocalingoodstanding] = useState();
    const [trythispercent, setTrythispercent] = useState();

    const [adjust, setAdjust] = useState();
    const [level, setLevel] = useState();
    const [over, setOver] = useState();
    const [emaill, setEmaill] = useState();

    const [phonepassexpiration, serPhonepassexpiration] = useState();
    const [idsofpasses, setIdsofpasses] = useState();
    const [empty, setEmpty] = useState();
    const [consquenceid, setConsequenceid] = useState();
    const [localcode, setLocalcode] = useState();
    const [studentjustarrivedlate, setstudentjustarrivedlate] = useState();


    function compare_lname(a, b) {
        if (typeof a.locallastname != "undefined" && typeof b.locallastname != "undefined") {
        if (a.locallastname.toLowerCase() < b.locallastname.toLowerCase()) {
            return -1;
        }
        if (a.locallastname.toLowerCase() > b.locallastname.toLowerCase()) {
            return 1;
        }
        return 0;
    } else {
        null
    }
    }

    useEffect(() => {
        if (userdata2) {
            setUserdata(userdata2.sort(compare_lname))
        }
    }, [userdata2]);


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
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() =>
                        navigation.navigate("Mainmenuteacher", {

                            idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit:drinkpasslimit, 
                            ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime,  drinkofwater:drinkofwater,exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration:drinkpassduration, bathroompassduration: bathroompassduration,
                            overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, currentsessionid: currentsessionid, sessionending: sessionending,
                            idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit:drinkpasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime,  drinkofwater:drinkofwater,exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration:drinkpassduration,  bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom:maxstudentsbathroom, linkedclass:linkedclass

                        })}
                    >

                        <Text accessibilityLabel="Guest" style={styles.error5}>
                            Main Menu
                        </Text>
                    </TouchableOpacity>
                ),
            });

    }, []);


    const addthisstudenttothisclass = () => {

        const percents = { id: classid, penaltyminutes: 0, overunder: 0, adjustments: 0, level: "Consequences For Lateness" }
        setShowspinner(true);

        updateDoc(doc(firebase, "users", idselected), {
            [classid]: percents

        }).catch((error) => {
            console.log(error); alert(error);
        })

        updateDoc(doc(firebase, "classesbeingtaught", classid), {
            [idselected]: idselected,
        }).catch((error) => {
            console.log(error); alert(error);
        })
        
getlocationsqrcodes();

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

        console.log("1");
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

        let idd = classid;

        let temp = selected.temporary;
        let change = selected.changemade;
        let consequence = selected.consequenceid;
        let idselect = selected.id;

        setEmaill(selected.email)
        setFirstname(selected.localfirstname)
        setLastname(selected.locallastname)
        setPhonetimestart(selected.phonetimestart)
        setTallyphonetimeingoodstanding(selected.tallyphonetimeingoodstanding)
        setTallyphonetimenotingoodstanding(selected.tallyphonetimenotingoodstanding)
        setTemporary(temp)
        setChangehasbeenmade(change)
        setNewconsequenceid(consequence)
        serPhonepassexpiration(selected.exclusivephonepassexpiration)
        setphonepassawarded(selected.phonepassawarded)
        setstudentjustarrivedlate(selected.latetoclass)

        setIdselected(idselect)

    }, [selected]);

    useEffect(() => {
        setShowspinner(true);
        getlocationsqrcodes()
    }, []);

    useEffect(() => {

        if (idselected) {

            getlocationsqrcodes();
        }

    }, [idselected]);

    // This will be a new function to got to recent activity of student where you will be able to take a student off suspension if you want to. But it is not supposed to be Adding a DOc to passes. 



    //update student stats begin - goes to 460

    async function getlocationsqrcodes() {

        console.log("Was this thing run?")
        const q = query(collection(firebase, "users"), where(classid, '!=', ""));

        const querySnapshot = await getDocs(q)

            .then(function (snapshot) {
                const array = [];
            
                snapshot.forEach(doc => {
                  
                    array.push(doc.data().id);
                
                })
                setUserdata3(array);
            })
    
    };

    useEffect(() => {
   if (typeof userdata3 != "undefined") {
    getlocationsqrcodes2()
   }
    }, [userdata3]);


    async function getlocationsqrcodes2() {

        console.log("Was this thing run?")
        
        const f = query(collection(firebase, "users"), where("school", "==", school), where("state", "==", state), where("town", "==", town), where("role", "==", "Student"));

        const querySnapshot = await getDocs(f)

            .then(function (snapshot) {
                const array = [];
            
                snapshot.forEach(doc => {
                    if (!userdata3.includes(doc.data().id)) {
                        array.push(doc.data())
                      }
                })
                setUserdata2(array);
                setShowspinner(false);
            })
    
    };

    return (
        <SafeAreaView style={styles.largercontainer}>
            <View style={styles.container1} >

                {userdata3 ? <TouchableOpacity><Text style={styles.error}>Current Class: {coursename}{'\n'}{userdata3.length} Students</Text>
                </TouchableOpacity> :  <TouchableOpacity><Text style={styles.error}>Current Class: {coursename}</Text>
                </TouchableOpacity>}
            </View>

            <ScrollView style={styles.container2}>
                <Students userdata={userdata} id={id} selected={selected} setSelected={setSelected}
                    selected2={selected2} setSelected2={setSelected2}

                    idselected={idselected} setIdselected={setIdselected} changehasbeenmade={changehasbeenmade} temporary={temporary} indefinitepenalty={indefinitepenalty} classid={classid} overunderlocal={overunderlocal} currentlevel={currentlevel} abc={abc} updatecompleted={updatecompleted} totalpenaltyinutes={totalpenaltyinutes} localpercent={localpercent} localphonepassquote={localphonepassquote} totalclasstime={totalclasstime} over={over} consequences={consequences} empty={empty} idselected2={idselected2} setIdselected2={setIdselected2} emaill = {emaill}/>
            </ScrollView>

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



                <Text style={styles.paragraph2}>{'\n'}</Text>


                {idselected ? <View><Pressable><Text style={styles.paragraph2} onPress={() => addthisstudenttothisclass()}>Add Student to This Class</Text></Pressable></View> : 

                <Text style={styles.paragraph2} onPress={() => navigation.navigate("Mainmenuteacher", {
                    idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                    email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, overunder: overunder, bathroompassduration: bathroompassduration, drinkpassduration: drinkpassduration, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, totalclasstime: totalclasstime, linkedclass: linkedclass, maxstudentsbathroom: maxstudentsbathroom,
                })} >Return to Main Menu </Text>}

                <Text></Text>


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
        height: "15%",
        backgroundColor: '#000',
        width: "100%",
        justifyContent: "center",
    },
    error: {

        backgroundColor: '#000',
        color: "#FFF",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
    },

    error1: {

        backgroundColor: '#000',
        color: "#FFF",
        fontSize: 18,

        textAlign: "center",
        fontStyle: "italic"
    },


    container2: {
        height: "25%",
        backgroundColor: "#013469",
        width: "100%",

    },
    container3: {
        height: "30%",
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



    },
    paragraph22: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        backgroundColor: '#000000',
        color: "#fff",

    },

    paragraph3: {

        fontSize: 16,
        textAlign: "center",
        backgroundColor: '#000000',
        color: "#fff",
    },

    paragraph33: {

        backgroundColor: '#000',
        color: "#999",
        textDecorationLine: 'line-through',
        fontSize: 16,
        textAlign: "center",
        backgroundColor: '#000000',
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
        height: "30%",
        justifyContent: "flex-start",


    },
    section5: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: "#000",
        color: "#fff",
        alignContent: "center",
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
    paragraph7: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        backgroundColor: '#000000',
        color: "#FFF",

        justifyContent: "center",

    },
    container33: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: "#000",
        color: "#fff",
        alignContent: "center",
        justifyContent: "center",



    },
    section55: {

        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: "#000",
        color: "#fff",
        alignContent: "center",
        marginTop: 20,
        marginBottom: 20,
        justifyContent: "center",
    },

    paragraph35: {

        fontSize: 18,
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: '#000000',
        color: "#fff",
        fontWeight: 'bold',

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

