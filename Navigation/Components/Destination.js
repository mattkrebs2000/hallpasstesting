
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Dimensions, SafeAreaView, StyleSheet, Button, View, TouchableOpacity, Text, ScrollView, ActivityIndicator } from 'react-native';
import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion } from "@firebase/firestore";
import Destinations from './MapOfDestinations/MapOfDestinations';


//get rid of grouptime


const height = Dimensions.get("window").height;

const Destination = ({ route, navigation }) => {

  const { userinformation, teacherid, classid, coursename, section, location, school, teacher, youcangetpass, currentlocation, state, town, newlocation, firstname, lastname, ledby, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, currentsessionid, bathroompassinuse, totalinlineforbathroom, id, exclusivephonepassinuse, totalinlineforexclusivephone, maxstudentsonphonepass, endofclasssession, overunderstatus, lengthofclasssession, adjustmentandoverunder, total2, getcurrentdifference, maxstudentsbathroom, linkedclass, coursesstudentisin } = route.params;

  console.log(passid, "this is the passid", endofclasssession, "endofclasssession", " in Destination.js");

  const [data, setData] = useState("");
  const [disable, setDisable] = useState();
  const [disabledonewithworkphonepass, setDisabledonewithworkphonepass] = useState();

  const [bathroomepassinuselocal, setBathroomepassinuselocal] = useState();
  const [exclusivephonepassinuselocal, setExclusivephonepassinuselocal] = useState();


  const [totalinlineforbathroomlocal, setTotalinlineforbathroomlocal] = useState();
  const [totalinlineforexclusivephonelocal, setTotalinlineforexclusivephonelocal] = useState();
  const [seconddata, setSeconddata] = useState("");
  const [Selectedclassdestination, setSelectedclassdestination] = useState("");
  const [Coursenamedestination, setCoursenamedestination] = useState("");
  const [Idselecteddestination, setIdselecteddestination] = useState("");
  const [Sectiondestination, setSectiondestination] = useState("");
  const [Teacherdestination, setTeacherdestination] = useState("");
  const [Youcangetpassdestination, setYoucangetpassdestination] = useState(false);
  const [Teacheriddestination, setTeacheriddestination] = useState("");
  const [newlocation2, setNewlocation2] = useState();
  const [nurseadded, setNurseadded] = useState({ location: "Nurse", id: "Nurse" });
  const [locationdestination, setLocationdestination] = useState("");
  const [passid, setPassid] = useState("");
  const [teacheridforreturn, setTeacheridforreturn] = useState("");
  const [update, setUpdate] = useState(true);
  const [classisover, setClassisover] = useState(true);
  const [showspinner, setShowspinner] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [gettingdrink, setGettingdrink] = useState();


  const [getstatus2, setGetstatus] = useState();
  const [getexistingpassid2, setGetexistingpassid] = useState();

  const [passclassid2, setPassclassid] = useState();
  const [passclasssessionid2, setPassclasssessionid] = useState();
  const [passlocation2, setPasslocaation] = useState();
  const [passcoursename2, setPasscoursename] = useState();
  const [passdestination2, setPassdestinaation] = useState();
  const [passteacheridreturn2, setPassteacheridreturn] = useState();
  const [timeallowed2, setTimeallowed] = useState();
  const [teacheridfrompass2, setTeacheridfrompass] = useState();
  const [expectedreturnfrompass2, setExpectedreturnfrompass] = useState();
  const [passrightnow2, setPassrightnow] = useState();
  const [passcurrentdate2, setPasscurrentdate] = useState();
  const [passrealtimeleave2, setPassrealtimeleave] = useState();

  const [classsessionending2, setClasssessionending] = useState();


  console.log( classid, id, "this should say classid,", totalinlineforbathroomlocal, "totalinlineforbathroomlocal",bathroomepassinuselocal, "bathroomepassinuselocal", "id, and role");


  useEffect(() => {
 console.log(Idselecteddestination, "idselecteddestinatiion");
  }, [Idselecteddestination]);

  useEffect(() => {
    console.log(getexistingpassid2, "getexistingpassid2");
     }, []);     

  //onSnapshots
  if (classid) {

    const unsub = onSnapshot(doc(firebase, "classesbeingtaught", classid), (doc) => {

      setBathroomepassinuselocal(doc.data().inusebathroompass);
      setTotalinlineforbathroomlocal(doc.data().totalinlineforbathroom);

      setExclusivephonepassinuselocal(doc.data().inuseexclusivephonepass);
      setTotalinlineforexclusivephonelocal(doc.data().totalinlineforexclusivephone);


    }
    )
  }

  useEffect(() =>
    onSnapshot(doc(firebase, "users", id), (doc) => {

      if (doc.data().exclusivephonepassused === currentsessionid) {
        setDisable(true);
      } else {
        setDisable(false);
      }
      console.log(doc.data().exclusivephonepassused, currentsessionid, "currentsessionid and whats in the daatabase");

      // seeifpassexists();
    }
    ), []);


  //when it mounts

  useEffect(() => {

    setBathroomepassinuselocal(bathroompassinuse);
    setTotalinlineforbathroomlocal(totalinlineforbathroom);
    setExclusivephonepassinuselocal(exclusivephonepassinuse);
    setTotalinlineforexclusivephonelocal(totalinlineforexclusivephone);

    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity >
          <Text accessibilityLabel="Guest" style={styles.error}>
          </Text>
        </TouchableOpacity>
      ),
    });

    if (teacherid.length > 0 || typeof teacherid != "undefined") {
      getTeachers()
    }

    if (typeof newlocation != "undefined") {
      setNewlocation2(newlocation);
    } 

    const currenttime = Date.now();

    if (endofclasssession > currenttime) {
      setClassisover(false);
    } else {
      setClassisover(true);
    }

    if ((endofclasssession - (lengthofclasssession / 2)) > currenttime) {
      setDisabledonewithworkphonepass(true);
    } else {
      setDisabledonewithworkphonepass(false);
    }

  }, []);

  useEffect(() => {

    console.log(bathroomepassinuselocal, maxstudentsbathroom, totalinlineforbathroomlocal, maxstudentsbathroom, "bathroomepassinuselocal, maxstudentsbathroom , totalinlineforbathroomlocal,  maxstudentsbathroom,", "Destination");

  }, [bathroomepassinuselocal, maxstudentsbathroom, totalinlineforbathroomlocal, maxstudentsbathroom]);

  useEffect(() => {

    console.log("3")

    const currenttime = Date.now();

    if ((endofclasssession - (lengthofclasssession / 2)) > currenttime) {
      setDisabledonewithworkphonepass(true);
    } else {
      setDisabledonewithworkphonepass(false);
    }

  }, [update, newlocation]);

  useEffect(() => {

    console.log("5")
    const currenttime = Date.now();

    if (endofclasssession > currenttime) {
      setClassisover(false);
    } else {
      setClassisover(true);
    }

  }, [update]);

  useEffect(() => {

    let classe = Selectedclassdestination.classname;
    let idselect = Selectedclassdestination.id;
    let section = Selectedclassdestination.period;
    let teachername = Selectedclassdestination.teacheriscalled;
    let passesarethere = Selectedclassdestination.passesareavailable;
    let teacheridd = Selectedclassdestination.teacherid;
    let location = Selectedclassdestination.location;
    setCoursenamedestination(classe);
    setIdselecteddestination(idselect);
    setTeacherdestination(teachername);
    setYoucangetpassdestination(passesarethere);
    setTeacheriddestination(teacheridd);
    setSectiondestination(section);
    setLocationdestination(location);

  }, [Selectedclassdestination]);


  useEffect(() => {
    console.log("7")

    if (locationdestination === "Bathroom" || locationdestination === "Get Drink of Water") {
      setTeacheridforreturn(teacherid);
    } else {
      setTeacheridforreturn(Teacheriddestination);
    }
  }, [locationdestination, Teacheriddestination]);

  useEffect(() => {
    if (completed === true || typeof newlocation != "undefined") {

      if (newlocation) {
        if (ledby === "Admin") {
          getAvailableLocations2withadmin();
        } else {
          if (exclusivetime > 0 && donewithworkpass == true) {
            getAvailableLocations2grouptime0();
          } else {
            getAvailableLocations2grouptime0dww();
          }

        }
      }
      else {
        if (ledby === "Admin") {
          getAvailableLocationswithadmin();
        } else {
          if (exclusivetime > 0 && donewithworkpass == true) {
            getAvailableLocationsingrouptime0();
          } else if (exclusivetime > 0 && donewithworkpass == false) {
            getAvailableLocationsingrouptime0dww();
          } else if (exclusivetime == 0 && donewithworkpass == false) {
            getAvailableLocationsboth0dww();
          } else {
            getAvailableLocationsboth0();
          }
        }
      }
    }
  }, [completed, newlocation]);

  useEffect(() => {

    console.log("19", passid, locationdestination, getstatus2)

    if (passid.length > 1) {


      console.log(passid, "THIS IS THE PASS IDDDD")

      setShowspinner(false);

      if (locationdestination === "Bathroom") {

        if (bathroomepassinuselocal > (maxstudentsbathroom - 1) || totalinlineforbathroomlocal > maxstudentsbathroom) {

          navigation.navigate("Lineforbathroompass", { userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater: drinkofwater, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroomlocal, passid: passid, id: id, teacheridforreturn: teacheridforreturn, maxstudentsonphonepass: maxstudentsonphonepass, newlocation: newlocation, endofclasssession: endofclasssession, adjustmentandoverunder: adjustmentandoverunder, total2: total2, getcurrentdifference: getcurrentdifference, maxstudentsbathroom: maxstudentsbathroom })
        } else {
          navigation.navigate("Passisready", { userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroomlocal, passid: passid, id: id, teacheridforreturn: teacheridforreturn, maxstudentsonphonepass: maxstudentsonphonepass, newlocation: newlocation, endofclasssession: endofclasssession, adjustmentandoverunder: adjustmentandoverunder, total2: total2, getcurrentdifference: getcurrentdifference, maxstudentsbathroom: maxstudentsbathroom })
        }
      } else if (locationdestination === newlocation || locationdestination === "Get Drink of Water") {
        navigation.navigate("Passisready", { userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroomlocal, passid: passid, id: id, teacheridforreturn: teacheridforreturn, maxstudentsonphonepass: maxstudentsonphonepass, newlocation: newlocation, endofclasssession: endofclasssession, adjustmentandoverunder: adjustmentandoverunder, total2: total2, getcurrentdifference: getcurrentdifference, })
      } else {
        navigation.navigate("Passisready", { userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroomlocal, passid: passid, id: id, teacheridforreturn: teacheridforreturn, maxstudentsonphonepass: maxstudentsonphonepass, newlocation: newlocation, endofclasssession: endofclasssession, adjustmentandoverunder: adjustmentandoverunder, total2: total2, getcurrentdifference: getcurrentdifference, })
      }
    }
  }, [passid]);



  // retrieve pass begin


  useEffect(() => {
    seeifpassexists();
  }, []);

  useEffect(() => {
    if (typeof id != "undefined") {
      seeifpassexists();
    }
  }, [id, Selectedclassdestination]);

  const seeifpassexists = () => {

    if (typeof id != "undefined") {

      console.log(id, "301 here is something else", classid);

      const docRef = doc(firebase, "users", id);

      const docData = getDoc(docRef)

        .then((docSnap) => {

          let object = docSnap.data();
          const statusupdate = object.status;
          const idofpass = object.passid;

          setGetstatus(statusupdate);
          setGetexistingpassid(idofpass);

        })
    } else {
      navigation.navigate("Mainmenustudent", {
        userinformation: userinformation,
        classid: idselected,
        coursename: coursename,
        section: section,
        currentlocation: currentlocation,
        teacherid: teacherid,
        school: school,
        teacher: teacher,
        town: town, state: state, youcangetpass: youcangetpass, firstname: firstname, lastname: lastname, ledby: ledby, donewithworkpass: donewithworkpass, drinkofwater: drinkofwater, exclusivetime: exclusivetime, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime,
        currentsessionid: currentsessionid, bathroompassinuse: bathroompassinuse,
        maxstudentsonphonepass: maxstudentsonphonepass, totalinlineforbathroom: totalinlineforbathroom, id: id, bathroomtime: bathroomtime, endofclasssession: endofclasssession, overunderstatus: overunderstatus, lengthofclasssession: lengthofclasssession, getadjustmentss: getadjustmentss, adjustmentandoverunder: adjustmentandoverunder, nowinpenalty: nowinpenalty, maxstudentsbathroom: maxstudentsbathroom, overunderstatus: overunderstatus
      })
    }
  }

  useEffect(() => {
    getpassdetails();
  }, [getexistingpassid2]);


  const getpassdetails = () => {

    console.log("existing pass id", getexistingpassid2, "existing pass id");

    if (typeof getexistingpassid2 != "undefined" && getexistingpassid2 != "") {

      const docRef = doc(firebase, "passes", getexistingpassid2);

      const docData = getDoc(docRef)

        .then((docSnap) => {

          if (docSnap.exists()) {
          let object = docSnap.data();

          const classid = object.classid;
          const sessionid = object.classsessionid;
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
          }
        })
    }

  }

  useEffect(() => {

    console.log("10");

    const timenow = Date.now();

    if (passclassid2 && passclasssessionid2 && passlocation2 && passcoursename2 && passdestination2 && timeallowed2 && (classsessionending2 > timenow)) {
      sendtoplace();
    }
  }, [passdestination2]);

  const sendtoplace = () => {
    console.log("19" ,"sendtoplace is happening now", getstatus2);

    if (getstatus2 === "On Pass") {
      navigation.navigate("Pass", { id: id, passid: getexistingpassid2, school: school, state: state, town: town, firstname: firstname, lastname: lastname, classid: passclassid2, currentsessionid: passclasssessionid2, currentlocation: passlocation2, coursename: passcoursename2, locationdestination: passdestination2, bathroomtime: timeallowed2, teacheridforreturn: passteacheridreturn2, teacherid: teacheridfrompass2, timeallowed: timeallowed2, expectedreturn: expectedreturnfrompass2, rightnow: passrightnow2, currentdate: passcurrentdate2, realtimeleave: passrealtimeleave2 });

    }
    else if (getstatus2 === "inlineforbathroom") {
      navigation.navigate("Lineforbathroompass", { id: id, passid: getexistingpassid2, school: school, state: state, town: town, firstname: firstname, lastname: lastname, classid: passclassid2, currentsessionid: passclasssessionid2, currentlocation: passlocation2, coursename: passcoursename2, locationdestination: passdestination2, bathroomtime: timeallowed2, teacheridforreturn: passteacheridreturn2, teacherid: teacheridfrompass2 });
    } else { navigation.navigate("Passisready", { id: id, passid: getexistingpassid2, school: school, state: state, town: town, firstname: firstname, lastname: lastname, classid: passclassid2, currentsessionid: passclasssessionid2, currentlocation: passlocation2, coursename: passcoursename2, locationdestination: passdestination2, teacherid: teacheridfrompass2, drinkofwater: timeallowed2, teacheridforreturn: passteacheridreturn2, nonbathroomtime: timeallowed2 }); }
  }


  // retrieve pass end


  const refresh = () => {
    console.log("1")
    setShowspinner(true);
    if (update === true) {
      setUpdate(false)
    } else {
      setUpdate(true)
    }
    getTeachers()
  }


  const getTeachers = () => {

    console.log("IS SOMETHING BEING GOYYEN HERE?")

    console.log("9")

    const f = query(collection(firebase, "users"), where("school", "==", school), where("state", "==", state), where("town", "==", town), where("role", "!=", "Student"));
    const docDATAA = getDocs(f)

      .then(function (snapshot) {

        const array = [];
        snapshot.forEach(doc => {
          if ((doc.data().id) != teacherid) {
            array.push(doc.data().currentclass)
          }
        })
        setData(array);
        setCompleted(true);
      })

  };


  const getAvailableLocationsingrouptime0 = () => {

    console.log("1000")

    const g = query(collection(firebase, "classesbeingtaught"), where("acceptingincomingstudents", "==", true));
    const docDATAA = getDocs(g)
      .then(function (snapshot) {

        const arrayy = [{ location: "Bathroom", id: "Bathroom" }, { location: "Get Drink of Water", id: "Get Drink of Water" },];

        snapshot.forEach(doc => {
            arrayy.push(doc.data())
        })
        setSeconddata(arrayy); setShowspinner(false);
      })
  }

  const getAvailableLocationsingrouptime0dww = () => {

    console.log("11")

    const g = query(collection(firebase, "classesbeingtaught"), where("acceptingincomingstudents", "==", true));
    const docDATAA = getDocs(g)
      .then(function (snapshot) {

        const arrayy = [{ location: "Bathroom", id: "Bathroom" }, { location: "Get Drink of Water", id: "Get Drink of Water" },];

        snapshot.forEach(doc => {
            arrayy.push(doc.data())
        })
        setSeconddata(arrayy); setShowspinner(false);
      })

  }

  const getAvailableLocationsboth0 = () => {

    console.log("12")

    const g = query(collection(firebase, "classesbeingtaught"), where("acceptingincomingstudents", "==", true));
    const docDATAA = getDocs(g)
      .then(function (snapshot) {


        const arrayy = [{ location: "Bathroom", id: "Bathroom" }, { location: "Get Drink of Water", id: "Get Drink of Water" },];

        snapshot.forEach(doc => {
            arrayy.push(doc.data())
        })
        setSeconddata(arrayy); setShowspinner(false);
      })

  }

  const getAvailableLocationsboth0dww = () => {

    console.log("13")

    const g = query(collection(firebase, "classesbeingtaught"), where("acceptingincomingstudents", "==", true));
    const docDATAA = getDocs(g)
      .then(function (snapshot) {

        const arrayy = [{ location: "Bathroom", id: "Bathroom" }, { location: "Get Drink of Water", id: "Get Drink of Water" },];

        snapshot.forEach(doc => {
            arrayy.push(doc.data())
        })
        setSeconddata(arrayy); setShowspinner(false);
      })

  }

  const getAvailableLocationswithadmin = () => {

    const arrayy = coursesstudentisin;

    console.log( "14")

    const g = query(collection(firebase, "classesbeingtaught"), where("acceptingincomingstudents", "==", true));
    const docDATAA = getDocs(g)
      .then(function (snapshot) {

        snapshot.forEach(doc => {
          if (classid != doc.data().id)
            arrayy.push(doc.data())
        })
        setSeconddata(arrayy); setShowspinner(false);
      })

  }

  const getAvailableLocations2withadmin = () => {

    console.log("15")

    let arrayy = [];

    const g = query(collection(firebase, "classesbeingtaught"), where("acceptingincomingstudents", "==", true));
    const docDATAA = getDocs(g)
      .then(function (snapshot) {

        const arrayy = [{ location: newlocation, id: newlocation },]

        snapshot.forEach(doc => {
            arrayy.push(doc.data())
        })
        setSeconddata(arrayy); setShowspinner(false);
      })
    console.log(seconddata, "function 1")
  }

  const getAvailableLocations2grouptime0 = () => {

    console.log("16")

    let arrayy = [];

    const g = query(collection(firebase, "classesbeingtaught"), where("acceptingincomingstudents", "==", true));
    const docDATAA = getDocs(g)
      .then(function (snapshot) {

        //   const arrayy = [{ location: newlocation, id: newlocation },]

        const arrayy = [{ location: newlocation, id: newlocation }, { location: "Bathroom", id: "Bathroom" }, { location: "Get Drink of Water", id: "Get Drink of Water" },]



        snapshot.forEach(doc => {
            arrayy.push(doc.data())
        })
        setSeconddata(arrayy); setShowspinner(false);
      })
  }

  const getAvailableLocations2grouptime0dww = () => {

    console.log("17")

    let arrayy = [];

    const g = query(collection(firebase, "classesbeingtaught"), where("acceptingincomingstudents", "==", true));
    const docDATAA = getDocs(g)
      .then(function (snapshot) {

        //   const arrayy = [{ location: newlocation, id: newlocation },]

        const arrayy = [{ location: newlocation, id: newlocation }, { location: "Bathroom", id: "Bathroom" }, { location: "Get Drink of Water", id: "Get Drink of Water" },]



        snapshot.forEach(doc => {
            arrayy.push(doc.data())
        })
        setSeconddata(arrayy); setShowspinner(false);
      })
    console.log(seconddata, "function 5")
  }

  async function bathroompassinfosent() {

    setShowspinner(true);
    const r = new Date();


    console.log("20")

    const docRef = await addDoc(collection(firebase, "passes"), {

      timepassinitiated: Date.now(),
      timeallowedonpass: bathroomtime,
      linkedclass: linkedclass,

      firstname: firstname,
      lastname: lastname,
      classid: classid,
      coursename: coursename,
      comingfrom: currentlocation,
      teacherid: teacherid,

      returnteacherid: teacheridforreturn,
      classesinvolved: [classid],

      studentid: id,
      school: school,
      teacheriscalled: teacher,
      destination: locationdestination,
      timeleftclass: 0,
      leftclass: 0,
      returned: 0,
      timereturned: 0,
      placeinline: totalinlineforbathroomlocal,
      classsessionid: currentsessionid,
      whenlimitwillbereached: 0,
      // returnedbeforetimelimit: "null",
      differenceoverorunderinminutes: 0,
      endofclasssession: endofclasssession,

    }).then(async (userRec) => {
      let user = userRec.id;
      await updateDoc(doc(firebase, "passes", user), {
        id: user
      }).catch((error) => {
        console.log(error); alert(error);
      });

      await updateDoc(doc(firebase, "classesbeingtaught", classid), {
        totalinlineforbathroom: totalinlineforbathroomlocal + 1,
      }).catch((error) => {
        console.log(error); alert(error);
      });

      await updateDoc(doc(firebase, "users", id), {
        status: "inlineforbathroom",
        passid: userRec.id
      }).catch((error) => {
        console.log(error); alert(error);
      });

      setPassid(userRec.id);
    
    })
      .catch((error) => {
        console.log(error); alert(error);
      });

  }

  async function drinkpassinfosent() {


    setShowspinner(true);
    const r = new Date();

    console.log("20")

    const docRef = await addDoc(collection(firebase, "passes"), {

      timepassinitiated: Date.now(),
      timeallowedonpass: drinkofwater,
      linkedclass: linkedclass,
      firstname: firstname,
      lastname: lastname,
      classid: classid,
      coursename: coursename,
      comingfrom: currentlocation,
      teacherid: teacherid,

      returnteacherid: teacheridforreturn,
      classesinvolved: [classid],

      studentid: id,
      school: school,
      teacheriscalled: teacher,
      destination: locationdestination,
      timeleftclass: 0,
      leftclass: 0,
      returned: 0,
      timereturned: 0,
      classsessionid: currentsessionid,
      whenlimitwillbereached: 0,
      // returnedbeforetimelimit: "null",
      differenceoverorunderinminutes: 0,
      endofclasssession: endofclasssession,

    }).then(async (userRec) => {
      let user = userRec.id;
      await updateDoc(doc(firebase, "passes", user), {
        id: user
      }).catch((error) => {
        console.log(error); alert(error);
      });

      await updateDoc(doc(firebase, "users", id), {
        status: "Get Drink of Water",
        passid: userRec.id
      }).catch((error) => {
        console.log(error); alert(error);
      });

      setPassid(userRec.id);
   
    })
      .catch((error) => {
        console.log(error); alert(error);
      });

  }

  const drinkpassinfosent2 = () => {

    console.log("YOOOOO this is getting run")

    const s = query(collection(firebase, "passes"), where("classsessionid", "==", currentsessionid), where("destination", "==", "Get Drink of Water"), where("returned", "==", 0), where("leftclass", ">", 0));

    const docDATAA = getDocs(s)

      .then(function (snapshot) {

        let array = []
        snapshot.forEach(doc => {
          array.push(doc.data())

        })
        if (array.length === 0) {
          drinkpassinfosent();

        } else {
          alert("Someone is getting a drink now.")
        }
      })

  }

  async function exclusivephonepassinfosent() {
    setShowspinner(true);
    const r = new Date();

    console.log("21")

    const docRef = await addDoc(collection(firebase, "passes"), {

      timepassinitiated: Date.now(),
      timeallowedonpass: exclusivetime,
      linkedclass: linkedclass,
      returnteacherid: teacheridforreturn,
      firstname: firstname,
      lastname: lastname,
      classid: classid,
      coursename: coursename,
      comingfrom: currentlocation,
      teacherid: teacherid,
      classesinvolved: [classid],
      studentid: id,
      school: school,
      teacheriscalled: teacher,
      destination: locationdestination,
      timeleftclass: 0,
      leftclass: 0,
      returned: 0,
      timereturned: 0,
      placeinline: totalinlineforexclusivephonelocal,
      classsessionid: currentsessionid,
      whenlimitwillbereached: 0,
      // returnedbeforetimelimit:"null",
      differenceoverorunderinminutes: 0,
      endofclasssession: endofclasssession,

    }).then(async (userRec) => {
      let user = userRec.id;
      await updateDoc(doc(firebase, "passes", user), {
        id: user,
      }).catch((error) => {
        console.log(error); alert(error);
      });


      await updateDoc(doc(firebase, "classesbeingtaught", classid), {
        totalinlineforexclusivephone: totalinlineforexclusivephonelocal + 1,
      }).catch((error) => {
        console.log(error); alert(error);
      });

      await updateDoc(doc(firebase, "users", id), {
        status: "inlineforphonepass",
        passid: userRec.id
      }).catch((error) => {
        console.log(error); alert(error);
      });


      setPassid(userRec.id);
     
    })
      .catch((error) => {
        console.log(error); alert(error);
      });

  }

  async function otherpassinfosent() {


    setShowspinner(true);
    const r = new Date();

    console.log("22")

    const docRef = await addDoc(collection(firebase, "passes"), {

      returnteacherid: teacheridforreturn,
      timepassinitiated: Date.now(),
      timeallowedonpass: nonbathroomtime,
      firstname: firstname,
      lastname: lastname,
      classid: classid,
      coursename: coursename,
      comingfrom: currentlocation,
      teacherid: teacherid,
      classesinvolved: [classid,Idselecteddestination ],
      studentid: id,
      school: school,
      teacheriscalled: teacher,
      destination: locationdestination,
      timeleftclass: 0,
      leftclass: 0,
      returned: 0,
      timereturned: 0,
      whenlimitwillbereached: 0,
      // returnedbeforetimelimit: "null",
      differenceoverorunderinminutes: 0,

    }).then(async (userRec) => {
      let user = userRec.id;
      await updateDoc(doc(firebase, "passes", user), {
        id: user
      }).catch((error) => {
        console.log(error); alert(error);
      });


      await updateDoc(doc(firebase, "users", id), {
        status: "Other Pass Info",
        passid: userRec.id
      }).catch((error) => {
        console.log(error); alert(error);
      });


      setPassid(userRec.id);
      console.log(user, "This is the pass id");
    })
      .catch((error) => {
        console.log(error); alert(error);
      });

  }


  async function custompassinfosent() {

      navigation.navigate("Passisready", { userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroomlocal, passid: passid, id: id, teacheridforreturn: teacheridforreturn, maxstudentsonphonepass: maxstudentsonphonepass, newlocation: newlocation, endofclasssession: endofclasssession, adjustmentandoverunder: adjustmentandoverunder, total2: total2, getcurrentdifference: getcurrentdifference, })
  }

  return (
    <SafeAreaView style={styles.largercontainer}>
      <View style={styles.container1}>
        <Text>{'\n'}</Text>
        <TouchableOpacity><Text style={styles.error} onPress={() => refresh()}>Select Desired Destination</Text></TouchableOpacity></View>
      <Text>{'\n'}</Text>
      <View style={styles.container2}>
        {seconddata.length > 0 ? <Destinations ledby = {ledby} newlocation={newlocation} seconddata={seconddata} id={id} setSelectedclassdestination={setSelectedclassdestination} selectedclass={Selectedclassdestination} setCoursenamedestination={setCoursenamedestination} Idselecteddestination={Idselecteddestination} currentlocation={currentlocation} Teacherdestination={Teacherdestination} disable={disable} disabledonewithworkphonepass={disabledonewithworkphonepass} classisover={classisover} /> : <Text style={styles.text}>   </Text>}
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

        {passid == "" && Selectedclassdestination && locationdestination === "Done with work Phone Pass" ? (<Text style={styles.paragraph2} onPress={() => custompassinfosent()} >Make A Pass </Text>) :

          passid == "" && Selectedclassdestination && locationdestination === "Break From Work Pass " ? (<Text style={styles.paragraph2} onPress={() => exclusivephonepassinfosent()} >Make A Pass </Text>) :

            passid == "" && Selectedclassdestination && locationdestination === "Bathroom" && (bathroomepassinuselocal > 0 || totalinlineforbathroomlocal > 0) ? (<Text style={styles.paragraph2} onPress={() => bathroompassinfosent()} >Get In Line </Text>) :
              passid == "" && Selectedclassdestination && locationdestination === "Bathroom" ? (<Text style={styles.paragraph2} onPress={() => bathroompassinfosent()} >Make A Pass </Text>) :
                passid == "" && Selectedclassdestination && locationdestination === "Get Drink of Water" ? (<Text style={styles.paragraph2} onPress={() => drinkpassinfosent2()} >Make A Pass </Text>) : passid == "" && Selectedclassdestination && locationdestination === newlocation ? (<Text style={styles.paragraph2} onPress={() => custompassinfosent()} >Make A Pass </Text>) : passid == "" && Selectedclassdestination === "" ? (<Text style={styles.paragraph2} onPress={() => navigation.navigate("Customlocation", { userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, Selectedclassdestination: Selectedclassdestination, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, locationdestination: locationdestination, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid, bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroomlocal, passid: passid, id: id, teacheridforreturn: teacheridforreturn, maxstudentsonphonepass: maxstudentsonphonepass, newlocation: newlocation, endofclasssession: endofclasssession, lengthofclasssession: lengthofclasssession })}> A Different Destination</Text>) : passid == "" ? (<Text style={styles.paragraph2} onPress={() => otherpassinfosent()} >Make A Pass </Text>) : (<Text style={styles.paragraph2} onPress={() => navigation.navigate("Mainmenustudent", {
                  userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid,
                  maxstudentsonphonepass: maxstudentsonphonepass,
                  bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, id: id, bathroomtime: bathroomtime, endofclasssession: endofclasssession, overunderstatus: overunderstatus, lengthofclasssession: lengthofclasssession, adjustmentandoverunder: adjustmentandoverunder, maxstudentsbathroom: maxstudentsbathroom
                })} >You Have an Active Pass</Text>)}

        <Text style={styles.paragraph2}>___________________ {'\n'}</Text>
        <Text style={styles.paragraph2} onPress={() => navigation.navigate("Mainmenustudent", {
          userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid,
          maxstudentsonphonepass: maxstudentsonphonepass,
          bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, id: id, bathroomtime: bathroomtime, endofclasssession: endofclasssession, overunderstatus: overunderstatus, lengthofclasssession: lengthofclasssession, adjustmentandoverunder: adjustmentandoverunder, maxstudentsbathroom: maxstudentsbathroom
        })} >Cancel </Text>
      </View>
    </SafeAreaView>

  );
}
const styles = StyleSheet.create({

  largercontainer: {
    height: height,
    backgroundColor: "#000",
    height: "100%"

  },

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: 2,
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

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
    backgroundColor: '#000000',
    color: "#fff",

    justifyContent: "center",
    marginTop: 30,
  },
  container2: {
    height: "35%",
    backgroundColor: "#013469",
    width: "100%",

  },
  container1: {
    height: "10%",
    backgroundColor: '#000',
    width: "100%",
    justifyContent: "center",
    alignItems: "center"

  },
  error: {

    backgroundColor: '#000',
    color: "#FFF",
    marginLeft: "3%",
    marginRight: "3%",
    fontSize: 18,
    fontWeight: 'bold',

  },
  section3: {

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: "#000",
    color: "#fff",
    alignContent: "center",
    height: "30%",

  },

});
export default Destination; 


