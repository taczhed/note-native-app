import * as React from 'react';
import {Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

const NoteItem = ({storeKey, title, text, date, color, deleteNote}) => {

    const createAlert = () =>
        Alert.alert('Do you really want to delete this note?', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => deleteNote(storeKey)},
        ])

    return (
        <TouchableOpacity
            style={{...style.body, backgroundColor: color}}
            onLongPress={() => createAlert()}
        >
            <Text style={style.dateText}>{date}</Text>
            <Text style={style.titleText}>{title}</Text>
            <Text style={style.textText}>{text}</Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    body: {
        marginVertical: 8,
        marginHorizontal: 32,
        padding: 24,
        borderRadius: 24,
    },
    dateText: {
        textAlign: 'right',
        fontSize: 18
    },
    titleText: {
        textAlign: 'center',
        fontSize: 32
    },
    textText: {
        textAlign: 'justify',
        fontSize: 18
    }

})

export default NoteItem