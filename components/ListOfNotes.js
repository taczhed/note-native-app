import {StyleSheet, ScrollView, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import NoteItem from "./NoteItem";
import {useIsFocused} from "@react-navigation/native";

const ListOfNotes = ({navigation}) => {

    const [notes, setNotes] = useState([])
    const isFocused = useIsFocused()

    useEffect(async () => {
        const newNotes = await reloadStore()
        await setNotes(newNotes)
    }, [isFocused])

    const reloadStore = async () => {
        let keys = await SecureStore.getItemAsync("keys")
        if (keys !== null) {
            keys = keys.split('|')
            keys = keys.filter(key => key !== "")
            // console.log(keys)
            let notesArray = keys.map(key => {
                if (key !== "") return SecureStore.getItemAsync(key).then(objectString => {
                    const value = objectString.split('|')
                    return {title: value[0], text: value[1], date: value[2], category: value[3], color: value[4], key: key}
                })
            })
            await Promise.all(notesArray)
            return notesArray.map(obj => obj._W)
        } else setNotes([])
    }

    const deleteNote = async (key) => {
        let finalKeysString = ""
        let keys = await SecureStore.getItemAsync("keys")
        keys = keys.split('|')
        keys = keys.filter(arrayKey => (arrayKey !== key && arrayKey !== ""))
        keys.map(keyString => finalKeysString += `|${keyString}`)
        await SecureStore.setItemAsync("keys", finalKeysString)
        await SecureStore.deleteItemAsync(key)
        const newNotes = await reloadStore()
        await setNotes(newNotes)
    }

    const searchNotes = async (text) => {
        let newNotes = await reloadStore()
        newNotes = newNotes.filter(noteObject => (
            noteObject.text.toLowerCase().includes(text.toLowerCase()) ||
            noteObject.title.toLowerCase().includes(text.toLowerCase()) ||
            noteObject.category.toLowerCase().includes(text.toLowerCase())
        ))
        await setNotes(newNotes)
    }


    return(
        <LinearGradient
            style={style.background}
            colors={['#F2CBBB','#e2e2e2']}
        >
                <ScrollView
                    style={style.content}
                >
                    <TextInput
                        style={style.title}
                        underlineColorAndroid="#262626"
                        placeholder="Search by category, title or content..."
                        onChangeText={(text) => searchNotes(text)}
                    />
                    {notes.map(component => (
                        <NoteItem
                            key={component.key}
                            navigation={navigation}
                            storeKey={component.key}
                            title={component.title}
                            text={component.text}
                            date={component.date}
                            category={component.category}
                            color={component.color}
                            deleteNote={deleteNote}
                        />
                    ))}
                </ScrollView>
        </LinearGradient>
    )
}

const style = StyleSheet.create({
    background: {
        backgroundColor: '#4530b2',
        flex: 1,
    },
    content: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        padding: 12,
        fontSize: 24,
        margin: 16
    },
})

export default ListOfNotes