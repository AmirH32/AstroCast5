import { LocationAPI, WeatherAPI, DayResult } from '@/scripts/locationWeatherApiInterface';
import React, { useState } from 'react';
import {StyleSheet, TextInput, FlatList, View, Text} from 'react-native';

const SearchBar = ({ onCitySelect }) => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  //const cities = [
  //  "Bath",
  //  "Birmingham",
  //  "Bradford",
  //  "Brighton & Hove",
  //  "Bristol",
  //  "Cambridge",
  //  "Canterbury",
  //  "Carlisle",
  //  "Chelmsford",
  //  "Chester",
  //  "Chichester",
  //  "Colchester",
  //  "Coventry",
  //  "Derby",
  //  "Doncaster",
  //  "Durham",
  //  "Ely",
  //  "Exeter",
  //  "Gloucester",
  //  "Hereford",
  //  "Kingston-upon-Hull",
  //  "Lancaster",
  //  "Leeds",
  //  "Leicester",
  //  "Lichfield",
  //  "Lincoln",
  //  "Liverpool",
  //  "London",
  //  "Manchester",
  //  "Milton Keynes",
  //  "Newcastle-upon-Tyne",
  //  "Norwich",
  //  "Nottingham",
  //  "Oxford",
  //  "Peterborough",
  //  "Plymouth",
  //  "Portsmouth",
  //  "Preston",
  //  "Ripon",
  //  "Salford",
  //  "Salisbury",
  //  "Sheffield",
  //  "Southampton",
  //  "Southend-on-Sea",
  //  "St Albans",
  //  "Stoke on Trent",
  //  "Sunderland",
  //  "Truro",
  //  "Wakefield",
  //  "Wells",
  //  "Westminster",
  //  "Winchester",
  //  "Wolverhampton",
  //  "Worcester",
  //  "York"
  //];
  

  const handleSearchTextChange = async (text) => {

    //const filteredSuggestions = cities.filter((item) =>
    //  item.toLowerCase().includes(text.toLowerCase())
    //);
    setSearchText(text);
    try {
      const filteredSuggestions = await LocationAPI.queryLocation(text, 10);
      setSuggestions(filteredSuggestions);
    }
    catch {
      setSuggestions([]);
    }
  };

    const renderSuggestion = ({ item }) => (
      <Text
        style={styles.suggestionText}
        onPress={() => {
          onCitySelect(item)
        }}
      >
        {item.name}
      </Text>
    );
    
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Input Location: "
          value={searchText}
          onChangeText={handleSearchTextChange}
        /> 
        {searchText.length > 0 && suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              renderItem={renderSuggestion}
              keyExtractor={(item) => item.name}
              style={styles.suggestionList}
            />
          )}
          
      </View>
    );
  };
  
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'left',
        height: '30%',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 0,
        borderRadius: 5,
    },
    searchInput: {
        borderWidth:2,
        borderColor: 'black',
        height: 40,
        paddingHorizontal: 10,
    },
    suggestionList: {
        marginTop: 8,
        textAlign: 'left',
        paddingVertical: 8,
        flex:1,
    },
      suggestionText: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    selectedCityText: {
      marginTop: 16,
      fontSize: 18,
      fontWeight: 'bold',
    },
});

export default SearchBar;

  