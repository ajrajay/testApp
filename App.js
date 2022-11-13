import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import Data from "./data.json";
import * as Font from 'expo-font';

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.imageUrl,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.Ingredient}</Text>
    </View>
  );
};


export default () => {
  const [sectionData, setsectionData] = useState([]);
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const dataformat = () => {
    let types = Data.map((data) => {
      return data.type;
    }).filter((v, i, a) => a.indexOf(v) === i);
    let AllData = [];
    types.forEach((type) => {
      AllData.push({
        title: type,
        horizontal: true,
        data: Data.filter((data) => {
          return data?.type == type;
        }),
      });
    });
    return AllData;
  };

  useEffect(() => {
    Font.loadAsync({
      'Montserrat': require('./assets/Montserratfont.ttf'),
    })
    .then(() => {
     setFontLoaded(true)
    }) 
    setsectionData(dataformat());
  }, []);

  if (!fontLoaded) return null

  
  return (
    <View style={styles.container}>
      <StatusBar style="light"   backgroundColor="#808080" />
      <SafeAreaView style={{ flex: 1,paddingTop:30 }}>
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={sectionData}
          renderSectionHeader={({ section }) => (
            <>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item }) => <ListItem item={item} />}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}
          renderItem={({ item, section }) => {
            return null;
          }}
        />
      </SafeAreaView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "#30384d",
    fontFamily: 'Montserrat',
    marginTop: 20,
    marginBottom: 5,
    marginLeft:10,
    textTransform: 'capitalize'
  },
  item: {
    margin: 8,
  },
  itemPhoto: {
    width: 250,
    height: 140,
  },
  itemText: {
    color: "#7e8a9a",
    marginTop: 5,
    fontFamily: 'Montserrat',
  },
});
