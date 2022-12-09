import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, Button, TouchableOpacity, Pressable } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import { Audio } from 'expo-av';
import { auth, firebase } from "../Firebase/Config";

import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, arrayUnion, FieldValue } from "@firebase/firestore";

import Pass from "./Pass";
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { sqrt } from 'react-native-reanimated';

// import { useNavigation } from '@react-navigation/native';

const Scanner = ({ route, navigation }) => {

  const { userinformation, teacherid, coursename, classid, teacher, Selectedclassdestination, youcangetpass, section, currentlocation, school, state, town, locationdestination, firstname, lastname, ledby, drinkofwater, exclusivetime, donewithworkpass, currentsessionid, bathroomtime, nonbathroomtime, bathroompassinuse, totalinlineforbathroom, id, passid, teacheridforreturn, maxstudentsonphonepass, newlocation, timeallowed, adjustmentandoverunder, total2, getcurrentdifference, day, leftclass2, expectedreturn2, endofclasssession, currentdateend } = route.params;

  //'day' confirms that persoan has already visited pass and is coming back to zap out

  const [leavetimeGlobal, setLeavetimeGlobal] = useState();
  const [returntimeGlobal, setReturntimeGlobal] = useState("");

  const [sound, setSound] = React.useState();
  const [eligible, setEligible] = React.useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');

  const [leftclass, setLeftclass] = useState();
  const [expectedreturn, setExpectedreturn] = useState();

  const [howmanypeople, setHowmanypeople] = useState();
  const [howmanypeople2, setHowmanypeople2] = useState();
  const [takenameoffwaitlist, setTakenameoffwaitlist] = useState();

  const [phonehowmanypeople, setPhonehowmanypeople] = useState();
  const [phonehowmanypeople2, setPhonehowmanypeople2] = useState();
  const [phonetakenameoffwaitlist, setPhonetakenameoffwaitlist] = useState();
  const [rightnow, setRightnow] = useState();

  const [ontime, setOntime] = useState();

  const [adjust, setAdjust] = useState();
  const [levell, setLevell] = useState();
  const [overunderr, setOverunderr] = useState();

  const [penaltyminutes, setPenaltyminutes] = useState();

  const [allottedtime, setAllottedtime] = useState();
  const [realtimeleave, setRealtimeleave] = useState();
  const [currentdate, setCurrentdate] = useState();
  const [completed, setCompleted] = useState();
  const [completed2, setCompleted2] = useState();
  const [currenttime, setCurrenttiime] = useState();
  const [giveshortcut, setGiveshortcut] = useState();

  console.log(takenameoffwaitlist, "takenameoffwaitlist", expectedreturn, allottedtime, "expectedreturn", "allottedtime", "In Scanner");

  useEffect(() => {

    if (id && classid && typeof day != "undefined") {
      setCurrenttiime(Date.now())
      getadjustment();
      checkDatabaseData2();
      setExpectedreturn(expectedreturn2);
    }
  }, [day, expectedreturn2]);

  useEffect(() => {
    console.log("14Did it get this far? ");
    setText("Not yet scanned");
    setScanned(false);
  }, [day]);

  const getadjustment = () => {

    console.log("5Did it get this far? ");

    if (id && classid) {
      console.log("6Did it get this far? ");
      const docRef = doc(firebase, "users", id);

      const docData = getDoc(docRef)

        .then((docSnap) => {
          let idd = classid;
          let object = docSnap.data();

          const whatever = object[idd].adjustments;
          const penaltyminutes = object[idd].penaltyminutes;
          const ovunder = object[idd].overunder;
          const level = object[idd].level;

        

          setAdjust(whatever);
          setPenaltyminutes(penaltyminutes);
          setOverunderr(ovunder);
          setLevell(level);

        })
    }
  };

  async function checkDatabaseData2() {
    console.log("12Did it get this far? ");

    const docRef = doc(firebase, "classesbeingtaught", classid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setHowmanypeople2(docSnap.data().inusebathroompass)
      setPhonehowmanypeople2(docSnap.data().inuseexclusivephonepass)

    } else {
      // doc.data() will be undefined in this case

    }

  };



  useEffect(() => {
    console.log(expectedreturn, "expectedreturn", currenttime, "currenttime", "10Did it get this far? ");
    if (expectedreturn > 10) {
      console.log("10Did it get this far? ");
      if (currenttime < expectedreturn) {

        console.log("22this was run");
        setOntime(true);
      } else {
        console.log("23this was run");
        setOntime(false);
      }
    }

  }, [currenttime]);




  useEffect(() => {
    console.log(currentdate, "currentdate");
    if (typeof currentdate != "undefined" && locationdestination == "Break From Work Pass") {

      if (text == teacheridforreturn && scanned) {
        returnmakephonepass();
      } else {
        setText('Not yet scanned')
        setScanned(false);
        Alert("You have scanned the wrong @RCode");
      }

    } else if (typeof currentdate != "undefined" && locationdestination != "Break From Work Pass") {
      if (text == teacheridforreturn && scanned) {
        returnfinalizehallpass();
      } else {
        setText('Not yet scanned')
        setScanned(false);
        Alert("You have scanned the wrong @RCode");
      }

    } else {

      if (leavetimeGlobal) {
        console.log("1was this run?", text, scanned, ontime, "expectedreturn2, ontime, text, scanned,")
        // const newtime = leavetimeGlobal.toLocaleTimeString();

        const formatAMPM = () => {
          let hours = leavetimeGlobal.getHours();
          let minutes = leavetimeGlobal.getMinutes();
          let ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12;
          minutes = minutes.toString().padStart(2, '0');
          let strTime = hours + ':' + minutes + ' ' + ampm;
          return strTime;
        }

        const p = formatAMPM(leavetimeGlobal);

        setRealtimeleave(p);
        setCurrentdate((leavetimeGlobal.getMonth() + 1) + "/" + leavetimeGlobal.getDate() + "/" + leavetimeGlobal.getFullYear());
      }
    }
  }, [leavetimeGlobal]);


  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() =>
          navigation.navigate("Passisready", {
            userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, currentsessionid: currentsessionid, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, id: id, passid: passid, teacheridforreturn: teacheridforreturn, maxstudentsonphonepass: maxstudentsonphonepass, newlocation: newlocation, timeallowed: timeallowed, adjustmentandoverunder: adjustmentandoverunder, total2: total2, getcurrentdifference: getcurrentdifference, endofclasssession: endofclasssession,
          })}
        >

          <Text accessibilityLabel="Guest" style={styles.error5}>
            Instructions
          </Text>
        </Pressable>
      ),
    });
  }, []);


  useEffect(() => {
    console.log("2was this run?", text, scanned, ontime, "expectedreturn2, ontime, text, scanned,")

    if (locationdestination == "Bathroom") {
      setAllottedtime(bathroomtime);
    } else if (locationdestination == "Get Drink of Water") {
      setAllottedtime(drinkofwater);
    } else {
      setAllottedtime(nonbathroomtime);
    }
  }, []);

  useEffect(() => {

    navigation.setOptions({
      headerLeft: () => (
        <Pressable>
          <Text accessibilityLabel="Guest" style={styles.error}>
          </Text>
        </Pressable>
      ),
    });
  }, []);


  useEffect(() => {
    if (typeof classid != "undefined") {
      checkDatabaseData();
    }
  }, []);

  useEffect(() => {

    console.log(completed, "completed", day, "day");

    if (typeof completed != "undefined" && typeof day == "undefined") {

      navigation.navigate("Pass", {
        teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, teacherid: teacherid, coursename: coursename, Selectedclassdestination: Selectedclassdestination, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse,
        currentsessionid: currentsessionid, id: id, passid: passid, teacheridforreturn: teacheridforreturn, leftclass: leftclass, expectedreturn: expectedreturn, maxstudentsonphonepass: maxstudentsonphonepass, newlocation: newlocation, timeallowed: timeallowed, adjustmentandoverunder: adjustmentandoverunder, total2: total2, getcurrentdifference: getcurrentdifference, rightnow: rightnow, currentdate: currentdate, realtimeleave: realtimeleave, endofclasssession: endofclasssession,
      });

    } else if (typeof completed2 != "undefined" && typeof day != "undefined") {
      navigation.navigate("Mainmenustudent", {
        teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, teacherid: teacherid, coursename: coursename, Selectedclassdestination: Selectedclassdestination, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, bathroompassinuse: bathroompassinuse,
        currentsessionid: currentsessionid, id: id, passid: passid, teacheridforreturn: teacheridforreturn, leftclass: leftclass, expectedreturn: expectedreturn, maxstudentsonphonepass: maxstudentsonphonepass, newlocation: newlocation, timeallowed: timeallowed, adjustmentandoverunder: adjustmentandoverunder, total2: total2, getcurrentdifference: getcurrentdifference, rightnow: rightnow, currentdate: currentdate, realtimeleave: realtimeleave, day: day
      });
    } else {
      console.log("nowhere to go")
    }
  }, [completed, completed2]);



  async function checkDatabaseData() {
    console.log("5was this run?")

    const docRef = doc(firebase, "classesbeingtaught", classid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setHowmanypeople(docSnap.data().inusebathroompass);
      setPhonehowmanypeople(docSnap.data().inuseexclusivephonepass);

      setTakenameoffwaitlist(docSnap.data().totalinlineforbathroom);
      setPhonetakenameoffwaitlist(docSnap.data().totalinlineforexclusivephone);
      setGiveshortcut(docSnap.data().removescanneraddbutton);
    

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

  }

  // const navigation = useNavigation();

  //shortcut() to be used in development

  const developmentshortcut = () => {
    console.log(expectedreturn, "expectedreturn,", "7was this run?", text, scanned, ontime, "expectedreturn2, ontime, text, scanned,")

    var r = new Date();
    var s = Date.now();

    setRightnow(s);
    setLeavetimeGlobal(r);
    setLeftclass(s);

    setScanned(true);

    if (typeof day != "undefined") {
      setText(teacherid);
    } else {
      setText(teacheridforreturn);
    }
  }

  useEffect(() => {
    return sound
      ? () => {

        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);


  // async function playSound() {
  //   const { sound } = await Audio.Sound.createAsync(
  //     require('../../assets/Confirm.mp3')
  //   );
  //   setSound(sound);

  //   await sound.playAsync();
  // }

  async function finalizehallpass() {
    setGiveshortcut(false);

    console.log("hallpass ran ?");

    const expected = (rightnow + (allottedtime * 60000))

    if (classid && passid &&
      locationdestination == "Bathroom") {

      await updateDoc(doc(firebase, "passes", passid), {

        leftclass: rightnow,
        timeleftclass: leavetimeGlobal.toLocaleTimeString([], { hour12: true }),
        whenlimitwillbereached: expected,
        placeinline: null,
        passdetailrightnow: rightnow, passdetailcurrentdate: currentdate, passdetailrealtimeleave: realtimeleave

      }).catch((error) => {
        console.log(error); alert(error);
      });

      await updateDoc(doc(firebase, "users", id), {
        status: "On Pass",
      }).catch((error) => {
        console.log(error); alert(error);
      });

      await updateDoc(doc(firebase, "classesbeingtaught", classid), {
        inusebathroompass: howmanypeople + 1,
        totalinlineforbathroom: takenameoffwaitlist - 1,
        removescanneraddbutton: false


      }).catch((error) => {
        console.log(error); alert(error);
      })
        .then(async () => {

          setExpectedreturn((rightnow + (allottedtime * 60000)));
          setHasPermission(null);
          setText("Not yet scanned");
          setScanned(false);
          setCompleted(true);
        })
    }
    else if (classid && passid &&
      locationdestination != "Bathroom") {

      await updateDoc(doc(firebase, "passes", passid), {
        leftclass: rightnow,
        timeleftclass: leavetimeGlobal.toLocaleTimeString([], { hour12: true }),
        whenlimitwillbereached: expected,
        placeinline: null,
        passdetailrightnow: rightnow, passdetailcurrentdate: currentdate, passdetailrealtimeleave: realtimeleave

      }).catch((error) => {
        console.log(error); alert(error);
      });

      await updateDoc(doc(firebase, "users", id), {
        status: "On Pass",
      }).catch((error) => {
        console.log(error); alert(error);
      })

        .then(async () => {

          setExpectedreturn(expected);
          setHasPermission(null);
          setText("Not yet scanned");
          setScanned(false);
          setCompleted(true);
        })
    } else {

      setExpectedreturn(expected);
      setHasPermission(null);
      setText("Not yet scanned");
      setScanned(false);
      setCompleted(true);

    }
  }


  async function makephonepass() {

    setGiveshortcut(false);

    console.log("phone pass ran")

    const expected = (rightnow + (exclusivetime * 60000));

    if (classid && passid) {

      await updateDoc(doc(firebase, "passes", passid), {

        leftclass: rightnow,
        timeleftclass: leavetimeGlobal.toLocaleTimeString([], { hour12: true }),
        whenlimitwillbereached: expected,
        placeinline: null,
        passdetailrightnow: rightnow, passdetailcurrentdate: currentdate, passdetailrealtimeleave: realtimeleave

      }).catch((error) => {
        console.log(error); alert(error);
      }),

        await updateDoc(doc(firebase, "users", id), {

          exclusivephonepassused: currentsessionid,
          exclusivephonepassexpiration: expected,
          status: "On Pass",

        }).catch((error) => {
          console.log(error); alert(error);
        }),

        await updateDoc(doc(firebase, "classesbeingtaught", classid), {
          inuseexclusivephonepass: phonehowmanypeople + 1,
          totalinlineforexclusivephone: phonetakenameoffwaitlist - 1,
          removescanneraddbutton: false
        }).catch((error) => {
          console.log(error); alert(error);
        })
          .then(async () => {

            setExpectedreturn(expected);
            setHasPermission(null);
            setText("Not yet scanned");
            setScanned(false);
            setCompleted(true);
          })
    }
    else {
      null
    }
  }

  async function returnfinalizehallpass() {

    setGiveshortcut(false);

    console.log(howmanypeople2, "howmanypeople2", endofclasssession, "endofclasssession", locationdestination, "locationdestination", expectedreturn, "expectedreturn", ontime, "ontime", passid, "passid", id, "id", classid, "classid");

    if (Date.now() > endofclasssession) {

      var t = endofclasssession;
      var r = new Date(t);

      console.log("1 was this run?,", t, r, "endofclasssession", "newDate")

      if (locationdestination == "Bathroom" && howmanypeople2 > 0) {
        console.log("first if then");

        const currentdiff = ((expectedreturn - t) / 60000);

        const percentsss = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderr + currentdiff, adjustments: adjust, level: levell };

        setHasPermission(null);
        setText("Not yet scanned");
        setScanned(false);


        await updateDoc(doc(firebase, "passes", passid), {
          returned: t,
          timereturned: r.toLocaleTimeString([], { hour12: true }),
          returnedbeforetimelimit: currentdiff === 0 || currentdiff > 0,
          differenceoverorunderinminutes: currentdiff,

        }).catch((error) => {
          console.log(error); alert(error);
        }),


          await updateDoc(doc(firebase, "users", id), {
            [classid]: percentsss,
            passid: "",
            status: "",

          }).catch((error) => {
            console.log(error); alert(error);
          }),

          await updateDoc(doc(firebase, "classesbeingtaught", classid), {
            inusebathroompass: 0,
            removescanneraddbutton: false
          }).catch((error) => {
            console.log(error); alert(error);

          }).then(async () => {

            setHasPermission(null);
            setText("Not yet scanned");
            setScanned(false);
            setCompleted2(true);
          })


      } else if (locationdestination == "Bathroom" && howmanypeople2 > 0) {
console.log("second if then");

        const currentdiff = ((expectedreturn - t) / 60000);

        const percentsss = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderr + currentdiff, adjustments: adjust, level: levell };

        setHasPermission(null);
        setText("Not yet scanned");
        setScanned(false);


        await updateDoc(doc(firebase, "passes", passid), {
          returned: t,
          timereturned: r.toLocaleTimeString([], { hour12: true }),
          returnedbeforetimelimit: currentdiff === 0 || currentdiff > 0,
          differenceoverorunderinminutes: currentdiff,

        }).catch((error) => {
          console.log(error); alert(error);
        }),


          await updateDoc(doc(firebase, "users", id), {
            [classid]: percentsss,
            passid: "",
            status: "",

          }).catch((error) => {
            console.log(error); alert(error);
          }),

          await updateDoc(doc(firebase, "classesbeingtaught", classid), {
            inusebathroompass: howmanypeople2 - 1,
            removescanneraddbutton: false
          }).catch((error) => {
            console.log(error); alert(error);

          }).then(async () => {

            setHasPermission(null);
            setText("Not yet scanned");
            setScanned(false);
            setCompleted2(true);
          })


      } else {

        const currentdiff = ((expectedreturn - t) / 60000);

        const percentsss = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderr + currentdiff, adjustments: adjust, level: levell };

        await updateDoc(doc(firebase, "passes", passid), {
          returned: t,
          timereturned: r.toLocaleTimeString([], { hour12: true }),
          returnedbeforetimelimit: currentdiff === 0 || currentdiff > 0,
          differenceoverorunderinminutes: currentdiff,

        }).catch((error) => {
          console.log(error); alert(error);
        }),


          await updateDoc(doc(firebase, "users", id), {
            [classid]: percentsss,
            passid: "",
            status: "",

          }).catch((error) => {
            console.log(error); alert(error);
          }).then(async () => {


            setHasPermission(null);
            setText("Not yet scanned");
            setScanned(false);
            setCompleted2(true);
          })

      }
    }
    else {

      var r = new Date();
      var t = Date.now();

      console.log("2 was this run?,", t, r, "endofclasssession", "newDate")

      if (locationdestination == "Bathroom" && howmanypeople2 > 0) {
        const currentdiff = ((expectedreturn - t) / 60000);

        const percentsss = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderr + currentdiff, adjustments: adjust, level: levell };

        setHasPermission(null);
        setText("Not yet scanned");
        setScanned(false);


        await updateDoc(doc(firebase, "passes", passid), {
          returned: t,
          timereturned: r.toLocaleTimeString([], { hour12: true }),
          returnedbeforetimelimit: currentdiff === 0 || currentdiff > 0,
          differenceoverorunderinminutes: currentdiff,

        }).catch((error) => {
          console.log(error); alert(error);
        }),


          await updateDoc(doc(firebase, "users", id), {
            [classid]: percentsss,
            passid: "",
            status: "",

          }).catch((error) => {
            console.log(error); alert(error);
          }),

          await updateDoc(doc(firebase, "classesbeingtaught", classid), {
            inusebathroompass: howmanypeople2 - 1,
            removescanneraddbutton: false,
          }).catch((error) => {
            console.log(error); alert(error);

          }).then(async () => {

            setHasPermission(null);
            setText("Not yet scanned");
            setScanned(false);
            setCompleted2(true);

          })

      } else if (locationdestination == "Bathroom" && howmanypeople2 < 1) {
        const currentdiff = ((expectedreturn - t) / 60000);

        const percentsss = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderr + currentdiff, adjustments: adjust, level: levell };

        setHasPermission(null);
        setText("Not yet scanned");
        setScanned(false);


        await updateDoc(doc(firebase, "passes", passid), {
          returned: t,
          timereturned: r.toLocaleTimeString([], { hour12: true }),
          returnedbeforetimelimit: currentdiff === 0 || currentdiff > 0,
          differenceoverorunderinminutes: currentdiff,

        }).catch((error) => {
          console.log(error); alert(error);
        }),


          await updateDoc(doc(firebase, "users", id), {
            [classid]: percentsss,
            passid: "",
            status: "",

          }).catch((error) => {
            console.log(error); alert(error);
          }),

          await updateDoc(doc(firebase, "classesbeingtaught", classid), {
            inusebathroompass: 0,
            removescanneraddbutton: false
          }).catch((error) => {
            console.log(error); alert(error);

          }).then(async () => {

            setHasPermission(null);
            setText("Not yet scanned");
            setScanned(false);
            setCompleted2(true);

          })

      } 
      else {
        console.log("37was this run?,", text, scanned, ontime, expectedreturn, "text, scanned,  ontime, expectedreturn,")

        const currentdiff = ((expectedreturn - t) / 60000);

        const percentsss = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderr + currentdiff, adjustments: adjust, level: levell };

        await updateDoc(doc(firebase, "passes", passid), {
          returned: t,
          timereturned: r.toLocaleTimeString([], { hour12: true }),
          returnedbeforetimelimit: currentdiff === 0 || currentdiff > 0,
          differenceoverorunderinminutes: currentdiff,

        }).catch((error) => {
          console.log(error); alert(error);
        }),


          await updateDoc(doc(firebase, "users", id), {
            [classid]: percentsss,
            passid: "",
            status: "",

          }).catch((error) => {
            console.log(error); alert(error);
          }).then(async () => {


            setHasPermission(null);
            setText("Not yet scanned");
            setScanned(false);
            setCompleted2(true);
          })


      }
    }
  }


  async function returnmakephonepass() {

    setGiveshortcut(false);

    console.log("return phone pass ran");

    if (Date.now() > endofclasssession) {

      var t = endofclasssession;
      var r = new Date(t);

      const currentdiff = ((expectedreturn - t) / 60000);

      const percentsss = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderr + currentdiff, adjustments: adjust, level: levell };

      await updateDoc(doc(firebase, "passes", passid), {
        returned: t,
        timereturned: r.toLocaleTimeString([], { hour12: true }),
        returnedbeforetimelimit: currentdiff === 0 || currentdiff > 0,
        differenceoverorunderinminutes: (expectedreturn - t) / 60000,

      }).catch((error) => {
        console.log(error); alert(error);
      }),

        await updateDoc(doc(firebase, "users", id), {
          [classid]: percentsss,
          passid: "",
          status: "",
        }).catch((error) => {
          console.log(error); alert(error);
        });


      await updateDoc(doc(firebase, "classesbeingtaught", classid), {
        inuseexclusivephonepass: phonehowmanypeople2 - 1,
        removescanneraddbutton: false
      }).catch((error) => {
        console.log(error); alert(error);

      }).then(async () => {

        setHasPermission(null);
        setText("Not yet scanned");
        setScanned(false);
        setCompleted2(true);
      })

    } else {

      var r = new Date();
      var t = Date.now();

      const currentdiff = ((expectedreturn - t) / 60000);

      const percentsss = { id: classid, penaltyminutes: penaltyminutes, overunder: overunderr + currentdiff, adjustments: adjust, level: levell };

      await updateDoc(doc(firebase, "passes", passid), {
        returned: t,
        timereturned: r.toLocaleTimeString([], { hour12: true }),
        returnedbeforetimelimit: currentdiff === 0 || currentdiff > 0,
        differenceoverorunderinminutes: (expectedreturn - t) / 60000,

      }).catch((error) => {
        console.log(error); alert(error);
      }),

        await updateDoc(doc(firebase, "users", id), {
          [classid]: percentsss,
          passid: "",
          status: "",
        }).catch((error) => {
          console.log(error); alert(error);
        });


      await updateDoc(doc(firebase, "classesbeingtaught", classid), {
        inuseexclusivephonepass: phonehowmanypeople2 - 1,
        removescanneraddbutton: false
      }).catch((error) => {
        console.log(error); alert(error);

      }).then(async () => {

        setHasPermission(null);
        setText("Not yet scanned");
        setScanned(false);
        setCompleted2(true);
      })
    }
  }


  useEffect(() => {
    console.log(day, "is currentdateeend undefined?");
    if (typeof day === "undefined" && typeof currentdate != "undefined") {
      console.log("12was this run?")
      if (text == teacherid && scanned) {
        console.log("Play SOund Happened");
   
        if (locationdestination == "Break From Work Pass ") {
          makephonepass();
        } else {
          finalizehallpass();
        }

      }
      if (teacherid != text && scanned) {

        setText('Not yet scanned');
        setScanned(false);
        alert("You have scanned the wrong @RCode")
      }
    }
  }, [currentdate]);

  // Request Camera Permission


  useEffect(() => {
    console.log(hasPermission, "THiis is whaat hasPermission shows")
  }, []);

  useEffect(() => {
    askPermissions();
    console.log(hasPermission, "THiis is whaat hasPermission shows")
  }, [hasPermission]);




  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const askPermissions = () => {
    (async () => {
      console.log("Asking for permissions", hasPermission);
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {

    console.log("1AM I HERE");

    var r = new Date();
    var s = Date.now();

    setRightnow(s);
    setLeavetimeGlobal(r);
    setLeftclass(s);

    setScanned(true);
    setText(data);
  };

  return (
    <View style={styles.container}>
    <ScrollView>
    {giveshortcut === true ? <View style={styles.container}>

<View style={styles.barcodebox2}><View><Pressable
        onPress={() => developmentshortcut()}><Text style={styles.maintext11}>Try This{'\n'}Shortcut!</Text></Pressable></View>
      </View>
      
      <Pressable onPress={() => askPermissions()}><Text style={styles.maintext}>Get Camera</Text></Pressable>
      <Pressable onPress={() => checkDatabaseData()}><Text style={styles.maintext}>Press on{'\n'}Shortcut Above</Text></Pressable>

<Pressable>
      <Text style={styles.maintext}>passid:{passid}{'\n'}canusebutton: {giveshortcut ? "true" : "false"}{'\n'}hasPermission: {hasPermission ? "true" : "false"}{'\n'}It Read: {text}{'\n'}It expects: {teacheridforreturn}{'\n'}{scanned ? "it scanned" : "it DID NOT scan"}</Text></Pressable>
   
    </View> : <View style={styles.container}>

<View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 300, width: 350 }} />
        {scanned && <Pressable onPress={() => setScanned(false)}><Text></Text></Pressable>}

      </View>
      
      <Pressable onPress={() => askPermissions()}><Text style={styles.maintext}>Get Camera</Text></Pressable>
      <Pressable onPress={() => checkDatabaseData()}><Text style={styles.maintext}>After Asking Teacher For Help{'\n'}Press Here for Shortcut.</Text></Pressable>

<Pressable>
      <Text style={styles.maintext}>passid:{passid}{'\n'}canusebutton: {giveshortcut ? "true" : "false"}{'\n'}hasPermission: {hasPermission ? "true" : "false"}{'\n'}It Read: {text}{'\n'}It expects: {teacheridforreturn}{'\n'}{scanned ? "it scanned" : "it DID NOT scan"}</Text></Pressable>
   
    </View>}


    </ScrollView>
    </View>
   
  );
}

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    color: "#fff",
    textAlign: "center"
  },
  maintext1: {
    fontSize: 16,
    margin: 20,
    color: "#ff0000"
  },
  maintext11: {
    fontSize: 46,
    margin: 20,
    color: "#ff0000",
    textAlign: "center"
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#E43522',
    marginTop:50,
  },

  barcodebox2: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#FFF',
    marginTop:50,
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