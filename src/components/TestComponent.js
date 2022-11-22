import React from 'react';
import {useState} from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, FlatList } from 'react-native';
import colors from '../constants/colors';
import CrewMember from './CrewMemberComponent';

const Test = () => {
   let [firstName, setFirstName] = useState("");
   let [lastName, setLastName] = useState("");
   let [crewNumber, setCrewNumber] = useState(0);
   let [crewMembers, setCrewMumbers] = useState([]);

    const addCrewMember = () => {
        setCrewMumbers(
            [
                ...crewMembers,
                {id: Date.now().toString(), firstName: firstName, lastName: lastName}
            ]
        );
    }

    return (
        <View>
            <Text style={styles.title}>Nouvelle recrue</Text>
            <TextInput style={styles.input} value={firstName} onChangeText={value => setFirstName(value)} placeholder="Entrez votre nom"></TextInput>
            <TextInput style={styles.input} value={lastName} onChangeText={value => setLastName(value)} placeholder="Entrez votre prénom"></TextInput>
            <TouchableOpacity style={styles.button} onPress={addCrewMember} title="Ajouter">
                <Text>Ajouter</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Composition de l'équipage ({crewNumber})</Text>
            <FlatList 
                data={crewMembers} 
                renderItem={ 
                    ({item}) => <CrewMember firstName={item.firstName} lastName={item.lastName}/>
                }
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const FONT_SIZE = 20;

const styles = StyleSheet.create({
    inputSearchTerm: {
      marginBottom: 16,
      fontSize: FONT_SIZE
    },
    title: {
        alignSelf: "center",
        fontWeight: "bold",
        margin: 20,
        fontSize: FONT_SIZE
    },
    button: {
        alignItems: "center",
        backgroundColor: colors.primary_blue,
        padding: 10,
        innerHeight: 150,
        fontSize: FONT_SIZE
    },
    input: {
        margin: 8,
        fontSize: 20
    }
  });

export default Test;