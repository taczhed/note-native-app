import * as React from 'react';
import {Text, StyleSheet, TouchableOpacity, Alert, View} from 'react-native';

const NoteItem = ({navigation, storeKey, title, text, date, category, color, deleteNote}) => {

    const createAlert = () =>
        Alert.alert('Do you really want to delete this note?', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => deleteNote(storeKey) },
        ])

    return (
        <TouchableOpacity
            style={{...style.body, backgroundColor: color}}
            onLongPress={() => createAlert()}
            onPress={() => navigation.navigate('EditingNoteScreen', {
                title: title,
                storeKey: storeKey,
                text: text,
                date: date,
                category: category,
                color: color
            })}
        >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={style.categoryText}>{category}</Text>
                <Text style={style.dateText}>{date}</Text>
            </View>
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
        fontSize: 18,
        padding: 8,
        marginBottom: 16
    },
    categoryText: {
        fontSize: 18,
        padding: 8,
        marginBottom: 16,
        backgroundColor: '#363636',
        color: '#ffffff',
        borderRadius: 16
    }

})

export default NoteItem