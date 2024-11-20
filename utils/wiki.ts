export interface WikiResponse {
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

export interface FormattedText {
    type: 'text' | 'bold' | 'italic' | 'link';
    content: string;
}

export interface ParsedParagraph {
    segments: FormattedText[];
}

export interface ParsedContent {
    infobox: Record<string, string>;
    description: string;
    content: ParsedParagraph[];
}

export const parseTextFormatting = (text: string): FormattedText[] => {
    const segments: FormattedText[] = [];
    let currentIndex = 0;

    const patterns = [
        { regex: /'''(.*?)'''/g, type: 'bold' },
        { regex: /''(.*?)''/g, type: 'italic' },
        { regex: /\[\[([^\]|]*)\|?([^\]]*)\]\]/g, type: 'link' }
    ];

    while (currentIndex < text.length) {
        let found = false;
        let nearestMatch = {
            index: text.length,
            length: 0,
            content: '',
            type: 'text' as 'text' | 'bold' | 'italic' | 'link'
        };

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
            if (nearestMatch.index > currentIndex) {
                segments.push({
                    type: 'text',
                    content: text.slice(currentIndex, nearestMatch.index)
                });
            }
            segments.push({
                type: nearestMatch.type,
                content: nearestMatch.content
            });
            currentIndex = nearestMatch.index + nearestMatch.length;
        } else {
            segments.push({
                type: 'text',
                content: text.slice(currentIndex)
            });
            break;
        }
    }

    return segments;
};

export const parseWikiText = (content: string): ParsedContent => {
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

// Move your parseTextFormatting and parseWikiText functions here 