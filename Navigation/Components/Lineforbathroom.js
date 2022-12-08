import React, { useState, useEffect } from "react";
import Lineforbathroom from './LineForBathroom/Lineforbathroom'

import { Alert, SafeAreaView, Text, View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, TouchableHighlight } from 'react-native';

import { Audio } from 'expo-av';

import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { limit, onSnapshot, orderBy, getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion } from "@firebase/firestore";





const height = Dimensions.get("window").height;

export default function SignUp({ route, navigation }) {

    const [userdata, setUserdata] = useState([]);
    const [inbathroom, setInbathroom] = useState([]);
    const [selectedclass, setSelectedclass] = useState("");

    const [idselected, setIdselected] = useState("");
    const [passid2, setPassid] = useState();
    const [placeinline, setPlaceinline] = useState(0);
    const [docdeleted, setDocdeleted] = useState(false);
    const [timeleft, setTimeleft] = useState();
    const [nameofpersoninbroom, setNameofpersoninbroom] = useState();
    const [listofids, setListofids] = useState();
    const [lengthoflist, setLengthoflist] = useState();
    const [myindex, setMyindex] = useState();
    const [mynumber, setMynumber] = useState();

    const [otherid, setOtherid] = useState();
    const [bathroominuse, setBathroominuse] = useState();

    const [sound, setSound] = useState();
    const [getlocaldifference, setGetlocaldifference] = useState();
    





    //Bathroom Pass Line

    const [showspinner, setShowspinner] = useState(true);


    const { userinformation, teacherid, coursename, classid, teacher, Selectedclassdestination, youcangetpass, section, currentlocation, school, state, town, locationdestination, firstname, lastname, ledby, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, currentsessionid, totalinlineforbathroom, id, teacheridforreturn, bathroompassinuse, passid, adjustmentandoverunder, total2, getcurrentdifference, maxstudentsbathroom, endofclasssession, maxstudentsonphonepass } = route.params;
    console.log(currentsessionid,"currentsessionid", classid, "classid","LINE FOR BATHROOM", passid);

useEffect(() =>
        onSnapshot(doc(firebase, "classesbeingtaught", classid), (doc) => {

            if (doc.data().inusebathroompass < doc.data().bathroompassmaxstudents) {
                setGetlocaldifference(doc.data().bathroompassmaxstudents - doc.data().inusebathroompass)
            } 
            if (doc.data().inusebathroompass <= doc.data().bathroompassmaxstudents){
                getlocationsqrcodes();
            }
        }
        ), []);

        useEffect(() => {
            if (getlocaldifference > -1) {
                sendnextperson()
            }        
        }, [getlocaldifference]);


    const cancelplaceinline = () =>

        Alert.alert('Please Be Aware', 'This will remove you from the line.', [
            {
                text: 'Keep Me In Line',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Remove Me From Line', onPress: () => leaveline() },
        ]);



    async function sendnextperson() {

        setGetlocaldifference(-1);

        console.log(currentsessionid, "currentsessionid is this the last thing to get run? in LIneForBathroom")

        const trythis = collection(firebase, "passes");

        const q = query(trythis, where("classsessionid", "==", currentsessionid), where("destination", "==", "Bathroom"), where("leftclass", "==", 0), orderBy("placeinline", "asc"), limit(getlocaldifference));

        const querySnapshot = await getDocs(q)

            .then(function (snapshot) {

                snapshot.forEach(doc => {
                    if (doc.data().studentid === id) {
                        console.log("It is playing the sound!");
                        playSound();
                        navigation.navigate("Passisready", { userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater:drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid, bathroompassinuse: bathroompassinuse, passid: passid, id: id, teacheridforreturn: teacheridforreturn, adjustmentandoverunder: adjustmentandoverunder, total2:total2, getcurrentdifference:getcurrentdifference,endofclasssession: endofclasssession, });
                    }
                })


            })
         
    };


    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);


    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/Confirm.mp3')
        );
        setSound(sound);

        await sound.playAsync();
    }

    useEffect(() => {
        if (otherid) {

            updateDoc(doc(firebase, "passes", otherid), {
                placeinline: placeinline
            }).catch((error) => {
                console.log(error); alert(error);
            })

            updateDoc(doc(firebase, "passes", passid2), {
                placeinline: placeinline + 1
            }).catch((error) => {
                console.log(error); alert(error);
            })
        }
        setOtherid("");
    }, [otherid]);




    async function allowpersonbehindmetogoahead() {

        const trythis = collection(firebase, "passes");

        const q = query(trythis, where("classid", "==", classid), where("placeinline", "==", placeinline + 1), limit(1))

        const querySnapshot = await getDocs(q)

            .then(function (snapshot) {


                snapshot.forEach(doc => {
                    console.log("Here is the id", doc.data().id);
                    setOtherid(doc.data().id)
                })


            })
    }




    const leaveline = () => {
        setShowspinner(true);

        try {
            const userDoc = doc(firebase, "passes", passid)
            console.log("HEEEEEEEEYYYYY,", id, "HEEEEEEEEEEEEy");
            deleteDoc(userDoc)
        } catch (error) {
            alert(error)
        }
        setTimeout(() => {
            setDocdeleted(true);
            setShowspinner(false);
        }, 2000);

    }

    useEffect(() => {

        if (docdeleted === true) {
            navigation.navigate("Mainmenustudent", {
                userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater:drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid,
                maxstudentsonphonepass: maxstudentsonphonepass,
                bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, id: id, bathroomtime: bathroomtime,  adjustmentandoverunder: adjustmentandoverunder, maxstudentsbathroom:maxstudentsbathroom, endofclasssession: endofclasssession,
            })
        }
    }, [docdeleted]);

    useEffect(() => {
        setShowspinner(true);
        if (id.length > 3) {
            getlocationsqrcodes();

        }
    }, []);

    useEffect(() => {

        if (listofids) {

            for (let i = 0; i < lengthoflist; i++) {
                console.log(listofids, listofids[i].id, "HERE IS THT LEST OF THE IDS.")
            
                updateDoc(doc(firebase, "passes", listofids[i].id), {
                    placeinline: i
                }).catch((error) => {
                    console.log(error); alert(error);
                })
    
            console.log(listofids, lengthoflist, "HERE IS THT LEST OF THE IDS.")
            }
    }
    }, [listofids]);

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

    async function getlineforbathroom() {

        console.log("FUNCTION 1 Run");
        const q = query(collection(firebase, "passes"), where("classsessionid", "==", currentsessionid), where("destination", "==", "Bathroom"), where("leftclass", "==", 0), orderBy("placeinline", "asc"));

        const querySnapshot = await getDocs(q)

            .then(function (snapshot) {
               let numberr = 0
                setMynumber(0);
                const ids = []
                const array = []
                snapshot.forEach(doc => {
                    numberr = numberr +1;
                    setMynumber(mynumber + 1);
                    if (doc.data().studentid === id) {
                        setPassid(doc.data().id);
                        setPlaceinline(doc.data().placeinline);
                        setMyindex(mynumber);
                    }
                    array.push(doc.data());
                    ids.push({id:doc.data().id, number: numberr},);

                })
                setLengthoflist(ids.length);
                setListofids(ids);
                setUserdata(array);

            })


        setShowspinner(false);
    };

    async function getthoseinthebathroom() {
        console.log("FUNCTION 2 Run");
        const q = query(collection(firebase, "passes"), where("classsessionid", "==", currentsessionid), where("destination", "==", "Bathroom"), where("leftclass", ">", 0), where("returned", "==", 0));

        const querySnapshot = await getDocs(q)

            .then(function (snapshot) {
                const array = []
                snapshot.forEach(doc => {
                    array.push(doc.data())
                })
                setInbathroom(array)
            })
        console.log("DID the people in the Bathroom show up, DID the people in the Bathroom show up")

        setShowspinner(false);
    }

    async function getlocationsqrcodes() {
        getlineforbathroom();
        getthoseinthebathroom();
    };

    const checkstatus = () => {
        let r = Date.now();
        setCurrentdifference((timeleft - r) / 60000);
        setTimeout(() => {
            setCurrentdifference(0);
        }, 5000);
    }


    return (
        <SafeAreaView style={styles.largercontainer}>
            <View style={styles.container1}>
                <View><Text style={styles.error}>Line For Bathroom </Text></View>
            </View>


            <View style={styles.container2}>
                <Lineforbathroom userdata={userdata} id={id} setSelectedclass={setSelectedclass} selectedclass={selectedclass} idselected={idselected} firstname={firstname} lastname={lastname} />
            </View>


            <ScrollView style={styles.section3}>
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


                <View>
                    <TouchableOpacity onPress={() => allowpersonbehindmetogoahead()}><Text style={styles.paragraph2}>Allow the Person{'\n'} In Line Behind Me {'\n'}To Go Ahead </Text></TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={() => cancelplaceinline()}><Text style={styles.paragraph2}>Cancel My Pass</Text></TouchableOpacity>
                </View>


                <View>
                    {inbathroom.map((item, i) => {
                        return (
                            <View key={i}>

                                <View>
                                    {item.whenlimitwillbereached > Date.now() ?
                                        <View><Text style={styles.paragraph2}>{item.firstname} {item.lastname} Who{'\n'} Should be Returning {'\n'}Soon Left Class{'\n'}At {item.timeleftclass}</Text></View>
                                        : <View><Text style={styles.paragraph2}>{item.firstname} {item.lastname} Who{'\n'}Should have Returned {'\n'}At {item.timeleftclass}{'\n'}Is Now In Penalty</Text></View>}
                                </View>

                            </View>
                        );
                    })}
                </View>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>


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
        backgroundColor: '#000',
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
        height: "55%",

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
    unselected: {
        backgroundColor: '#013469',

        textAlign: "center",
        fontSize: 17,
        margin: 6,
        flex: 1,

        color: "#ffffff"
    },
    selected: {
        color: "#FFF",
        backgroundColor: "#E43522",
        margin: 6,
        fontSize: 20,
        borderRadius: 10,
        textAlign: "center",
        marginLeft: 25,
        marginRight: 25,
        flex: 1
    },
});