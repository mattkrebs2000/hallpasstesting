import React, { useEffect, useState, } from 'react';
import { Alert, nativeEvent, Animated, ScrollView, View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'

export default function Phonelessstudents({ setIdselected, idselected, userdata, deleteToDo, id, setSelected, selected, changehasbeenmade, temporary, indefinitepenalty, classid, overunderlocal, currentlevel, abc, updatecompleted, totalminustesincompliance, localpercent, totalclasstime, totalpenaltyinutes, over, consequences, empty, setSelected2, idselected2, selected2,isfirstname }) {


  const [scroll, setScroll] = useState(0);


  const [dataSource, setDataSource] = useState([]);
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [ref, setRef] = useState(null);
  const [pickindex, setPickindex] = useState(0);
  const [height, setHeight] = useState();
  const [height2, setHeight2] = useState(0);

  useEffect(() => {

if (height > height2) {
  setHeight2(height)
} else {
  setHeight2(height2)
}
      }, [height]);



  const selectHandler = (item, i) => {
    if (item.id != idselected && isfirstname != 3) {
      setSelected(item);
   
     setPickindex(i);
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


  useEffect(() => {
startAnimation();
  }, [idselected]);


  const startAnimation = () => {
      scrollview_ref.scrollTo({
        x: 0,
        y: (height2 * (pickindex/userdata.length)) + ((pickindex * 120)/userdata.length),
        animated: false
      });
  };

  return (

    <View>

      <ScrollView
        ref={(ref) => {
          scrollview_ref = ref;
        }}>

        {empty === true || typeof empty === "undefined" ? userdata.map((item, i) => {

          // console.log(`The ${i+1} is ${item}`)

          return (

            <View key={item.id} 
            onLayout={(event) => {
              const layout = event.nativeEvent.layout.y;
              setHeight(layout);
              // dataSourceCords[item.id] = layout.y;
              // setDataSourceCords(dataSourceCords);
            }}>
              <View>

                {item.id === idselected ? <Pressable
                  style={
                    item.id === idselected ? styles.selected : styles.unselected
                  }
                  onPress={() => selectHandler(item, i)}>
                  <Text style={styles.unselected
                  }>{item.localfirstname} {item.locallastname}-{item.temporary === "null" ? "All Good" : "In Penalty"}{'\n'}{item.email} - {item.passwordactual}{'\n'}In Compliance: {Math.round((totalclasstime) - (item[classid].penaltyminutes))} Min. = {Math.round((((totalclasstime) - (item[classid].penaltyminutes)) / (totalclasstime)) * 100)}%{'\n'}Pass Min. Over/Under: {Math.floor(item[classid].overunder + item[classid].adjustments)}{'\n'}{item[classid].level}</Text>
                </Pressable> : <Pressable
                  style={
                    item.temporary === "null"  ? styles.unselected : styles.unselected2
                  }
                  onPress={() => selectHandler(item, i)}>
                  <Text style={styles.unselected
                  }>{item.localfirstname} {item.locallastname}-{item.temporary === "null" ? "All Good" : "In Penalty"}{'\n'}{item.email} - {item.passwordactual}{'\n'}In Compliance: {Math.round((totalclasstime) - (item[classid].penaltyminutes))} Min. = {Math.round((((totalclasstime) - (item[classid].penaltyminutes)) / (totalclasstime)) * 100)}%{'\n'}Pass Min. Over/Under: {Math.floor(item[classid].overunder + item[classid].adjustments)}{'\n'}{item[classid].level}</Text>
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
         {empty === true || typeof empty === "undefined" ? <View><Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text></View>: <View><Text>{'\n'}{'\n'}</Text></View>}
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
    backgroundColor: '#E43522',
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



