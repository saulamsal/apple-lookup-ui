import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { topics } from '@/data/topics';

export default function LookUp() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const topic = topics[id];

    if (!topic) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText>Topic not found</ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.content}>
                {(topic.logo || topic.image) && (
                    <Image
                        source={{ uri: topic.logo || topic.image }}
                        style={styles.topicImage}
                    />
                )}
                <ThemedText style={styles.title}>{topic.name}</ThemedText>
                <ThemedText style={styles.description}>{topic.description}</ThemedText>
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
        alignItems: 'center',
    },
    topicImage: {
        width: 120,
        height: 120,
        marginBottom: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
}); 