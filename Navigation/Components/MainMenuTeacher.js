import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, View, TouchableOpacity, Text, ScrollView, Pressable, LogBox, ActivityIndicator } from 'react-native';
import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification, sendSignInLinkToEmail } from "@firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { onSnapshot, getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion, orderBy, limit } from "@firebase/firestore";



const TeacherMainMenu = ({ route, navigation }) => {

  LogBox.ignoreAllLogs();

  const [youcangetincomingpass, setYoucangetincomingpass] = useState(false);
  const [youcangetpassclass, setYoucangetpassclass] = useState();
  const [youcangetincomingpassclass, setYoucangetincomingpassclass] = useState(true);
  const [endtime, setEndtime] = useState();
  const [endlastclass, setEndlastclass] = useState();
  const [thelastid, setthelastid] = useState();

  const [showspinner, setShowspinner] = useState(false);

  const [coursename2, setCoursename2] = useState("");

  const [classiscurrent, setClassiscurrent] = useState();
  const [nameofcurrentclass, setNameofcurrentclass] = useState();
  const [idofcurrentclass, setIdofcurrentclass] = useState();
  const [starttimeofcurrentclass, setStarttimeofcurrentclass] = useState();
  const [getdatedotnow, setDatedotnow] = useState();
  const [arrayforconsequences, setArrayforconsequences] = useState();
  const [totalinlineforbathroomlocal, setTotalinlineforbathroomlocal] = useState();

  const [id, setId] = useState();
  const [school, setSchool] = useState();
  const [state, setState] = useState();
  const [town, setTown] = useState();
  const [role, setRole] = useState();
  const [teacheriscalled, setTeacheriscalled] = useState();
  const [email, setEmail] = useState();

  const [userdata, setUserdata] = useState();
  const [totalinline2, setTotalinline2] = useState();

  const [allowuntrackedpasses, setAllowuntrackedpasses] = useState();



  const { currentsessionid, userinformation, school2, state2, town2, role2, id2, teacheriscalled2, email2, bathroompasslimit, drinkpasslimit, ifnegativeplusminus, nonbathroompasslimit, exclusivephonepassmaxstudents, exclusivephonepasstimelmit, lengthofclass, classid, coursename, section, location, teacherid,
    starttime, lengthofclassesforacomputer, inpenalty, stoptimepenalty, starttimepenalty, totaltimepenalty, alreadyused, teacher, Selectedclassdestination, currentlocation, locationdestination, firstname, lastname, ledby, grouptime, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, lengthofclasses, endlastclasssubstitute, sessionended, phonepassduration, overunder, drinkpassduration, bathroompassduration, otherpassduration, maxstudentsphonepass, donewithworkphonepass, consequenceid, sessionending, maxstudentsbathroom, classsessionbegun, linkedclass
  } = route.params;

  console.log(youcangetpassclass, "youcangetpassclass", id2, role2, "id2", "role");


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('email').then((valueb) => {
        setEmail(valueb)
      })
      const value2 = await AsyncStorage.getItem('id').then((valuea) => {
        setId(valuea)
      })
      const value5 = await AsyncStorage.getItem('town').then((valuec) => {
        setTown(valuec)
      })
      const value6 = await AsyncStorage.getItem('school').then((valued) => {
        setSchool(valued)
      })
      const value7 = await AsyncStorage.getItem('state').then((valuee) => {
        setState(valuee)
      })
      const value8 = await AsyncStorage.getItem('teacheriscalled').then((valuef) => {
        setTeacheriscalled(valuef)
      })
      const value9 = await AsyncStorage.getItem('role').then((valueg) => {
        setRole(valueg)
      })

    } catch (e) {
      // error reading value
    }
  }


  useEffect(() => {
    if (typeof id2 != "undefined") {
      setId(id2);
      setSchool(school2);
      setState(state2);
      setTown(town2);
      setRole(role2);
      setTeacheriscalled(teacheriscalled2);
      setEmail(email2);
    }
  }, [id2]);

  useEffect(() => {

    setId(id2);
    setSchool(school2);
    setState(state2);
    setTown(town2);
    setRole(role2);
    setTeacheriscalled(teacheriscalled2);
    setEmail(email2);


  }, []);

  const resetinfo = () => {
    if (typeof id != "undefined") {

      const docRef = doc(firebase, "users", id);
      const docData = getDoc(docRef)

        .then((docSnap) => {

          setSchool(docSnap.data().school);
          setTown(docSnap.data().town);
          setState(docSnap.data().state);
          setTeacheriscalled(docSnap.data().teacheriscalled);
          setRole(docSnap.data().role);

        })
    } else {
      console.log("nothting hereeeeeeeee")
    }

  }



  async function runthisfunction() {

    const q = query(collection(firebase, "passes"), where("classsessionid", "==", currentsessionid), where("timeleftclass", "==", 0), orderBy("placeinline", "asc"));

    const querySnapshot = await getDocs(q)

      .then(function (snapshot) {
        const array = []
        snapshot.forEach(doc => {

          array.push(doc.data())
        })
        setUserdata(array)
      })
  };


  useEffect(() => {
    if (typeof userdata != "undefined") {
      setTotalinline2(userdata.length)
    }
  }, [userdata]);

  useEffect(() => {
    if ((typeof totalinline2 != "undefined") && (typeof classid != "undefined")) {
      makechange();
    }
  }, [totalinline2]);


  const makechange = () => {
    console.log("Is this the last thing to get run?")

    updateDoc(doc(firebase, "classesbeingtaught", classid), {
      totalinlineforbathroom: totalinline2
    }).catch((error) => {
      console.log(error); alert(error);
    })

  }



  const rightnow = Date.now();

  useEffect(() => {
    if (sessionending < rightnow) {
      setClassiscurrent(false);
    }
    else if (sessionending > rightnow) {
      setClassiscurrent(true);
    } else {
      null;
    }
  }, [sessionending]);

  const signoutfunction = () => {
    auth.signOut();
  }

  const deleteaccount = () => {

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
    if (getdatedotnow > 0 && sessionending > 0) {
      endsessionprematurely();
    }
  }, [getdatedotnow]);


  const endsessionprematurely = () => {


    if (sessionending < getdatedotnow) {

      setClassiscurrent(false);

      updateDoc(doc(firebase, "classsessions", currentsessionid), {
        status: "Completed"
      })
        .catch(error => {
          console.log(error); alert(error);
        })

    } else {

      setShowspinner(true);

      Alert.alert('Please be aware.', 'This will end the current session.', [
        {
          text: 'Cancel',
          onPress: () => setShowspinner(false),
          style: 'cancel',
        },
        { text: 'End Session', onPress: () => setEndtime(Date.now()) },
      ]);
    }

  }

  useEffect(() => {

    if (currentsessionid) {
      const array = [];

      const q = query(collection(firebase, "consequencephoneuse"), where("sessionid", "==", currentsessionid), where("stoptimepenalty", ">", endtime));

      const querySnapshot = getDocs(q)

        .then(function (snapshot) {

          snapshot.forEach(docs => {
            array.push({ id: docs.data().id, starttime: docs.data().starttimepenalty, studentid: docs.data().studentid });
          })
          setArrayforconsequences(array);
        })
    }
  }, [endtime]);



  useEffect(() => {

    if (typeof arrayforconsequences != "undefined") {

      for (let i = 0; i < arrayforconsequences.length; i++) {
        updateDoc(doc(firebase, "consequencephoneuse", arrayforconsequences[i].id), {
          stoptimepenalty: endtime,
          totaltimeinpenalty: endtime - (arrayforconsequences[i].starttime),
          penaltyminutes: (endtime - (arrayforconsequences[i].starttime)) / 60000,

        }).catch((error) => {
          console.log(error); alert(error);
        })
      }
    }
  }, [arrayforconsequences]);



  useEffect(() => {
    if (coursename) {
      getstatus();
      runthisfunction();
    }
  }, [coursename]);


  useEffect(() => {
    if (currentsessionid) {
      getstatus();
      runthisfunction();
    }
  }, [currentsessionid]);


  async function getstatus() {
    const trythis = collection(firebase, "classsessions");
    const q = query(trythis, where("teacherid", "==", id), where("status", "==", "Happening Now"), orderBy("classbeginnumber", "asc"))
    const querySnapshot = await getDocs(q)
      .then(function (snapshot) {
        const array = [];
        const truefalse = false;
        let noww = Date.now();
        snapshot.forEach(doc => {

          if (noww > (doc.data().passesnolongeravailable)) {
            array.push(doc.data().id);
            let truefalse = true;
          }
          else if (noww < (doc.data().passesnolongeravailable)) {
            setClassiscurrent(true);
            setNameofcurrentclass(doc.data().classname);
            setIdofcurrentclass(doc.data().id);
            setStarttimeofcurrentclass(doc.data().classbeginnumber)
          }

          else { console.log("no documents to update") }
        })


        setthelastid(array);
        setEndlastclass(truefalse);
      })
  };

  useEffect(() => {
    if (thelastid) {

      for (let i = 0; i < thelastid.length; i++) {
        updateDoc(doc(firebase, "classsessions", thelastid[i]), {
          status: "Completed"
        }).catch((error) => {
          console.log(error); alert(error);
        })

      }
    }
  }, [endlastclass]);


  useEffect(() => {

    const rightnow = Date.now();

    if (endtime > starttime) {
      setClassiscurrent(false);

      updateDoc(doc(firebase, "classsessions", currentsessionid), {
        passesnolongeravailable: endtime,
        lengthofclass: Math.round((endtime - starttime) / (60000)),
        status: "Completed"
      }).then(docRef => {
        console.log("Value of an Existing Document Field has been updated");
        setShowspinner(false);

      })
        .catch(error => {
          console.log(error); alert(error);
        }),
        updateDoc(doc(firebase, "classesbeingtaught", classid), {
          currentsessionends: endtime,
          inusebathroompass: 0,
          inuseexclusivephonepass: 0,
          totalinlineforbathroom: 0,
          totalinlineforexclusivephone: 0,
        }).catch((error) => {
          console.log(error); alert(error);
        }),

        setEndlastclass(true);
    }
  }, [endtime]);

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



  useEffect(() => {
    console.log(id, "this is the id")
    if (typeof role === "undefined" || role === "" || typeof school === "undefined" || school === "" || typeof state === "undefined" || state === "" || typeof town === "undefined" || town === "" || typeof teacheriscalled === "undefined" || teacheriscalled === "" || typeof id === "undefined" || id === "") {
      resetinfo();
    } else {
      console.log("Everything is cool!")
    }
  }, []);

  useEffect(() => {
    console.log(id, "This is the id");
    if (typeof role === "undefined" || typeof school === "undefined" || typeof state === "undefined" || typeof town === "undefined" || typeof teacheriscalled === "undefined" || teacheriscalled === "" || typeof id === "undefined") {
      resetinfo();
    } else {
      console.log("Everything is cool!")
    }
  }, [teacheriscalled]);

  useEffect(() => {
    console.log(email2, "THIS IS THE EMAIL");
    if (typeof email2 != "undefined" && email2 != "Mkrebs@rpsk12.org" && email2 != "Mrjones@rpsk12.org" && email2 != "Nurse@rpsk12.org" && email2 != "mkrebs@rpsk12.org" && typeof email != "undefined" && email != "Mkrebs@rpsk12.org" && email != "Mrjones@rpsk12.org" && email != "Nurse@rpsk12.org" && email != "mkrebs@rpsk12.org") {
      navigation.navigate("SignIn");
      alert("This App is in Development. Direct inquiries to mattkrebsemail@gmail.com.")
    } else {
      console.log("let him in.");
    }
  }, [teacheriscalled]);



  useEffect(() => {
    if (typeof coursename != "undefined") {
      if (allowuntrackedpasses === true) {
        allowuntracked();
      } else {
        donotallowuntracked();
      }
    }
  }, [allowuntrackedpasses]);

  const allowuntracked = () => {

    updateDoc(doc(firebase, "classesbeingtaught", classid), {
      passesareavailable: true,
      currentsessionid: currentsessionid, sessionending: sessionending,
    }).catch((error) => {
      console.log(error); alert(error);
    })

  }

  const donotallowuntracked = () => {

    updateDoc(doc(firebase, "classesbeingtaught", classid), {
      passesareavailable: false,
      currentsessionid: currentsessionid, sessionending: sessionending,
    }).catch((error) => {
      console.log(error); alert(error);
    })

  }





  useEffect(() => {

    if (typeof coursename === "undefined") {
      if (youcangetincomingpass) {
        makeallincomingpassesavailable();
      } else {
        makeallincomingpassesunavailable();
      }
    }
  }, [youcangetincomingpass]);



  useEffect(() => {
    if (typeof coursename != "undefined") {
      if (youcangetpassclass) {
        makepassesavailable();
      } else {
        makepassesunavailable();
      }
    }
  }, [youcangetpassclass]);

  useEffect(() => {
    if (coursename) {
      if (youcangetincomingpassclass) {
        makeincomingpassesavailable();
      } else {
        makeincomingpassesunavailable();
      }
    }
  }, [youcangetincomingpassclass]);

  const makepassesavailable = () => {

    updateDoc(doc(firebase, "classesbeingtaught", classid), {
      passesareavailable: true,
      currentsessionid: currentsessionid, sessionending: sessionending,
    }).catch((error) => {
      console.log(error); alert(error);
    })

  }

  const makeincomingpassesavailable = () => {

    updateDoc(doc(firebase, "classesbeingtaught", classid), {
      acceptingincomingstudents: true,
      currentsessionid: currentsessionid, sessionending: sessionending,
    }).catch((error) => {
      console.log(error); alert(error);
    })

  }

  const makepassesunavailable = () => {

    updateDoc(doc(firebase, "classesbeingtaught", classid), {
      passesareavailable: false,
    }).catch((error) => {
      console.log(error); alert(error);
    })

  }
  const makeincomingpassesunavailable = () => {

    updateDoc(doc(firebase, "classesbeingtaught", classid), {
      acceptingincomingstudents: false
    }).catch((error) => {
      console.log(error); alert(error);
    })
  }


  async function makeallincomingpassesunavailable() {
    if (typeof id != "undefined") {
      const q = query(collection(firebase, "classesbeingtaught"), where("teacherid", "==", id));

      const querySnapshot = await getDocs(q)
        .then(function (snapshot) {

          snapshot.forEach(docs => {
            updateDoc(doc(firebase, "classesbeingtaught", docs.data().id), {
              acceptingincomingstudents: false
            }).catch((error) => {
              console.log(error); alert(error);
            })

          })

        })
    }
  };

  async function makeallincomingpassesavailable() {
    console.log("makeallincomingpassesavailable was run")


    const q = query(collection(firebase, "classesbeingtaught"), where("teacherid", "==", id));

    const querySnapshot = await getDocs(q)

      .then(function (snapshot) {

        snapshot.forEach(docs => {
          updateDoc(doc(firebase, "classesbeingtaught", docs.data().id), {
            acceptingincomingstudents: true,
            currentsessionid: currentsessionid, sessionending: sessionending,
          }).catch((error) => {
            console.log(error); alert(error);
          })

        })
      })

  };

  return (
    <View style={styles.container}>
      {coursename ? <View><Text style={styles.paragraph9}>Now Active: {'\n'}{coursename} - {section} </Text></View> : <View><Text style={styles.paragraph9}>No Class is Active</Text></View>}


      <ScrollView style={styles.scroll}>

        <View style={styles.centerscroll}>

          <View><Text style={styles.paragraph2}>Daily Management {'\n'}</Text></View>

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


          {coursename && (classiscurrent && (Date.now() < sessionending)) ? <View style={styles.button}><Text style={styles.btext} onPress={(e) => setDatedotnow(Date.now())}>End Current Class Session</Text></View> : coursename && (!classiscurrent || (Date.now() > sessionending)) ? <View style={styles.button}><Text style={styles.btext} onPress={() => navigation.navigate("ClassesTeacher", {
            idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit: drinkpasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass
          })}>Begin A New Class Session</Text></View> : null}

          {coursename ? <Text>{'\n'}{'\n'}</Text> : null}

          {coursename ? null : typeof id != "undefined" ? <View style={styles.button}><Text style={styles.btext} onPress={(e) => navigation.navigate("ClassesTeacher", {
            idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit: drinkpasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass
          })}>Select a Class</Text></View> : <View style={styles.button}><Text style={styles.btext} onPress={() => getData()}>Reset Needed</Text></View>}

          {coursename ? null : <Text>{'\n'}{'\n'}</Text>}


          {/* <Text>{'\n'}{'\n'}</Text> */}



          {coursename ? <View style={styles.button}><Text style={styles.btext} onPress={() => navigation.navigate("Classsessions", {
            idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit: drinkpasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass

          })}>Sessions from this Class</Text></View> : null}

          {coursename ? <Text>{'\n'}{'\n'}</Text> : null}

          {coursename ? <View style={styles.button}><Text style={styles.btext} onPress={() => navigation.navigate("Studentsenrolled", {
            idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit: drinkpasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass

          })}>All Students From This Class</Text></View> : null}

          {coursename ? <Text>{'\n'}{'\n'}</Text> : null}

          {coursename ? <View style={styles.button}><Text style={styles.btext} onPress={() => navigation.navigate("Classpasses", {
            idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit: drinkpasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
            email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass

          })}>Passes From This Class</Text></View> : null}

          {coursename ? <Text>{'\n'}{'\n'}</Text> : null}


          {(youcangetpassclass && coursename) || (typeof youcangetpassclass == "undefined" && coursename) ? <View style={styles.button}>
            <Text style={styles.btext} onPress={() => setYoucangetpassclass(false)}>Turn Outgoing Passes OFF</Text></View> : youcangetpassclass == false && coursename ? <View style={styles.button}><Text style={styles.btext} onPress={() => setYoucangetpassclass(true)}>Turn Outgoing Passes ON</Text></View> : null}

          {coursename ? <Text>{'\n'}{'\n'}</Text> : null}

          {currentsessionid && youcangetincomingpassclass && coursename ? <View style={styles.button}>

            <Text style={styles.btext} onPress={() => setYoucangetincomingpassclass(false)} >Turn Incoming Passes OFF</Text></View> : currentsessionid && !youcangetincomingpassclass && coursename ? <View style={styles.button}><Text style={styles.btext} onPress={() => setYoucangetincomingpassclass(true)}>Turn Incoming Passes ON</Text></View> : null}

          {currentsessionid && coursename ? <Text>{'\n'}{'\n'}</Text> : null}


          {currentsessionid && coursename && allowuntrackedpasses === true? <View style={styles.button}>

            <Text style={styles.btext} onPress={() => setAllowuntrackedpasses(false)} >Untracked Passes are Allowed</Text></View> : (currentsessionid && coursename && allowuntrackedpasses === false) || (currentsessionid && coursename && typeof allowuntrackedpasses === "undefined") ? <View style={styles.button}><Text style={styles.btext} onPress={() => setAllowuntrackedpasses(true)}>Untracked Passes are Not Allowed</Text></View>: null}

          {coursename && currentsessionid && coursename ? <Text>{'\n'}{'\n'}</Text> : null}

          <View><Text style={styles.paragraph2}> ___________________ </Text></View>
          <View><Text style={styles.paragraph2}>Set-Up{'\n'}</Text></View>

          {typeof id != "undefined" ? <View style={styles.button}>

            <Text style={styles.btext} onPress={() => navigation.navigate("RegisterClasses", {
              idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit: drinkpasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
              email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass
            })}>Create A Class</Text></View> : null}
          {typeof id != "undefined" ? <Text>{'\n'} {'\n'}</Text> : null}

          {coursename ? <View style={styles.button}>
            <Text style={styles.btext} onPress={() => navigation.navigate("Studentsawaitingconfirmation", {
              idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
              email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass

            })}>Admit Students into 'Active' Class</Text></View> : null}
          {coursename ? <Text>{'\n'} {'\n'}</Text> : null}

          {coursename ? <View style={styles.button}>
            <Text style={styles.btext} onPress={() => navigation.navigate("Studentsnotenrolled", {
              idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
              email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass

            })}>Students Not In This Class</Text></View> : null}
          {coursename ? <Text>{'\n'} {'\n'}</Text> : null}

          {coursename ? <View style={styles.button}>

            <Text style={styles.btext} onPress={() => navigation.navigate("QuickSignUp", {
              idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
              email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass
            })}>Sign Up Phoneless Student</Text></View> : null}

          {coursename ? <Text>{'\n'} {'\n'}</Text> : null}



          {coursename ? <View style={styles.button}>

            <Text style={styles.btext} onPress={() => navigation.navigate("Addconsequence", {
              idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
              email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass
            })}>Behaviors To Address</Text></View> : null}

          {coursename ? <Text>{'\n'} {'\n'}</Text> : null}


          {coursename && (classiscurrent && (Date.now() < sessionending)) ? <View style={styles.button}>

            <Text style={styles.btext} onPress={() => navigation.navigate("Settingsteacher", {
              idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, drinkpasslimit: drinkpasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
              email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass

            })}>Settings for the 'Active' Class</Text></View> : typeof id != "undefined" ? <View style={styles.button}>

              <Text style={styles.btext} onPress={() => navigation.navigate("Settingsteacher", {
                idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
                email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, phonepassduration: phonepassduration, drinkpassduration: drinkpassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass

              })}>Settings</Text></View> : null}
          {typeof id != "undefined" ? <Text>{'\n'} {'\n'}</Text> : null}

          <View style={styles.button}>

            <Text style={styles.btext} onPress={() => navigation.navigate("Definitions", {
              idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
              email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, exclusivetime: exclusivetime, drinkofwater: drinkofwater, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, drinkpassduration: drinkpassduration, phonepassduration: phonepassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass
            })}>Definitions/Explanations</Text></View>
          <Text>{'\n'} {'\n'}</Text>

          {typeof id != "undefined" ? <View style={styles.button}>

            <Text style={styles.btext} onPress={() => navigation.navigate("QRCodes", {
              idofcurrentclass: idofcurrentclass, currentsessionid: currentsessionid, sessionending: sessionending, endlastclass: endlastclass, userinformation: userinformation, school: school, state: state, town: town, role: role, id: id, bathroompasslimit: bathroompasslimit, ifnegativeplusminus: ifnegativeplusminus, nonbathroompasslimit: nonbathroompasslimit, drinkpasslimit: drinkpasslimit, exclusivephonepassmaxstudents: exclusivephonepassmaxstudents, exclusivephonepasstimelmit: exclusivephonepasstimelmit, lengthofclass: lengthofclass, classiscurrent: classiscurrent, nameofcurrentclass: nameofcurrentclass, starttimeofcurrentclass: starttimeofcurrentclass, classid: classid, coursename: coursename, section: section, location: location, teacherid: teacherid, teacheriscalled: teacheriscalled,
              email: email, starttime: starttime, lengthofclassesforacomputer: lengthofclassesforacomputer, inpenalty: inpenalty, stoptimepenalty: stoptimepenalty, starttimepenalty: starttimepenalty, totaltimepenalty: totaltimepenalty, alreadyused: alreadyused, teacher: teacher, Selectedclassdestination: Selectedclassdestination, currentlocation: currentlocation, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, grouptime: grouptime, exclusivetime: exclusivetime, drinkofwater: drinkofwater, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, lengthofclasses: lengthofclasses, endlastclasssubstitute: endlastclasssubstitute, sessionended: sessionended, thelastid: thelastid, drinkpassduration: drinkpassduration, phonepassduration: phonepassduration, bathroompassduration: bathroompassduration, overunder: overunder, otherpassduration: otherpassduration, maxstudentsphonepass: maxstudentsphonepass, donewithworkphonepass: donewithworkphonepass, consequenceid: consequenceid, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass
            })}>Get Your QR Codes</Text></View> : null}
          <Text>{'\n'} {'\n'}</Text>

          <View><Text style={styles.paragraph2}> ___________________ </Text></View>
          <TouchableOpacity onPress={() => signoutfunction()}>
            <Text style={styles.paragraph2}>
              Sign Out
            </Text>
          </TouchableOpacity>

          <View><Text style={styles.paragraph2}> ___________________ </Text></View>
          <TouchableOpacity onPress={() => deleteaccount()}>
            <Text style={styles.paragraph2}>
              Delete Account
            </Text>
          </TouchableOpacity>

          <Text>{'\n'} {'\n'}{'\n'} {'\n'}{'\n'} {'\n'}{'\n'} {'\n'}{'\n'}{'\n'}{'\n'} {'\n'}{'\n'} {'\n'}{'\n'} </Text>

        </View>
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
  paragraph: {
    margin: 24,
    fontSize: 40,
    textAlign: 'center',
    padding: 10,
    color: '#FFFFFF',
    backgroundColor: '#000000',
    fontWeight: "bold",

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
  paragraph9: {
    margin: 24,
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    color: '#FFF',
    backgroundColor: '#000000',

  },
  text: {
    color: '#FFFFFF',
    textAlign: "center"
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

  btext: {
    margin: 10,
    textAlign: "center",
    fontSize: 16,
    width: "100%",
    justifyContent: "center",
    color: "#fff",
  },

});
export default TeacherMainMenu; 