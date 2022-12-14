import React, { useState, useEffect } from "react";

import { LogBox, Alert, SafeAreaView, Text, View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Audio } from 'expo-av';

import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { limit, onSnapshot, orderBy, getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion } from "@firebase/firestore";
import { _DEFAULT_PROGRESS_UPDATE_INTERVAL_MILLIS } from "expo-av/build/AV";



export default function Destination({ route, navigation }) {

  const { teacherid, classid, coursename, section, location, teacher, youcangetpass, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, getadjustmentss, adjust, nowinpenalty, passid, overunderstatus, currentsessionid, endofclasssession, donewithworkplease, day, lengthofclasssession} = route.params;




  const [destination, setDestination] = useState("");
  const [eligible, setEligible] = useState(true);
  const [beingused, setBeingused] = useState();
  const [total, setTotal] = useState();
  const [total2, setTotal2] = useState();
  const [total3, setTotal3] = useState();
  const [total4, setTotal4] = useState();
  const [total5, setTotal5] = useState();
  const [positivenegative, setPositivenegative] = useState("Positive");
  const [percent, setPercent] = useState();
  const [showspinner, setShowspinner] = useState(true);
  const [getadjustmentsandplustotal2, setGetadjustmentsandplustotal2] = useState();

  const [Nowinpenaltylocal, setNowinpenaltylocal] = useState();
  const [isthestudentdonewithwork, setIsthestudentdonewithwork] = useState(false);

const [lastmistep, setLastmisstep] = useState();
const [lastmissteptime, setLastmissteptime] = useState();

  const [getstatus, setGetstatus] = useState();
  const [getexistingpassid, setGetexistingpassid] = useState();

  const [passclassid, setPassclassid] = useState();
  const [passclasssessionid, setPassclasssessionid] = useState();
  const [passlocation, setPasslocaation] = useState();
  const [passcoursename, setPasscoursename] = useState();
  const [passdestination, setPassdestinaation] = useState();
  const [passteacheridreturn, setPassteacheridreturn] = useState();
  const [timeallowed, setTimeallowed] = useState();
  const [teacheridfrompass, setTeacheridfrompass] = useState();
  const [expectedreturnfrompass, setExpectedreturnfrompass] = useState();
  const [passrightnow, setPassrightnow] = useState();
  const [passcurrentdate, setPasscurrentdate] = useState();
  const [passrealtimeleave, setPassrealtimeleave] = useState();
  const [classsessionending, setClasssessionending] = useState();

  const [id, setId] = useState();
  const [school, setSchool] = useState();
  const [state, setState] = useState();
  const [town, setTown] = useState();
  const [role, setRole] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [pnumber, setPnumber] = useState()
  const [email, setEmail] = useState();
  const [teacheriscalled, setTeacheriscalled] = useState();
  const [sound, setSound] = React.useState();
  const [passesallowedinweekifonpenalty, setPassesallowedinweekifonpenalty] = useState();


console.log(getexistingpassid,"getexistingpassid", getstatus, "getstatus", "main menu student"); 




useEffect(() => {
  console.log(getexistingpassid,"getexistingpassid", getstatus, "getstatus", "main menu student"); 
}, []);


  useEffect(() => {
    if (typeof day != "undefined") {
      playSound();
    }
  }, [day]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/Confirm.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    getAllKeys();

    if (typeof id != "undefined") {
      getadjustment2();
    }

    if (typeof coursename === "undefined") {
      console.log("nothing done");
    } else {
      setShowspinner(true);
      getpenaltytimeoneclass();
      getlocationsqrcodes2();
    }
  }, []);

  useEffect(() => {
    if (typeof id != "undefined") {
      getadjustment2();
    }
  }, [id]);

  async function getAllKeys() {
    const keys = await AsyncStorage.getAllKeys();
    checkhowmany(keys);
  }

  const checkhowmany = (keys) => {
    console.log(keys, "here are the keys")
    if (keys.length < 2) {
      navigation.navigate("SignIn");
    }
    else {
      getstorage0();
    }
  }

  async function getstorage0() {

    const stateValue = await AsyncStorage.getItem('teacheriscalled')
      .then(async (userRec) => {
        setTeacheriscalled(userRec);

      })
  }

  useEffect(() => {
    if (typeof teacheriscalled != "undefined") {
      getstorage1();
      console.log(teacheriscalled, "finally set state")
    } else {
      console.log(state, "state tripped it up");
    }
  }, [teacheriscalled]);



  async function getstorage1() {

    const stateValue = await AsyncStorage.getItem('state')

      .then(async (userRec) => {
        setState(userRec);
        console.log(state, "state", userRec, "thiis should be state");
      })
  }

  useEffect(() => {
    if (typeof state != "undefined") {
      getstorage2();
      console.log(state, "finally set state")
    } else {
      console.log(state, "state tripped it up");
    }
  }, [state]);

  async function getstorage2() {

    const schoolValue = await AsyncStorage.getItem('school')

      .then(async (userRec1) => {
        setSchool(userRec1);
      })
  }

  useEffect(() => {
    if (typeof school != "undefined") {
      getstorage3();
    } else {
      console.log("school tripped it up");
    }
  }, [school]);

  async function getstorage3() {

    const townValue = await AsyncStorage.getItem('town')

      .then(async (userRec3) => {
        setTown(userRec3);
      })
  }

  useEffect(() => {
    if (typeof town != "undefined") {
      getstorage4();
    } else {
      console.log("town tripped it up");
    }
  }, [town]);

  async function getstorage4() {

    const firstnameValue = await AsyncStorage.getItem('firstname')

      .then(async (userRec5) => {
        setFirstname(userRec5);
      })
  }

  useEffect(() => {
    if (typeof firstname != "undefined") {
      getstorage5();
    } else {
      console.log("firstname tripped it up");
    }
  }, [firstname]);

  async function getstorage5() {

    const lastnameValue = await AsyncStorage.getItem('lastname')

      .then(async (userRec6) => {
        setLastname(userRec6);
      })
  }

  useEffect(() => {
    if (typeof lastname != "undefined") {
      getstorage6();
    } else {
      console.log("lastname tripped it up");
    }
  }, [lastname]);

  async function getstorage6() {

    const emailValue = await AsyncStorage.getItem('email')

      .then(async (userRec7) => {
        setEmail(userRec7);
      })
  }

  useEffect(() => {
    if (typeof email != "undefined") {
      getstorage7();
    } else {
      console.log("email tripped it up");
    }
  }, [email]);

  async function getstorage7() {

    const idValue = await AsyncStorage.getItem('id')

      .then(async (userRec8) => {
        setId(userRec8);
      })
  }
  useEffect(() => {
    if (typeof id != "undefined") {
      getstorage8();
    } else {
      console.log("id tripped it up");
    }
  }, [id]);

  async function getstorage8() {

    const idValue = await AsyncStorage.getItem('phonenumber')

      .then(async (userRec8) => {
        setPnumber(userRec8);
      })
  }
  useEffect(() => {
    if (typeof pnumber != "undefined") {
      getstorage9();
    } else {
      console.log("id tripped it up");
      getstorage9();
    }
  }, [pnumber]);

  async function getstorage9() {

    const roleValue = await AsyncStorage.getItem('role')

      .then(async (userRec4) => {
        setRole(userRec4);
      })
  }

  useEffect(() => {
    if (typeof role != "undefined") {
      if (role === "Teacher") {
        navigation.navigate("Mainmenuteacher", { school2: school, id2: id, town2: town, role2: role, email2: email, teacheriscalled2: teacheriscalled, state2: state });
      } else if (role === "Admin") {
        navigation.navigate("Mainmenuadmin", { school2: school, id2: id, town2: town, role2: role, email2: email, teacheriscalled2: teacheriscalled, state2: state });
      } else{
        console.log("You are a student");
      }
    } else {
      console.log("role tripped it up");
    }
  }, [role]);



  const getadjustment = () => {

    if ((typeof id != "undefined") && (typeof classid != "undefined") && (typeof role != "undefined")) {
  
      const docRef = doc(firebase, "users", id);

      const docData = getDoc(docRef)

        .then((docSnap) => {

          if (docSnap.exists()) {

            let object = docSnap.data();
            const getpenaltystatus = object.temporary;
            const phonepassawardedd = object.phonepassawarded;
            const statusupdate = object.status;
            const idofpass = object.passid;
            const lastmistep = object.lastmistake;
            const lasttime = object.lastmistaketime;
            setNowinpenaltylocal(getpenaltystatus)
            setLastmisstep(lastmistep)
            setLastmissteptime(lasttime)
            setGetstatus(statusupdate);
            setGetexistingpassid(idofpass);
          }

        })
    }
  }


  useEffect(() => {
    console.log("3", getexistingpassid, "3");

    getpassdetails();
  }, [getexistingpassid]);

  const getpassdetails = () => {

    if (typeof getexistingpassid != "undefined" && getexistingpassid != "") {

      const docRef = doc(firebase, "passes", getexistingpassid);

      const docData = getDoc(docRef)

        .then((docSnap) => {

          let object = docSnap.data();


          const sessionid = object.classsessionid;
          const classid = object.classid;
          const location = object.comingfrom;
          const coursename = object.coursename;
          const destination = object.destination;
          const teacherid = object.teacherid;
          const idreturnteacher = object.
            returnteacherid;
          const timallowed = object.timeallowedonpass;
          const limitreached = object.whenlimitwillbereached;
          const rightnow = object.passdetailrightnow;
          const currentdate = object.passdetailcurrentdate;
          const realtimeleave = object.passdetailrealtimeleave;
          const classending = object.endofclasssession;

          setPassclassid(classid);

          setPassrightnow(rightnow);
          setPasscurrentdate(currentdate);
          setPassrealtimeleave(realtimeleave);

          setTeacheridfrompass(teacherid);
          setPassteacheridreturn(idreturnteacher);
          setExpectedreturnfrompass(limitreached);
          setTimeallowed(timallowed);
          setPasslocaation(location);

          setPassclasssessionid(sessionid);
          setPasscoursename(coursename);
          setClasssessionending(classending);
          setPassdestinaation(destination);
        })
    }

  }


  const deleteaccount2 = () => {

    Alert.alert('Please be aware.', 'Your account with all of its associated records will be removed from the database at the end of the school session.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Delete Account', onPress: () => console.log("delete this account!") },
    ]);

  }

  useEffect(() => {
    console.log("5");
    updatedatabase();
  }, [percent]);

  const updatedatabase = () => {

    console.log("6");

    if ((typeof classid != "undefined") && (typeof total3 != "undefined") && (typeof total2 != "undefined") && (typeof getadjustmentss != "undefined") && positivenegative) {

      const percents = { id: classid, penaltyminutes: (total3 / 60000), overunder: total2, adjustments: getadjustmentss, level: overunderstatus }

      if (classid && id) {

        updateDoc(doc(firebase, "users", id), {
          [classid]: percents,
        }).catch((error) => {
          console.log(error); alert(error);
        })
        updateDoc(doc(firebase, "classesbeingtaught", classid), {
          removescanneraddbutton: false,
        }).catch((error) => {
          console.log(error); alert(error);
        })
      }
    }

  }

  // navigation.setOptions should be placed inside of a useEffect

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() =>
          console.log("hello")}>
          <Text accessibilityLabel="Guest" style={styles.error}>
          </Text>
        </TouchableOpacity>
      ),
    });

  }, []);


  const getadjustment2 = () => {
    if (typeof id != "undefined") {
      console.log(id, "301 here is something else", classid);
      const docRef = doc(firebase, "users", id);

      const docData = getDoc(docRef)

        .then((docSnap) => {
          if (docSnap.exists()) {
            let object = docSnap.data();
            const statusupdate = object.status;
            const idofpass = object.passid;

            const ifonpenaltynumberofpasses = object.passesallowedinweekifonpenalty;

            const lastmistep = object.lastmistake;
            const lasttime = object.lastmistaketime;
            setLastmisstep(lastmistep)
            setLastmissteptime(lasttime)

            setPassesallowedinweekifonpenalty(ifonpenaltynumberofpasses)

            setGetstatus(statusupdate);
            setGetexistingpassid(idofpass);
          }
        })
    }
  }

  const sendtoplace = () => {
    if (getstatus === "On Newlocation Pass") {
      navigation.navigate("Pass", { id: id, passid: getexistingpassid, school: school, state: state, town: town, firstname: firstname, lastname: lastname, classid: passclassid, currentsessionid: passclasssessionid, currentlocation: passlocation, coursename: passcoursename, locationdestination: passdestination, bathroomtime: timeallowed, teacheridforreturn: passteacheridreturn, teacherid: teacheridfrompass, timeallowed: timeallowed, expectedreturn: expectedreturnfrompass, rightnow: passrightnow, currentdate: passcurrentdate, realtimeleave: passrealtimeleave, newlocation:passdestination });

    }
   else if (getstatus === "On Pass") {
      navigation.navigate("Pass", { id: id, passid: getexistingpassid, school: school, state: state, town: town, firstname: firstname, lastname: lastname, classid: passclassid, currentsessionid: passclasssessionid, currentlocation: passlocation, coursename: passcoursename, locationdestination: passdestination, bathroomtime: timeallowed, teacheridforreturn: passteacheridreturn, teacherid: teacheridfrompass, timeallowed: timeallowed, expectedreturn: expectedreturnfrompass, rightnow: passrightnow, currentdate: passcurrentdate, realtimeleave: passrealtimeleave });

    }
    else if (getstatus === "inlineforbathroom") {
      navigation.navigate("Lineforbathroompass", { id: id, passid: getexistingpassid, school: school, state: state, town: town, firstname: firstname, lastname: lastname, classid: passclassid, currentsessionid: passclasssessionid, currentlocation: passlocation, coursename: passcoursename, locationdestination: passdestination, bathroomtime: timeallowed, teacheridforreturn: passteacheridreturn, teacherid: teacheridfrompass });
    } else { navigation.navigate("Passisready", { id: id, passid: getexistingpassid, school: school, state: state, town: town, firstname: firstname, lastname: lastname, classid: passclassid, currentsessionid: passclasssessionid, currentlocation: passlocation, coursename: passcoursename, locationdestination: passdestination, teacherid: teacheridfrompass, drinkofwater: timeallowed, teacheridforreturn: passteacheridreturn, nonbathroomtime: timeallowed }); }
  }

  if (typeof id != "undefined") {

    console.log("9", id, "9");

    onSnapshot(doc(firebase, "users", id), () => {
      getadjustment()
    }
    )
  }


  useEffect(() => {

    console.log("10", passclassid, passclasssessionid, passlocation, passcoursename, passdestination, timeallowed);

    const timenow = Date.now();

    if (passclassid && passlocation && passcoursename && passdestination && timeallowed) {
      sendtoplace();
    }
  }, [passdestination]);


  useEffect(() => {

    console.log("11");
    getpassdetails();
  }, [getexistingpassid]);

  useEffect(() => {
if (typeof getexistingpassid != "undefined" && getexistingpassid != "") 
    console.log("11");
    getpassdetails();
  }, []);


  useEffect(() => {

    console.log("12");
    newupdate();
  }, [passid]);

  const newupdate = () => {

    console.log("13");

    if (typeof coursename === "undefined") {

    } else {
      setShowspinner(true);
      getpenaltytimeoneclass();
      getlocationsqrcodes2();
    }
  }

  useEffect(() => {
    console.log("15");
    if (typeof coursename === "undefined") {
    } else {
      setShowspinner(true);
      getpenaltytimeoneclass();
      getlocationsqrcodes2();
    }
  }, [coursename,lastmistep]);

  useEffect(() => {
    console.log("16", total3, total5, "these are the totals");
    if (isNaN(100 - ((((total3/60000) / total5) * 100)))) {
      setPercent(100);
    } else {
      setPercent(100 - (((total3 / total5) * 100)));
    }
  }, [total5]);

  useEffect(() => {
    console.log("17", total3, total5, "these are the totals");
    gettotaltimeoneclass();
  }, [total3]);


  useEffect(() => {
    console.log("18");
    setTotal2(Math.floor(total * 10) / 10);
  }, [total]);

  useEffect(() => {
    console.log("19");
    if (typeof classid != "undefined") {
      if (isNaN(getadjustmentsandplustotal2)) {
        setPositivenegative("positive");
      }
      else if (getadjustmentsandplustotal2 < 0) {
        setPositivenegative("negative");
      } else {
        setPositivenegative("positive");
      }

    } else {
      if (isNaN(total2)) {
        setPositivenegative("no rating");
      }
      else if (total2 < 0) {
        setPositivenegative("negative");
      } else {
        setPositivenegative("positive");
      }
    }
  }, [getadjustmentsandplustotal2, total2]);



  useEffect(() => {

    console.log("20");

    if (typeof total2 != "undefined") {

      const newnumber = ((Math.round((total2) * 10)) / 10);

      setGetadjustmentsandplustotal2(newnumber);
    }
    else if (typeof getadjustmentss != "undefined") {

      const newnumber = ((Math.round((getadjustmentss) * 10)) / 10);

      setGetadjustmentsandplustotal2(newnumber);
    }
    else {
      setGetadjustmentsandplustotal2(0);
    }
  }, [classid, getadjustmentss, total2, adjust]);




  async function getlocationsqrcodes2() {

    console.log("21");

    const array = []
    const sum = 0;
    if (typeof id != "undefined" && typeof classid != "undefined") {
      const q = query(collection(firebase, "passes"), where("studentid", "==", id), where("classid", "==", classid));

      const querySnapshot = await getDocs(q)

        .then(async (snapshot) => {
          snapshot.forEach(doc => {
            if (isNaN(doc.data().differenceoverorunderinminutes) === true) {
              console.log("this is Not a numbe", doc.data().differenceoverorunderinminutes, doc.data().id, "this is Not a number the array")
            } else {
              array.push(doc.data().differenceoverorunderinminutes)
              console.log("this is a number", doc.data().differenceoverorunderinminutes, doc.data().id, "this is a number the array")
            }
          })

        }).then(async () => {
          
          setTotal(array.reduce((a, b) => a + b, 0));
        })

    }

    setShowspinner(false);
  };

  async function getpenaltytimeoneclass() {

    console.log("22");

    if (typeof id != "undefined" && typeof classid != "undefined") {
      setShowspinner(true);

      const array = [];
      const sum = 0;
      const arrayy = [];
      if (id) {
        const q = query(collection(firebase, "consequencephoneuse"), where("studentid", "==", id), where("classid", "==", classid));

        const querySnapshot = await getDocs(q)

          .then(async (snapshot1) => {
            snapshot1.forEach(doc => {
              array.push(doc.data().totaltimeinpenalty)
            })

          }).then(async () => {
            if (array.length === 0) {
              setTotal3(0);
            } else {
              setTotal3(array.reduce((a, b) => a + b, 0));
            }
          })
      }
      console.log("HI7")
    }

  };


  //THIS IS THE ONE!

  async function gettotaltimeoneclass() {

    console.log("23");
    const array = []
    const sum = 0;
    if (typeof id != "undefined" && typeof classid != "undefined") {
      const q = query(collection(firebase, "classsessions"), where("classesbeingtaughtid", "==", classid));

      const querySnapshot = await getDocs(q)

        .then(async (snapshot) => {
          snapshot.forEach(doc => {
            let number = doc.data().lengthofclass;
            let classsession = lengthofclasssession/60000;
            if (number > classsession) {
                console.log("mistake made");
                array.push(classsession);
            } else {
                array.push(number);
            }
        })
    }).then(async () => {

          console.log(array, "this is the array in total classtime")
          array.forEach(obj => {
            console.log(lengthofclasssession,obj, "Main Menu")
        });
          setTotal5(array.reduce((a, b) => a + b, 0));
        })
    }


  };

  LogBox.ignoreAllLogs();


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <TouchableOpacity>
          {typeof coursename === "undefined" ? null : <Text style={styles.paragraph22} onPress={() => newupdate()} >Personal Ratings</Text>}
        </TouchableOpacity>

        <View style={styles.centerscroll}>



          {coursename && ((nowinpenalty === "null" && typeof Nowinpenaltylocal === "undefined") || (Nowinpenaltylocal === "null")) ? <View style={styles.button}>
            <Text style={styles.btext}>{coursename}{'\n'}In Good Standing</Text></View> : coursename && (((nowinpenalty === "true" || nowinpenalty === "false") && typeof Nowinpenaltylocal === "undefined") || (Nowinpenaltylocal === "true" || Nowinpenaltylocal === "false")) ? <View style={styles.button}><Text style={styles.btext}>{coursename}{'\n'}In Penalty</Text></View> : null}

          {typeof coursename === "undefined" ? null : <Text>{'\n'}</Text>}

          {typeof coursename === "undefined" ? null : <View style={styles.button2}><View style={styles.btext2}><Text style={styles.btext}>{coursename}{'\n'}{'\n'}In Compliance{'\n'}With Class Rules</Text><Text style={styles.btext3}>{Math.floor(100 - ((total3/60000)/(total5) * 100))}%</Text></View><View style={styles.btext2}><Text style={styles.btext5}>{coursename}{'\n'}{'\n'}Respect For Self{'\n'}& Others Rating</Text><Text style={positivenegative === "negative" ? styles.btext4 : styles.btext44}>{positivenegative}</Text><Text style={styles.btext4}> {positivenegative === "negative" ? getadjustmentsandplustotal2 : ""}</Text></View></View>}
          {typeof coursename === "undefined" ? null : <Text>{'\n'}</Text>}

          {coursename && lastmistep === "Late On A Pass" && lastmissteptime > (Date.now() - 432000000) ? <View style={styles.button}>
            <Text style={styles.btext27}>Try To Improve!</Text><Text style={styles.btext25}>Your Last Misstep:{'\n'}Taking Too Much Time On A Hall Pass.</Text></View> : coursename && lastmistep === "Late To Class" && lastmissteptime > (Date.now() - 432000000) ? <View style={styles.button}>
            <Text style={styles.btext27}>Try To Improve!</Text><Text style={styles.btext25}>Your Last Misstep:{'\n'}Showing Up Late To Class.</Text></View> : coursename && lastmistep != "" && lastmistep != "Not Specified" && lastmissteptime > (Date.now() - 432000000) ? <View style={styles.button}>
              <Text style={styles.btext27}>Try To Improve!</Text><Text  style={styles.btext25}>Class Rule You Didn't Follow:{'\n'}{lastmistep}</Text></View> : coursename ? <View style={styles.button}><Text style={styles.btext25}>According to our records{'\n'}You have not had any missteps.{'\n'}Good Job!</Text></View> : null}

          {typeof coursename === "undefined" && endofclasssession > Date.now() ? null : <Text>{'\n'}</Text>}

        </View>

        {typeof coursename === "undefined" ? null : <View><Text style={styles.paragraph2}> ___________________ </Text></View>}

        {typeof id != "undefined" ?<View><Text style={styles.paragraph2}>Daily Activity{'\n'}</Text></View>: null}

        <View style={styles.centerscroll}>

          {coursename ? <View style={styles.button}>

            <Text style={styles.btext} onPress={() => navigation.navigate("ClassesStudent", {
              teacherid: teacherid, classid: classid, coursename: coursename, section: section, location: location, school: school, teacher: teacher, town: town, state: state, school: school, firstname: firstname, lastname: lastname, id: id, percent: percent, total2: total2, getadjustmentsandplustotal2: getadjustmentsandplustotal2, getstatus: getstatus, passid: getexistingpassid, pnumber:pnumber, passesallowedinweekifonpenalty:passesallowedinweekifonpenalty
            }
            )}>Begin Making A Pass</Text>
          </View> : typeof id != "undefined" ? <View style={styles.button}>

            <Text style={styles.btext} onPress={() => navigation.navigate("ClassesStudent", {
              teacherid: teacherid, classid: classid, coursename: coursename, section: section, location: location, school: school, teacher: teacher, town: town, state: state, school: school, firstname: firstname, lastname: lastname, id: id, percent: percent, total2: total2, getadjustments: getadjustmentss, getadjustmentsandplustotal2: getadjustmentsandplustotal2, total3: total3, getstatus: getstatus, passid: getexistingpassid, pnumber:pnumber, passesallowedinweekifonpenalty:passesallowedinweekifonpenalty
            })}>Select Your Location</Text>
          </View> : null}

          {coursename ? <Text>{'\n'}{'\n'}</Text> : null}
          {coursename ? <View style={styles.button}>
            <Text style={styles.btext} onPress={() => navigation.navigate("Relatedrules", {
              teacherid: teacherid, classid: classid, coursename: coursename, section: section, location: location, school: school, teacher: teacher, town: town, state: state, school: school, firstname: firstname, lastname: lastname, id: id, percent: percent, total2: total2, getadjustmentsandplustotal2: getadjustmentsandplustotal2, getstatus: getstatus, passid: getexistingpassid, pnumber:pnumber
            })}>Rules Set By This Teacher</Text>
          </View> : null}

          {coursename ? <Text>{'\n'}{'\n'}</Text> : null}
          {coursename ? <View style={styles.button}>
            <Text style={styles.btext} onPress={() => navigation.navigate("StudentConsequences", {
              teacherid: teacherid, classid: classid, coursename: coursename, section: section, location: location, school: school, teacher: teacher, town: town, state: state, school: school, firstname: firstname, lastname: lastname, id: id, percent: percent, total2: total2, getadjustmentsandplustotal2: getadjustmentsandplustotal2, getstatus: getstatus, passid: getexistingpassid, pnumber:pnumber
            })}>Consequences Given</Text>
          </View> : null}

          {coursename ? <Text>{'\n'}{'\n'}</Text> : null}
          {coursename ? <View style={styles.button}>
            <Text style={styles.btext} onPress={() => navigation.navigate("Passesstudents", {
              teacherid: teacherid, classid: classid, coursename: coursename, section: section, location: location, school: school, teacher: teacher, town: town, state: state, school: school, firstname: firstname, lastname: lastname, id: id, percent: percent, total2: total2, getadjustmentsandplustotal2: getadjustmentsandplustotal2, getstatus: getstatus, passid: getexistingpassid, pnumber:pnumber
            })}>My Passes/Tardies</Text>
          </View> : null}

          <Text>{'\n'}</Text>
          {typeof id != "undefined" ? <Text>{'\n'}</Text> : null}

         {typeof id != "undefined" ? <View><Text style={styles.paragraph2}> ___________________ </Text></View>: null }
          <View><Text style={styles.paragraph2}>Set-Up{'\n'}</Text></View> 

          <View style={styles.button}>

            {typeof id != "undefined" ? <Text style={styles.btext} onPress={() => navigation.navigate("Availableclasses", {
              teacherid: teacherid, classid: classid, coursename: coursename, section: section, location: location, school: school, teacher: teacher, town: town, state: state, school: school, firstname: firstname, lastname: lastname, id: id, percent: percent, total2: total2, email: email, getadjustmentsandplustotal2: getadjustmentsandplustotal2, pnumber:pnumber
            })}>Join A Class</Text> : <Text style={styles.btext} onPress={() => getstorage0()}>Reset Needed</Text>}
          </View>
          <Text>{'\n'}</Text>
          <View><Text style={styles.paragraph2}> ___________________ </Text></View>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.paragraph2}>
              Sign Out
            </Text>
          </TouchableOpacity>

          {classid && teacherid ? <View><Text style={styles.paragraph2}> ___________________ </Text></View> : null}
          {classid && teacherid ? <TouchableOpacity onPress={() => deleteaccount2()}>
            <Text style={styles.paragraph2}>
              Delete Account
            </Text>
          </TouchableOpacity> : null}

          <Text>{'\n'} {'\n'}{'\n'} {'\n'}{'\n'} {'\n'}{'\n'} {'\n'}{'\n'}{'\n'}{'\n'} {'\n'}{'\n'} {'\n'}{'\n'} </Text>

        </View>
      </ScrollView>
    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: 2,
    alignItems: "center",

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
    margin: 24,
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    color: '#FFFFFF',
    backgroundColor: '#000000',
    fontWeight: "bold"


  },

  section4: {
    padding: 10,
    height: "20%"

  },
  paragraph4: {

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000',
    color: "#FFF",

    color: "#FFF",

  },

  scroll: {
    width: "100%",
    flex: 1,

  },
  centerscroll: {
    alignItems: "center",

  },


  button: {
    width: "90%",
    alignItems: "center",
    textAlign: "center",
    width: "95%",
    borderColor: "#E43522",
    borderWidth: 2,
    justifyContent: "center",
    color: "#fff",
    backgroundColor: "#013469",
    borderRadius: 20,

  },
  button2: {
    height: 170,
    flex: 1, flexDirection: 'row',
    alignItems: "center",
    textAlign: "center",
    borderColor: "#E43522",
    justifyContent: "center",
    color: "#fff",



  },

  btext: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    width: "100%",
    justifyContent: "center",
    color: "#fff",
  },
  btext27: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    width: "100%",
    justifyContent: "center",
    color: "#fff",
  },
  btext25: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 14,
    width: "100%",
    justifyContent: "center",
    color: "#fff",
  },
  btext5: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    width: "100%",
    justifyContent: "center",
    color: "#fff",
  },
  btext2: {
    margin: "1%",
    textAlign: "center",
    fontSize: 16,
    width: "45%",
    height: "120%",

    color: "#fff",
    backgroundColor: "#013469",
    borderRadius: 20,
    borderColor: "#E43522",
    borderWidth: 2,
    alignItems: "center",
  },

  btext3: {
    lineHeight: 65,
    fontSize: 46,
    color: "#fff",
    backgroundColor: "#013469",
    alignItems: "center",
  },
  btext4: {
    lineHeight: 30,
    fontSize: 30,
    color: "#fff",
    backgroundColor: "#013469",
    alignItems: "center",
    fontVariant: ['small-caps'],
    justifyContent: "center"
  },
  btext44: {
    lineHeight: 40,
    fontSize: 35,
    color: "#fff",
    backgroundColor: "#013469",
    alignItems: "center",
    fontVariant: ['small-caps'],
    justifyContent: "center"
  },

  paragraph22: {

    fontSize: 20,
    textAlign: 'center',
    padding: 5,
    color: '#FFFFFF',
    backgroundColor: "#000",
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 50,


  },

  paragraph9: {
    margin: 5,
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
    color: '#FFF',
    backgroundColor: '#000000',

  },
  containerparagraph9: {

    fontSize: 20,
    textAlign: 'center',

    color: '#FFF',
    backgroundColor: '#E43522',
    width: "100%",
    flex: .4,

  },


});
