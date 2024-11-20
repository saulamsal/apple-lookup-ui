export interface Topic {
    id: string;
    name: string;
    logo?: string;
    image?: string;
    description: string;
    facts?: Record<string, string>;
    socialMedia?: Record<string, string>;
    links?: Record<string, string>;
}

export const topics: Record<string, Topic> = {
    saul_sharma: {
        id: 'saul_sharma',
        name: 'Saúl Sharma',
        image: 'https://pbs.twimg.com/profile_images/1776070739319214080/TBARcp9C_400x400.jpg',
        description: 'Hey folks! 👋',
    },
    wwe: {
        id: 'wwe',
        name: 'WWE',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/WWE_Logo.svg/150px-WWE_Logo.svg.png',
        description: 'World Wrestling Entertainment, Inc. is an American professional wrestling promotion.',
        facts: {
            'Founded': 'February 21, 1980',
            'Headquarters': 'Stamford, Connecticut',
            'CEO': 'Nick Khan (2023-)',
            'Employees': '900+ (2023)',
            'Revenue': '$1.3 billion (2022)'
        },
        socialMedia: {
            instagram: '@wwe',
            twitter: '@WWE',
            facebook: 'WWE'
        },
        links: {
            website: 'wwe.com',
            wikipedia: 'WWE'
        }
    },
    trump: {
        id: 'trump',
        name: 'Donald Trump',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/150px-Donald_Trump_official_portrait.jpg',
        description: '45th president of the United States',
        facts: {
            'Born': 'June 14, 1946',
            'Birthplace': 'Queens, New York City',
            'Political party': 'Republican',
            'Presidency': '2017-2021',
            'Net worth': '$2.5 billion (2023)'
        },
        socialMedia: {
            twitter: '@realDonaldTrump',
            truth_social: '@realDonaldTrump'
        },
        links: {
            website: 'donaldjtrump.com',
            wikipedia: 'Donald_Trump'
        }
    },
    musk: {
        id: 'musk',
        name: 'Elon Musk',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/150px-Elon_Musk_Royal_Society_%28crop2%29.jpg',
        description: 'CEO of SpaceX and Tesla',
        facts: {
            'Born': 'June 28, 1971',
            'Birthplace': 'Pretoria, South Africa',
            'Citizenship': 'South Africa, Canada, United States',
            'Net worth': '$234 billion (2024)',
            'Companies': 'Tesla, SpaceX, X, Neuralink'
        },
        socialMedia: {
            twitter: '@elonmusk',
            instagram: '@elonmusk'
        },
        links: {
            wikipedia: 'Elon_Musk'
        }
    },
    spacex: {
        id: 'spacex',
        name: 'SpaceX',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/SpaceX-Logo-Xonly.svg/150px-SpaceX-Logo-Xonly.svg.png',
        description: 'American aerospace manufacturer and space transport company',
        facts: {
            'Founded': 'March 14, 2002',
            'Headquarters': 'Hawthorne, California',
            'CEO': 'Elon Musk',
            'Employees': '13,000+',
            'Valuation': '$180 billion (2024)'
        },
        socialMedia: {
            twitter: '@SpaceX',
            instagram: '@spacex'
        },
        links: {
            website: 'spacex.com',
            wikipedia: 'SpaceX'
        }
    },
    tesla: {
        id: 'tesla',
        name: 'Tesla, Inc.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/150px-Tesla_Motors.svg.png',
        description: 'Electric vehicle and clean energy company',
        facts: {
            'Founded': 'July 1, 2003',
            'Headquarters': 'Austin, Texas',
            'CEO': 'Elon Musk (2008-)',
            'Employees': '127,855 (2023)',
            'Revenue': '$81.5 billion (2023)'
        },
        socialMedia: {
            twitter: '@Tesla',
            instagram: '@teslamotors',
            facebook: 'Tesla'
        },
        links: {
            website: 'tesla.com',
            wikipedia: 'Tesla,_Inc.'
        }
    },
    russia: {
        id: 'russia',
        name: 'Russia',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/150px-Flag_of_Russia.svg.png',
        description: 'The largest country in the world by land mass',
        facts: {
            'Capital': 'Moscow',
            'Population': '143.4 million (2023)',
            'President': 'Vladimir Putin',
            'Area': '17.1 million km²',
            'Currency': 'Russian Ruble'
        },
        socialMedia: {
            telegram: '@kremlinrussia_e'
        },
        links: {
            website: 'government.ru/en',
            wikipedia: 'Russia'
        }
    },
    baltic: {
        id: 'baltic',
        name: 'Baltic Sea',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Baltic_Sea_map.png/150px-Baltic_Sea_map.png',
        description: 'Arm of the Atlantic Ocean in Northern Europe',
        facts: {
            'Area': '377,000 km²',
            'Average depth': '55 meters',
            'Max depth': '459 meters',
            'Bordering countries': '9 countries',
            'Major ports': 'Stockholm, Gdańsk, Helsinki'
        },
        links: {
            wikipedia: 'Baltic_Sea'
        }
    },
    nadal: {
        id: 'nadal',
        name: 'Rafael Nadal',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Rafael_Nadal_10%2C_Aegon_Championships%2C_London%2C_UK_-_Diliff.jpg/150px-Rafael_Nadal_10%2C_Aegon_Championships%2C_London%2C_UK_-_Diliff.jpg',
        description: 'Spanish professional tennis player',
        facts: {
            'Born': 'June 3, 1986',
            'Birthplace': 'Mallorca, Spain',
            'Grand Slams': '22',
            'Career titles': '92',
            'Highest ranking': 'World No. 1'
        },
        socialMedia: {
            instagram: '@rafaelnadal',
            twitter: '@RafaelNadal',
            facebook: 'Nadal'
        },
        links: {
            website: 'rafaelnadal.com',
            wikipedia: 'Rafael_Nadal'
        }
    },
    'davis-cup': {
        id: 'davis-cup',
        name: 'Davis Cup',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Davis_Cup_logo.svg/150px-Davis_Cup_logo.svg.png',
        description: 'Premier international team event in men\'s tennis',
        facts: {
            'Founded': '1900',
            'Most titles': 'United States (32)',
            'Current champion': 'Italy (2023)',
            'Format': 'Team tournament',
            'Participants': '148 nations'
        },
        socialMedia: {
            twitter: '@DavisCup',
            instagram: '@daviscup',
            facebook: 'DavisCup'
        },
        links: {
            website: 'daviscup.com',
            wikipedia: 'Davis_Cup'
        }
    },
    delta: {
        id: 'delta',
        name: 'Delta Air Lines',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Delta_logo.svg/150px-Delta_logo.svg.png',
        description: 'Major American airline',
        facts: {
            'Founded': 'March 2, 1925',
            'Headquarters': 'Atlanta, Georgia',
            'CEO': 'Ed Bastian (2016-)',
            'Employees': '95,000+ (2023)',
            'Fleet size': '900+ aircraft'
        },
        socialMedia: {
            twitter: '@Delta',
            instagram: '@delta',
            facebook: 'delta'
        },
        links: {
            website: 'delta.com',
            wikipedia: 'Delta_Air_Lines'
        }
    },
    'shake-shack': {
        id: 'shake-shack',
        name: 'Shake Shack',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Shake_Shack_Logo.svg/150px-Shake_Shack_Logo.svg.png',
        description: 'American fast casual restaurant chain',
        facts: {
            'Founded': '2004',
            'Headquarters': 'New York City',
            'CEO': 'Randy Garutti',
            'Locations': '450+ (2023)',
            'Revenue': '$1.1 billion (2023)'
        },
        socialMedia: {
            instagram: '@shakeshack',
            twitter: '@shakeshack',
            facebook: 'shakeshack'
        },
        links: {
            website: 'shakeshack.com',
            wikipedia: 'Shake_Shack'
        }
    }
};