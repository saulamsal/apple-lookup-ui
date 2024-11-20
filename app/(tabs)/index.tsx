import 'react-native-get-random-values';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Pressable, Text, Platform, FlatList } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { topics } from '@/data/topics';

const topStories = [
  {
    id: '1',
    title: 'Linda_McMahon_Selected_as_Secretary_of_Education_Nominee',
    subtitle: 'Former WWE executive chosen to lead department President Donald Trump plans to dissolve',
    relatedTopics: ['wwe', 'trump']
  },
  {
    id: '2',
    title: 'SpaceX_Starship_Test_Flight_Success',
    subtitle: 'Massive rocket achieves milestone launch with Elon Musk & Co. in attendance',
    relatedTopics: ['musk', 'spacex', 'tesla']
  },
  {
    id: '3',
    title: 'Baltic_Sea_Fiber_Optic_Cable_Incident',
    subtitle: 'Russia accused of sabotaging underwater communications infrastructure',
    relatedTopics: ['russia', 'baltic']
  },
  {
    id: '4',
    title: 'Rafael_Nadal_Career_Concludes',
    subtitle: 'Tennis legend ends 20-year career with emotional Davis Cup loss',
    relatedTopics: ['nadal', 'davis-cup']
  },
  {
    id: '5',
    title: 'Delta_Air_Lines_Shake_Shack_Partnership',
    subtitle: 'Airline to offer premium burger service on select flights',
    relatedTopics: ['delta', 'shake-shack']
  }
];

export default function HomeScreen() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query.trim()) return;

    // Convert query to Wiki-style URL format
    const formattedQuery = query
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('_');

    router.push(`/wiki/${formattedQuery}`);
  };

  const handleStoryPress = (title: string) => {
    router.push(`/wiki/${title}`);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.searchContainer}>
        <ThemedView style={styles.headerContent}>
          <Image
            source={{ uri: 'https://i.imgur.com/zKpiUj6.png' }}
            style={styles.logo}
            resizeMode="contain"
          />

        </ThemedView>        <ThemedText style={styles.subtitle}>Search Wikipedia articles</ThemedText>

        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Search Wikipedia..."
          placeholderTextColor="#666"
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <ThemedText style={styles.buttonText}>Search</ThemedText>
        </TouchableOpacity>

        <ThemedView style={styles.topStoriesContainer}>
          <ThemedText style={styles.topStoriesTitle}>Top Stories From ExpoPedia</ThemedText>
          {topStories.map((story) => (
            <ThemedView key={story.id} style={styles.storyItem}>
              <ThemedText style={styles.storyTitle}>
                {story.title.replace(/_/g, ' ')}
              </ThemedText>
              <ThemedText style={styles.storySubtitle}>
                {story.subtitle}
              </ThemedText>
              <FlatList
                data={story.relatedTopics}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.topicsContainer}
                renderItem={({ item: topicId }) => {
                  const topic = topics[topicId];
                  return (
                    <TouchableOpacity
                      style={styles.topicChip}
                      onPress={() => router.push(`/look-up/${topicId}`)}
                    >
                      {topic?.logo && (
                        <Image
                          source={{ uri: topic.logo }}
                          style={styles.topicIcon}
                        />
                      )}
                      <ThemedText style={styles.topicText}>{topic.name}</ThemedText>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={item => item}
              />
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
  },
  searchContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  searchInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  searchButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#3366cc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // paddingHorizontal: 16,
    height: 44,
  },

  logo: {
    width: 180,
    height: 50,
    marginRight: 8,
  },
  topStoriesContainer: {
    marginTop: 32,
    width: '100%',
  },
  topStoriesTitle: {
    fontSize: 15,
    marginBottom: 16,
    opacity: 0.6,
    textTransform: 'uppercase',
  },
  storyItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  storySubtitle: {
    fontSize: 16,
    color: '#666',
    letterSpacing: -0.5,
  },
  topicsContainer: {
    marginTop: 8,
  },
  topicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  topicIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 6,
  },
  topicText: {
    fontSize: 13,
    color: '#666',
  }
});
