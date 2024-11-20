import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Image, Linking } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { topics } from '@/data/topics';
import { Stack } from 'expo-router';
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

    const renderFacts = () => {
        if (!topic.facts) return null;
        return Object.entries(topic.facts).map(([key, value]) => (
            <ThemedView key={key} style={styles.factRow}>
                <ThemedText style={styles.factLabel}>{key}:</ThemedText>
                <ThemedText style={styles.factValue}>{value}</ThemedText>
            </ThemedView>
        ));
    };

    const renderSocialMedia = () => {
        if (!topic.socialMedia) return null;
        return (
            <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Social Media</ThemedText>
                {Object.entries(topic.socialMedia).map(([platform, handle]) => (
                    <ThemedText key={platform} style={styles.socialHandle}>
                        {platform}: {handle}
                    </ThemedText>
                ))}
            </ThemedView>
        );
    };

    const renderLinks = () => {
        if (!topic.links) return null;
        return (
            <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Links</ThemedText>
                {Object.entries(topic.links).map(([type, url]) => (
                    <ThemedText
                        key={type}
                        style={styles.link}
                        onPress={() => Linking.openURL(`https://${url}`)}
                    >
                        {type === 'website' ? 'Official website' : type}
                    </ThemedText>
                ))}
            </ThemedView>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{
                headerTitle: topic.name,
            }} />
            <ThemedView style={styles.content}>
                {(topic.logo || topic.image) && (
                    <Image
                        source={{ uri: topic.logo || topic.image }}
                        style={styles.topicImage}
                    />
                )}
                <ThemedText style={styles.title}>{topic.name}</ThemedText>
                <ThemedText style={styles.description}>{topic.description}</ThemedText>

                <ThemedView style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Facts</ThemedText>
                    {renderFacts()}
                </ThemedView>

                {renderSocialMedia()}
                {renderLinks()}
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
    section: {
        width: '100%',
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
    },
    factRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    factLabel: {
        fontWeight: '500',
    },
    factValue: {
        color: '#666',
    },
    socialHandle: {
        fontSize: 16,
        marginBottom: 8,
        color: '#666',
    },
    link: {
        fontSize: 16,
        color: '#007AFF',
        marginBottom: 8,
    },
}); 