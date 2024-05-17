import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export function DayWidget ({ day : String}) => {
    return (
        // Your component's JSX here
        <View>
            <Text>{day}</Text>
        </View>
    );
};


export default DayWidget;
