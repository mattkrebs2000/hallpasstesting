import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Dimensions, SafeAreaView, StyleSheet, Button, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { auth, firebase } from "../Firebase/Config";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { onSnapshot, getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, FieldValue, arrayUnion } from "@firebase/firestore";
import Destinations from './MapOfDestinations/MapOfDestinations';


const height = Dimensions.get("window").height;

const Destination = ({ route, navigation }) => {

  const { userinformation, teacherid, coursename, classid, teacher, Selectedclassdestination, youcangetpass, section, currentlocation, school, state, town, locationdestination, firstname, lastname, ledby, drinkofwater, exclusivetime, donewithworkpass, bathroomtime, nonbathroomtime, currentsessionid, bathroompassinuse, totalinlineforbathroom, id, passid, teacheridforreturn, maxstudentsonphonepass, newlocation, endofclasssession, overunderstatus, lengthofclasssession, getadjustmentss, adjustmentandoverunder, total2, getcurrentdifference, maxstudentsbathroom, linkedclass, pnumber } = route.params;


  const [initialtext, setInitialtext] = useState("");
  const [startingnumber, setStartingnumber] = useState();
  const [inputtext, setInputtext] = useState();
  const [twotextsaretrue, setTwotextsaretrue] = useState();




  console.log(section, "section", "passisready");

  //Not needed if its not complex

  useEffect(() => {
    var RandomNumber = Math.floor(Math.random() * 3) + 1;
    setStartingnumber(RandomNumber)
  }, []);



  useEffect(() => {
    console.log("WHATEVEEEREEE")
    if (typeof inputtext != "undefined") {

      if (inputtext === initialtext) {
        setTwotextsaretrue(true);
      } else {
        setTwotextsaretrue(false);
      }
    }
  }, [initialtext, inputtext]);

  useEffect(() => {

    if (coursename) {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity>
            <Text accessibilityLabel="Guest" style={styles.error}>
            </Text>
          </TouchableOpacity>
        ),
      });
    }

  }, []);

  useEffect(() => {
    console.log(startingnumber, "This is the number")

    if (adjustmentandoverunder < 0 && adjustmentandoverunder >= -5) {
      setInitialtext("I will try not to be late this time. This penalty of having to write this can be removed if i serve a detention with the teacher.")
    } else if (adjustmentandoverunder < -5 && adjustmentandoverunder >= -10) {
      setInitialtext("I understand that rules are important and they are in place for my benefit. And I understand that one of the rules in this class is that i need to be respectful of the time limits of passes that i am using. So i will try not to be late this time. This penalty of having to write this can be can be reduced if I am quicker on my passes and removed if I serve a detention with the teacher.")
    }
    else if (adjustmentandoverunder < -10 && adjustmentandoverunder >= -15 && startingnumber == 1) {
      setInitialtext("i WiLl TrY nOt To Be LaTe ThIs TiMe. ThIs PeNaLtY oF hAvInG tO wRiTe ThIs CaN bE rEmOvEd If I sErVe A dEtEnTiOn WiTh ThE tEaChEr.")
    }
    else if (adjustmentandoverunder < -10 && adjustmentandoverunder >= -15 && startingnumber == 2) {
      setInitialtext("i wILl tRY noT To bE LatE ThiS TimE. ThiS PenALty OF haVIng TO wrITe tHIs cAN be REmoVEd iF I seRVe a DEteNTioN WitH The TEacHEr Or it can be reduced if I am quicker on my passes")
    }
    else if (adjustmentandoverunder < -10 && adjustmentandoverunder >= -15 && startingnumber == 3) {
      setInitialtext("i wiLL Try nOT To be LATe thIS Time. THIs peNALty oF HAvinG TO wriTE This CAN be rEMOved IF I serVE A detENTion WITh thE TEachER or it can be reduced if I am quicker on my passes.")
    }
    else if (adjustmentandoverunder < -15 && adjustmentandoverunder >= -20 && startingnumber == 1) {
      setInitialtext("iT iS iMpOrTaNt To Be In ClAsS aS mUcH aS pOsSiBlE. sO i WiLl TrY nOt To Be LaTe ThIs TiMe. ThIs PeNaLtY oF hAvInG tO wRiTe ThIs CaN bE rEmOvEd If I sErVe A dEtEnTiOn WiTh ThE tEaChEr or it can be reduced if I am quicker on my passes.")
    }
    else if (adjustmentandoverunder < -15 && adjustmentandoverunder >= -20 && startingnumber == 2) {
      setInitialtext("it IS imPOrtANt tO Be iN ClaSS as MUch AS poSSibLE. so I WilL Try NOt tO Be lATe tHIs tIMe. tHIs pENalTY of HAviNG to WRitE ThiS Can BE reMOveD If i SErvE A deTEntIOn wITh tHE teACheR Or iT Can BE reDUceD If i AM quICkeR On mY pASseS.")
    }
    else if (adjustmentandoverunder < -15 && adjustmentandoverunder >= -20 && startingnumber == 3) {
      setInitialtext("it iS IMporTANt to BE In clASS as mUCH as pOSSiblE. SO i wiLL Try nOT To be LATe thIS Time. THIs peNALty oF HAvinG TO wriTE This CAN be rEMOved IF I serVE A detENTion WITh thE TEachER Or it CAN be rEDUced IF I am qUICker oN MY pasSES.")
    }
    else if (adjustmentandoverunder < -20 && adjustmentandoverunder >= -30 && startingnumber == 1) {
      setInitialtext("i UnDeRsTaNd ThAt OnE oF tHe RuLeS iN tHiS cLaSs Is ThAt I nEeD tO bE rEsPeCtFuL oF tHe TiMe LiMiTs Of PaSsEs ThAt I aM uSiNg. So I wIlL tRy NoT tO bE lAtE tHiS tImE. tHiS pEnAlTy Of HaViNg To WrItE tHiS cAn Be ReMoVeD iF i SeRvE a DeTeNtIoN wItH tHe TeAcHeR Or It CaN bE rEdUcEd If I aM qUiCkEr oN mY pAsSeS.")
    }
    else if (adjustmentandoverunder < -20 && adjustmentandoverunder >= -30 && startingnumber == 2) {
      setInitialtext("i uNDerSTanD ThaT One OF thE RulES in THis CLasS Is tHAt i NEed TO be REspECtfUL of THe tIMe lIMitS Of pASseS ThaT I am USinG. So i WIll TRy nOT to BE laTE thIS tiME. thIS peNAltY Of hAVinG To wRIte THis CAn bE RemOVed IF i sERve A DetENtiON wiTH thE TeaCHer OR it CAn bE RedUCed IF i aM QuiCKer ON my PAssES.")
    }
    else if (adjustmentandoverunder < -20 && adjustmentandoverunder >= -30 && startingnumber == 3) {
      setInitialtext("i unDERstaND That ONE of tHE RuleS IN thiS CLass IS That I NEed tO BE resPECtfuL OF the TIMe liMITs of PASses THAt i aM USing. SO I wilL TRy noT TO be lATE thiS TIme. tHIS penALTy of HAVing TO WritE THis cAN Be reMOVed iF I ServE A DeteNTIon wITH the TEAcheR OR it cAN Be reDUCed iF I Am quICKer oN MY pasSES.")
    }
    else if (adjustmentandoverunder < -30 && startingnumber == 1) {
      setInitialtext("i UnDeRsTaNd ThAt RuLeS aRe ImPoRtAnT aNd ThEy ArE iN pLaCe FoR mY bEnEfIt. AnD i UnDeRsTaNd ThAt OnE oF tHe RuLeS iN tHiS cLaSs Is ThAt I nEeD tO bE rEsPeCtFuL oF tHe TiMe LiMiTs Of PaSsEs ThAt I aM uSiNg. So I wIlL tRy NoT tO bE lAtE tHiS tImE. tHiS pEnAlTy Of HaViNg To WrItE tHiS cAn Be ReMoVeD iF i SeRvE a DeTeNtIoN wItH tHe TeAcHeR oR iT cAn Be ReDuCeD iF I aM qUiCkEr On My PaSsEs.")
    }
    else if (adjustmentandoverunder < -30 && startingnumber == 2) {
      setInitialtext("i uNDerSTanD ThaT RulES arE ImpORtaNT anD TheY Are IN plACe fOR my BEneFIt. aND i uNDerSTanD ThaT One OF thE RulES in THis CLasS Is tHAt i NEed TO be REspECtfUL of THe tIMe lIMitS Of pASseS ThaT I am USinG. So i WIll TRy nOT to BE laTE thIS tiME. thIS peNAltY Of hAVinG To wRIte THis CAn bE RemOVed IF i sERve A DetENtiON wiTH thE TeaCHer OR it CAn bE RedUCed IF i aM QuiCKer ON my PAssES.")
    }
    else {
      setInitialtext("i unDERstaND That RULes aRE ImpoRTAnt aND They ARE in pLACe foR MY benEFIt. anD I UndeRSTand THAt onE OF the RULes iN THis cLASs is THAt i nEED to bE REspeCTFul oF THe tiME LimiTS Of paSSEs thAT I am uSINg. so I WIll tRY Not tO BE latE THis tIME. thiS PEnalTY Of haVINg to WRIte tHIS can BE RemoVED if i SERve a DETentION witH THe teACHer oR IT can BE ReduCED if i AM QuicKER on mY PAsseS.")
    }
  }, [startingnumber]);


  return (
    <SafeAreaView style={styles.largercontainer}>
      <View>
        <ScrollView>
          <View style={styles.container1}>
            <ScrollView>
              <View><Text style={styles.paragraph5}>Because your plus minus for this class is a negative number ({adjustmentandoverunder}) you must write out the statement below into the Input Box (exactly as it appears) before you are able to make a pass.</Text><Text style={styles.paragraph55}>   </Text></View>
            </ScrollView>
          </View>

          <ScrollView>
            <View style={styles.container2}>
              <Text style={styles.paragraph3}>Your Statement To Rewrite: </Text>
              <Text style={styles.paragraph33} selectable={false}>{initialtext}</Text>
            </View>
          </ScrollView>

          <View style={styles.section3}>
            <ScrollView>

              <TextInput
                style={initialtext.includes(inputtext) ? styles.Newrowyy : styles.Newrowy}
                placeholder="Create Contract Here"
                placeholderTextColor="#BEBEBE"
                onChangeText={(text) => setInputtext(text)}
                value={inputtext}
                multiline={true}
              />

              <Text style={styles.paragraph2}>___________________ {'\n'}</Text>

              {twotextsaretrue ? <Text style={styles.paragraph2} onPress={() => navigation.navigate("Destination", {
                userinformation: userinformation, teacherid: teacherid, coursename: coursename, classid: classid, teacher: teacher, youcangetpass: youcangetpass, section: section, currentlocation: currentlocation, school: school, state: state, town: town, firstname: firstname, lastname: lastname, ledby: ledby, drinkofwater: drinkofwater, exclusivetime: exclusivetime, donewithworkpass: donewithworkpass, bathroomtime: bathroomtime, nonbathroomtime: nonbathroomtime, currentsessionid: currentsessionid,
                maxstudentsonphonepass: maxstudentsonphonepass,
                bathroompassinuse: bathroompassinuse, totalinlineforbathroom: totalinlineforbathroom, id: id, bathroomtime: bathroomtime, endofclasssession: endofclasssession, overunderstatus: overunderstatus, lengthofclasssession: lengthofclasssession, getadjustmentss: getadjustmentss, adjustmentandoverunder: adjustmentandoverunder, maxstudentsbathroom: maxstudentsbathroom, linkedclass: linkedclass, pnumber: pnumber
              })} >Make A Pass</Text> : null}

              <Text style={styles.paragraph2}>{'\n'}</Text>
              <Text style={styles.paragraph2}> {'\n'}</Text>
              <Text style={styles.paragraph2}>{'\n'}</Text>
              <Text style={styles.paragraph2}>{'\n'}</Text>
              <Text style={styles.paragraph2}>{'\n'}</Text>

            </ScrollView>
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>

  );
}
const styles = StyleSheet.create({

  largercontainer: {
    height: height,
    backgroundColor: "#000",
    height: "100%",
    alignItems: "center"
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

  paragraph5: {
    fontSize: 17,
    textAlign: 'center',
    padding: 20,
    color: '#FFFFFF',
    backgroundColor: '#000000',
  },

  paragraph55: {
    fontSize: 17,
    textAlign: 'center',
    padding: 10,
    paddingTop: 0,
    color: '#FFFFFF',
    backgroundColor: '#000000',
    textDecorationLine: 'underline',

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
    margin: 10,
  },
  paragraph3: {

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
    backgroundColor: '#013469',
    color: "#FFF",
    margin: 10,

  },

  paragraph33: {

    fontSize: 18,
    textAlign: "center",
    backgroundColor: '#013469',
    color: "#FFF",
    margin: 10,

  },
  container2: {
    width: "100%",
    padding: 10,
    backgroundColor: "#013469",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: "100%",
    height: "100%",
    alignSelf: "center",
  },
  container1: {
    height: "20%",
    backgroundColor: '#000',
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",


  },
  error: {

    backgroundColor: '#000',
    color: "#FFF",
    marginLeft: "3%",
    marginRight: "3%",
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center"

  },
  section3: {

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: "#000",
    color: "#fff",
    height: "50%",
    width: "100%",
    alignSelf: "center",



  },
  Newrowy: {
    backgroundColor: '#013469',
    margin: 20,
    textAlign: "center",
    fontSize: 16,

    borderColor: "#E43522",
    borderWidth: 2,
    justifyContent: "center",
    color: "#fff",
    borderRadius: 10,

    maxWidth: "90%",
    maxHeight: "50%",
    padding: 15

  },
  Newrowyy: {
    backgroundColor: '#ffff00',
    margin: 20,
    textAlign: "center",
    fontSize: 16,

    borderColor: "#E43522",
    borderWidth: 2,
    justifyContent: "center",
    color: "#000000",
    borderRadius: 10,

    maxWidth: "90%",
    maxHeight: "50%",
    padding: 15

  },

});
export default Destination; 
