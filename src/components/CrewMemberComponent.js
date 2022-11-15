import React from 'react';
import { Text} from 'react-native';

const CrewMember = ({firstName, lastName}) => {
    return (
        <Text>Membre d'équipe {firstName} {lastName} au rapport!</Text>
    )
};

export default CrewMember;