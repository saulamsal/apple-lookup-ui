import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, ActivityIndicator, SafeAreaView, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FormattedText, ParsedContent, WikiResponse, parseWikiText } from '@/utils/wiki';

export default function WikiArticle() {
    const { key } = useLocalSearchParams<{ key: string }>();
    const [wikiContent, setWikiContent] = useState<ParsedContent | null>(null);
    const [loading, setLoading] = useState(true);
    const scrollY = new Animated.Value(0);

    const fetchWikiContent = async () => {
        try {
            const response = await fetch(
                `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=${key}&formatversion=2&rvprop=content&rvslots=*&origin=*`
            );
            const data: WikiResponse = await response.json();
            const content = data.query.pages[0].revisions[0].slots.main.content;
            const parsed = parseWikiText(content);
            setWikiContent(parsed);
        } catch (error) {
            console.error('Error fetching wiki content:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWikiContent();
    }, [key]);

    const renderFormattedText = (segment: FormattedText) => {
        const key = `${segment.type}-${segment.content}-${Math.random()}`;

        switch (segment.type) {
            case 'bold':
                return <ThemedText key={key} style={styles.bold}>{segment.content}</ThemedText>;
            case 'italic':
                return <ThemedText key={key} style={styles.italic}>{segment.content}</ThemedText>;
            case 'link':
                return <ThemedText key={key} style={styles.link}>{segment.content}</ThemedText>;
            default:
                return <ThemedText key={key}>{segment.content}</ThemedText>;
        }
    };

    const renderHeader = () => (
        <ThemedView style={styles.stickyHeader}>
            <SafeAreaView>
                <ThemedView style={styles.headerContent}>
                    <Image
                        source={{ uri: 'https://i.imgur.com/zKpiUj6.png' }}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </ThemedView>
            </SafeAreaView>
        </ThemedView>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ThemedView style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                </ThemedView>
            </SafeAreaView>
        );
    }

    if (!wikiContent) {
        return (
            <SafeAreaView style={styles.container}>
                <ThemedView style={styles.container}>
                    <ThemedText>Failed to load content</ThemedText>
                </ThemedView>
            </SafeAreaView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            {renderHeader()}
            <SafeAreaView style={styles.contentContainer}>
                <Animated.ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                >
                    <ThemedView style={styles.articleHeader}>
                        <ThemedText style={styles.title}>{key.replace(/_/g, ' ')}</ThemedText>
                        <ThemedView style={styles.tabs}>
                            <ThemedText style={styles.tab}>Article</ThemedText>
                            <ThemedText style={styles.tabInactive}>Talk</ThemedText>
                        </ThemedView>
                    </ThemedView>

                    {wikiContent.description && (
                        <ThemedView style={styles.description}>
                            <ThemedText style={styles.descriptionText}>
                                {wikiContent.description}
                            </ThemedText>
                        </ThemedView>
                    )}

                    <ThemedView style={styles.infoBox}>
                        {Object.entries(wikiContent.infobox).map(([key, value]) => (
                            <ThemedView key={key} style={styles.infoRow}>
                                <ThemedText style={styles.infoLabel}>{key}</ThemedText>
                                <ThemedText style={styles.infoValue}>{value}</ThemedText>
                            </ThemedView>
                        ))}
                    </ThemedView>

                    <ThemedView style={styles.content}>
                        {wikiContent.content.map((paragraph, index) => (
                            <ThemedText key={index} style={styles.paragraph}>
                                {paragraph.segments.map(renderFormattedText)}
                            </ThemedText>
                        ))}
                    </ThemedView>
                </Animated.ScrollView>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        marginTop: 44,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 16,
    },
    stickyHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 16,
        height: 44,
    },
    logo: {
        width: 120,
        height: 24,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
    },
    articleHeader: {
        padding: 16,
        paddingTop: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    tabs: {
        flexDirection: 'row',
        gap: 16,
    },
    tab: {
        fontSize: 16,
        fontWeight: '500',
        borderBottomWidth: 2,
        borderBottomColor: '#3366cc',
        paddingBottom: 8,
    },
    tabInactive: {
        fontSize: 16,
        color: '#666',
    },
    description: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        marginHorizontal: 16,
        marginTop: 8,
        borderRadius: 4,
    },
    descriptionText: {
        fontSize: 13,
        color: '#444',
        lineHeight: 18,
    },
    infoBox: {
        margin: 16,
        padding: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginTop: 8,
    },
    infoRow: {
        flexDirection: 'row',
        paddingVertical: 6,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e0e0e0',
    },
    infoLabel: {
        flex: 1,
        fontSize: 13,
        color: '#666',
        paddingRight: 8,
    },
    infoValue: {
        flex: 2,
        fontSize: 13,
        color: '#333',
    },
    content: {
        padding: 16,
    },
    paragraph: {
        fontSize: 15,
        lineHeight: 24,
        marginBottom: 16,
        color: '#333',
    },
    bold: {
        fontWeight: 'bold',
    },
    italic: {
        fontStyle: 'italic',
    },
    link: {
        color: '#3366cc',
        textDecorationLine: 'underline',
    },
});