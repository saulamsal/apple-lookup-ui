import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import * as Haptics from 'expo-haptics';

interface SelectableTextProps {
    children: string;
    style?: any;
    onLongPress: (selectedText: string) => void;
}

export function SelectableText({ children, style, onLongPress }: SelectableTextProps) {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <Pressable
            onLongPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                setIsSelected(true);
                onLongPress(children);
            }}
            style={({ pressed }) => [
                pressed && styles.pressed,
                isSelected && styles.selected,
            ]}
        >
            <ThemedText style={[style]}>{children}</ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
    selected: {
        backgroundColor: 'rgba(51, 102, 204, 0.1)',
    },
}); 