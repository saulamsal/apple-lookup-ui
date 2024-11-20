import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Linking, ScrollView, Pressable, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { topics } from '@/data/topics';
import { Stack } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

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

    const getPlatformIcon = (platform: string) => {
        const icons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
            twitter: 'logo-twitter',
            instagram: 'logo-instagram',
            facebook: 'logo-facebook',
            linkedin: 'logo-linkedin',
            youtube: 'logo-youtube',
            github: 'logo-github',
            tiktok: 'logo-tiktok',
            default: 'share-social'
        };
        return icons[platform.toLowerCase()] || icons.default;
    };

    const getLinkIcon = (type: string) => {
        const icons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
            website: 'globe-outline',
            wikipedia: 'book-outline',
            docs: 'document-text-outline',
            github: 'logo-github',
            default: 'link-outline'
        };
        return icons[type.toLowerCase()] || icons.default;
    };

    const renderFacts = () => {
        if (!topic.facts) return null;
        return (
            <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Facts</ThemedText>
                {Object.entries(topic.facts).map(([key, value]) => (
                    <ThemedView key={key} style={styles.factRow}>
                        <ThemedText style={styles.factLabel}>{key}:</ThemedText>
                        <ThemedText style={styles.factValue}>{value}</ThemedText>
                    </ThemedView>
                ))}
            </ThemedView>
        );
    };

    const renderSocialMedia = () => {
        if (!topic.socialMedia) return null;
        return (
            <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Social Media</ThemedText>
                {Object.entries(topic.socialMedia).map(([platform, handle]) => (
                    <Pressable
                        key={platform}
                        style={styles.socialRow}
                        onPress={() => {/* Add social media link handler */ }}
                    >
                        <ThemedView style={styles.iconContainer}>
                            <Ionicons
                                name={getPlatformIcon(platform)}
                                size={24}
                                color="#666"
                            />
                        </ThemedView>
                        <ThemedView style={styles.socialTextContainer}>
                            <ThemedText style={styles.platformName}>{platform}</ThemedText>
                            <ThemedText style={styles.platformHandle}>{handle}</ThemedText>
                        </ThemedView>
                    </Pressable>
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
                    <Pressable
                        key={type}
                        style={styles.linkRow}
                        onPress={() => Linking.openURL(`https://${url}`)}
                    >
                        <ThemedView style={styles.iconContainer}>
                            <Ionicons
                                name={getLinkIcon(type)}
                                size={24}
                                color="#666"
                            />
                        </ThemedView>
                        <ThemedView style={styles.linkTextContainer}>
                            <ThemedText style={styles.linkTitle}>
                                {type === 'website' ? 'Official website' : type}
                            </ThemedText>
                            <ThemedText style={styles.linkUrl}>{url}</ThemedText>
                        </ThemedView>
                    </Pressable>
                ))}
            </ThemedView>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{
                headerTitle: topic.name,
                headerRight: () => (
                    <ThemedView style={styles.headerIconContainer}>
                        <Ionicons
                            name="close-sharp"
                            size={24}
                            color="#666"
                            style={styles.headerIcon}
                        />
                    </ThemedView>
                ),
            }} />
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <ThemedView style={styles.content}>
                    {(topic.logo || topic.image) && (
                        <Image
                            source={{ uri: topic.logo || topic.image }}
                            style={styles.topicImage}
                            resizeMode="cover"
                        />
                    )}
                    <ThemedText style={styles.title}>{topic.name}</ThemedText>
                    <ThemedText style={styles.description}>{topic.description}</ThemedText>

                    {renderFacts()}
                    {renderSocialMedia()}
                    {renderLinks()}
                </ThemedView>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    topicImage: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 20,

    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
        lineHeight: 36,
    },
    description: {
        fontSize: 17,
        color: '#666',
        textAlign: 'center',
        marginBottom: 32,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
        color: '#666',
    },
    factRow: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    factLabel: {
        flex: 1,
        fontSize: 17,
    },
    factValue: {
        flex: 1,
        fontSize: 17,
        color: '#666',
        textAlign: 'right',
    },
    socialRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    socialTextContainer: {
        marginLeft: 12,
    },
    platformName: {
        fontSize: 17,
        fontWeight: '500',
    },
    platformHandle: {
        fontSize: 15,
        color: '#666',
    },
    linkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    linkTextContainer: {
        marginLeft: 12,
    },
    linkTitle: {
        fontSize: 17,
        fontWeight: '500',
    },
    linkUrl: {
        fontSize: 15,
        color: '#666',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIconContainer: {
        backgroundColor: '#eaeaea',
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
    },
}); 
