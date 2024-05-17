import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface DaysWidgetProps {
    days: string[];
    expandedDay: string | null;
    onPress: (day: string | null) => void;
}

export function DaysWidget({ days, expandedDay, onPress }: DaysWidgetProps) {
    return (
        <TouchableOpacity onPress={() => onPress(expandedDay)}>
            <ThemedView style={styles.container}>
                {days.map((day, index) => (
                    <TouchableOpacity
                        key={day}
                        style={[styles.dayContainer, index < days.length - 1 && styles.borderBottom]}
                        onPress={() => onPress(day === expandedDay ? null : day)}
                        
                    >
                        <ThemedText type="title">{day}</ThemedText>
                        {expandedDay === day && <ThemedText>This is expanded content for {day}</ThemedText>}
                    </TouchableOpacity>
                ))}
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dayContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
