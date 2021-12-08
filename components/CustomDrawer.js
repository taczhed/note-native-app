import * as React from 'react';
import {StyleSheet, Alert} from 'react-native';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import { MaterialIcons } from '@expo/vector-icons';

const CustomDrawerContent = (routes) => {

    const informationOfAuthor = () => {
        Alert.alert('Version 1.0', 'Application made in React Native by Patryk Lach', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    }

    return (
        <DrawerContentScrollView {...routes}>

            <DrawerItemList
                {...routes}
            />

            <DrawerItem
                label="Info"
                icon={() => <MaterialIcons name="info" size={30} color="black" />}
                onPress={() => informationOfAuthor()}
                style={styles.drawerItem}
                labelStyle={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    padding: 6
                }}
            />

        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    drawerItem: {
        padding: 6,
        backgroundColor: '#bbded6'
    }
})

export default CustomDrawerContent