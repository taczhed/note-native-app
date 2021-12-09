import * as React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {useState} from "react";
import * as SecureStore from 'expo-secure-store';

const AddingCategoryScreen = ({navigation}) => {

    const [category, setCategory] = useState("")

    const saveCategory = async (name) => {
        const categories = await SecureStore.getItemAsync("categories")
        await SecureStore.setItemAsync("categories", `${categories}|${name.toLowerCase()}`)
        await ToastAndroid.showWithGravity('Category added!', ToastAndroid.SHORT, ToastAndroid.CENTER)
        await navigation.navigate('ListOfNotes')
    }

    return(
        <LinearGradient
            style={style.background}
            colors={['#B7ADED','#e2e2e2']}
        >
            <View style={style.content}>
                <TextInput
                    style={style.title}
                    underlineColorAndroid="#262626"
                    placeholder="Type new category..."
                    onChangeText={(text) => setCategory(text)}
                />
                <TouchableOpacity
                    onPress={() => saveCategory(category)}
                    style={style.button}
                >
                    <Text style={style.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const style = StyleSheet.create({
    background: {
        backgroundColor: '#4530b2',
        flex: 1,
    },
    content: {
        padding: 36
    },
    title: {
        padding: 16,
        fontSize: 24
    },
    button: {
        borderWidth: 2,
        borderColor: '#262626',
        padding: 16,
        marginTop: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 20
    }
})
export default AddingCategoryScreen