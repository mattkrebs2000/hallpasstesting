import React, { useEffect, useState, } from 'react';
import { Alert, nativeEvent, Animated, ScrollView, View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'

export default function Phonelessstudents({ setIdselected, idselected, userdata, deleteToDo, id, setSelected, selected, changehasbeenmade, temporary, indefinitepenalty, classid, overunderlocal, currentlevel, abc, updatecompleted, totalminustesincompliance, localpercent, localphonepassquote, totalclasstime, totalpenaltyinutes, over, consequences, empty, setSelected2, idselected2, selected2, }) {


  const [scroll, setScroll] = useState(0);

  const selectHandler = (item, i) => {
    if (item.id != idselected) {
      setSelected(item);
      startAnimation();
    }
    else {
      setSelected("");
    }
  };

  const selectHandler2 = (value) => {

    if (value.id != idselected2) {

      setSelected2(value);
    }
    else {
      setSelected2("");

    }
  };


  const startAnimation = () => {
  
      scrollview_ref.scrollTo({
        x: 0,
        y: scroll,
        animated: false
      });
  
  };

  return (

    <View>

      <ScrollView
        onScroll={(e) => setScroll(e.nativeEvent.contentOffset.y)}
        // snapToInterval={1}
        scrollEventThrottle={0}
        ref={(ref) => {
          scrollview_ref = ref;
        }}>

        {empty === true || typeof empty === "undefined" ? userdata.map((item, i) => {

          // console.log(`The ${i+1} is ${item}`)

          return (


            <View key={item.id}>
              <View >


                {item.exclusivephonepassexpiration > Date.now() ? <Pressable
                  style={
                    item.id === idselected ? styles.selected : styles.unselected
                  }
                  onPress={() => selectHandler(item)}>
                  <Text style={styles.unselected
                  }>{item.localfirstname} {item.locallastname} -({item.email.split('@')[0]}){'\n'}On Phone Pass{'\n'}In Compliance: {Math.round((totalclasstime / 60000) - (item[classid].penaltyminutes))} Min. = {Math.round((((totalclasstime / 60000) - (item[classid].penaltyminutes)) / (totalclasstime / 60000)) * 100)}%{'\n'}Pass Min. Over/Under: {Math.floor(item[classid].overunder + item[classid].adjustments)}{'\n'}{item[classid].level}</Text>
                </Pressable> : item.id === idselected ? <Pressable
                  style={
                    item.id === idselected ? styles.selected : styles.unselected
                  }
                  onPress={() => selectHandler(item, i)}>
                  <Text style={styles.unselected
                  }>{item.localfirstname} {item.locallastname}-({item.email.split('@')[0]}){'\n'}{item.temporary === "null" ? "In Good Standing" : "In Penalty"}{'\n'}In Compliance: {Math.round((totalclasstime / 60000) - (item[classid].penaltyminutes))} Min. = {Math.round((((totalclasstime / 60000) - (item[classid].penaltyminutes)) / (totalclasstime / 60000)) * 100)}%{'\n'}Pass Min. Over/Under: {Math.floor(item[classid].overunder + item[classid].adjustments)}{'\n'}{item[classid].level}</Text>
                </Pressable> : <Pressable
                  style={
                    item.temporary === "null"  ? styles.unselected : styles.unselected2
                  }
                  onPress={() => selectHandler(item, i)}>
                  <Text style={styles.unselected
                  }>{item.localfirstname} {item.locallastname}-({item.email.split('@')[0]}){'\n'}{item.temporary === "null" ? "In Good Standing" : "In Penalty"}{'\n'}In Compliance: {Math.round((totalclasstime / 60000) - (item[classid].penaltyminutes))} Min. = {Math.round((((totalclasstime / 60000) - (item[classid].penaltyminutes)) / (totalclasstime / 60000)) * 100)}%{'\n'}Pass Min. Over/Under: {Math.floor(item[classid].overunder + item[classid].adjustments)}{'\n'}{item[classid].level}</Text>
                </Pressable>}
              </View>
            </View>
          );
        }) : consequences && consequences.map((item, i) => {
          return (
            <View key={i}>
              <View >
                <Pressable
                  style={
                    item.id === idselected2 ? styles.selected : styles.unselected
                  }
                  onPress={() => selectHandler2(item)}>
                  <Text style={styles.unselected
                  }>{item.code} </Text>
                </Pressable>


              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>

  );
}


const styles = StyleSheet.create({

  unselected: {
    backgroundColor: '#013469',
    textAlign: "center",
    fontSize: 17,
    margin: 6,
    flex: 1,
    color: "#ffffff",
    borderWidth: 3,
    borderColor: "#013469",
  },
  unselected2: {
    backgroundColor: '#FF0000',
    textAlign: "center",
    fontSize: 17,
    margin: 6,
    flex: 1,
    color: "#ffffff",
    borderWidth: 3,
    borderColor: "#013469",
  },
  selected: {
    color: "#fff",
    backgroundColor: "#013469",
    borderWidth: 3,
    borderColor: "#E43522",
    margin: 6,
    fontSize: 20,
    borderRadius: 20,
    textAlign: "center",
    marginLeft: 25,
    marginRight: 25,
    flex: 1
  },

});



