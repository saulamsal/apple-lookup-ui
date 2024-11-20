import { useEffect, useState } from 'react';
import { Image, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface WikiResponse {
  query: {
    pages: Array<{
      title: string;
      revisions: Array<{
        slots: {
          main: {
            content: string;
          };
        };
      }>;
    }>;
  };
}

interface FormattedText {
  type: 'text' | 'bold' | 'italic' | 'link';
  content: string;
}

interface ParsedParagraph {
  segments: FormattedText[];
}

interface ParsedContent {
  infobox: Record<string, string>;
  description: string;
  content: ParsedParagraph[];
}

export default function HomeScreen() {
  const [wikiContent, setWikiContent] = useState<ParsedContent | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollY = new Animated.Value(0);

  const parseTextFormatting = (text: string): FormattedText[] => {
    const segments: FormattedText[] = [];
    let currentIndex = 0;

    // Handle different wiki markup patterns
    const patterns = [
      { regex: /'''(.*?)'''/g, type: 'bold' },
      { regex: /''(.*?)''/g, type: 'italic' },
      { regex: /\[\[([^\]|]*)\|?([^\]]*)\]\]/g, type: 'link' }
    ];

    while (currentIndex < text.length) {
      let found = false;
      let nearestMatch = { index: text.length, length: 0, content: '', type: 'text' };

      // Find the nearest formatting mark
      for (const pattern of patterns) {
        pattern.regex.lastIndex = currentIndex;
        const match = pattern.regex.exec(text);
        if (match && match.index < nearestMatch.index) {
          nearestMatch = {
            index: match.index,
            length: match[0].length,
            content: match[2] || match[1],
            type: pattern.type as 'bold' | 'italic' | 'link'
          };
          found = true;
        }
      }

      if (found) {
        // Add text before the formatting mark
        if (nearestMatch.index > currentIndex) {
          segments.push({
            type: 'text',
            content: text.slice(currentIndex, nearestMatch.index)
          });
        }
        // Add the formatted text
        segments.push({
          type: nearestMatch.type,
          content: nearestMatch.content
        });
        currentIndex = nearestMatch.index + nearestMatch.length;
      } else {
        // Add remaining text
        segments.push({
          type: 'text',
          content: text.slice(currentIndex)
        });
        break;
      }
    }

    return segments;
  };

  const parseWikiText = (content: string): ParsedContent => {
    const infobox: Record<string, string> = {};
    const infoboxMatch = content.match(/{{Infobox software([\s\S]*?)}}/);

    if (infoboxMatch) {
      const infoboxContent = infoboxMatch[1];
      const infoboxLines = infoboxContent.split('\n');
      infoboxLines.forEach(line => {
        const [key, value] = line.split('=').map(s => s.trim());
        if (key && value) {
          const cleanValue = value
            .replace(/{{.*?}}/g, '')
            .replace(/\[\[([^\]|]*)\|?([^\]]*)\]\]/g, '$2')
            .replace(/\|.*$/, '')
            .trim();
          infobox[key.replace('|', '')] = cleanValue;
        }
      });
    }

    const descMatch = content.match(/{{Short description\|(.*?)}}/);
    const description = descMatch ? descMatch[1].replace(/{{.*?}}/g, '').trim() : '';

    const mainContent = content
      .split('\n\n')
      .filter(para => !para.startsWith('{{') && para.length > 0)
      .map(para => {
        const cleanPara = para
          .replace(/{{cite.*?}}/g, '')
          .replace(/{{.*?}}/g, '')
          .replace(/<.*?>/g, '')
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        return {
          segments: parseTextFormatting(cleanPara)
        };
      })
      .filter(para => para.segments.length > 0);

    return {
      infobox,
      description,
      content: mainContent
    };
  };

  const fetchWikiContent = async () => {
    try {
      const response = await fetch(
        'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=React+Native&formatversion=2&rvprop=content&rvslots=*&origin=*'
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
  }, []);

  const renderFormattedText = (segment: FormattedText) => {
    switch (segment.type) {
      case 'bold':
        return (
          <ThemedText key={Math.random()} style={styles.bold}>
            {segment.content}
          </ThemedText>
        );
      case 'italic':
        return (
          <ThemedText key={Math.random()} style={styles.italic}>
            {segment.content}
          </ThemedText>
        );
      case 'link':
        return (
          <ThemedText key={Math.random()} style={styles.link}>
            {segment.content}
          </ThemedText>
        );
      default:
        return segment.content;
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
          <ThemedText style={styles.headerTitle}>Wikipedia</ThemedText>
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
            <ThemedText style={styles.title}>React Native</ThemedText>
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
    width: 24,
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
    margin: 16,
    borderRadius: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: '#444',
  },
  infoBox: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  infoLabel: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    flex: 2,
    fontSize: 14,
    color: '#333',
  },
  content: {
    padding: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
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
