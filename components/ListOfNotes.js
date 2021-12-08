import {StyleSheet, View, FlatList, ScrollView, TouchableOpacity, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import NoteItem from "./NoteItem";
import {useIsFocused} from "@react-navigation/native";

const ListOfNotes = ({navigation}) => {

    const [notes, setNotes] = useState([])
    const isFocused = useIsFocused()

    const reloadStore = async () => {
        let keys = await SecureStore.getItemAsync("keys")
        if (keys !== null) {
            keys = keys.split('|')
            keys = keys.filter(key => key !== "")
            // console.log(keys)
            let notesArray = keys.map(key => {
                if (key !== "") return SecureStore.getItemAsync(key).then(objectString => {
                    const value = objectString.split('|')
                    return {title: value[0], text: value[1], date: value[2], key: key}
                })
            })
            await Promise.all(notesArray)
            setNotes(notesArray.map(obj => obj._W))
        } else setNotes([])
    }

    useEffect(async () => {
        await reloadStore()
    }, [isFocused])

    const generateColor = () => {
        const random = Math.floor(Math.random() * 5)
        const bgArray = ['#aacdc5', '#79b5c0', '#C5F6FA', '#FCE6A9', '#A7DB8C']
        return bgArray[random]
    }

    const deleteNote = async (key) => {
        let finalKeysString = ""
        let keys = await SecureStore.getItemAsync("keys")
        keys = keys.split('|')
        keys = keys.filter(arrayKey => (arrayKey !== key && arrayKey !== ""))
        keys.map(keyString => finalKeysString += `|${keyString}`)
        await SecureStore.setItemAsync("keys", finalKeysString)
        await SecureStore.deleteItemAsync(key)
        await reloadStore()
    }


    return(
        <LinearGradient
            style={style.background}
            colors={['#F2CBBB','#e2e2e2']}
        >
                <ScrollView
                    style={style.content}
                >
                    {notes.map(component => (
                        <NoteItem
                            key={component.key}
                            storeKey={component.key}
                            title={component.title}
                            text={component.text}
                            date={component.date}
                            bg={generateColor()}
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
    }
})

export default ListOfNotes