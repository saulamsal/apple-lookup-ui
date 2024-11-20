import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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

  return (
    <ThemedView style={styles.container}>
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
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    paddingHorizontal: 16,
    height: 44,
  },

  logo: {
    width: 180,
    height: 50,
    marginRight: 8,
  },
});
