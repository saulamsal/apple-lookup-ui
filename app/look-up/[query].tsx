import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack } from 'expo-router';

export default function LookUp() {
    const { query } = useLocalSearchParams<{ query: string }>();
    const decodedQuery = decodeURIComponent(query);

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen
                options={{
                    presentation: 'modal',
                    headerTitle: 'Look Up',
                    headerLargeTitle: true,
                }}
            />
            <ThemedView style={styles.content}>
                <ThemedText style={styles.query}>{decodedQuery}</ThemedText>
                {/* Add your lookup content here */}
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    query: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
}); 