export interface Topic {
    id: string;
    name: string;
    logo?: string;
    image?: string;
    description: string;
}

export const topics: Record<string, Topic> = {
    wwe: {
        id: 'wwe',
        name: 'WWE',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/WWE_Logo.svg/150px-WWE_Logo.svg.png',
        description: 'World Wrestling Entertainment, Inc. is an American professional wrestling promotion.'
    },
    trump: {
        id: 'trump',
        name: 'Donald Trump',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/150px-Donald_Trump_official_portrait.jpg',
        description: '45th president of the United States'
    },
    musk: {
        id: 'musk',
        name: 'Elon Musk',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/150px-Elon_Musk_Royal_Society_%28crop2%29.jpg',
        description: 'CEO of SpaceX and Tesla'
    },
    spacex: {
        id: 'spacex',
        name: 'SpaceX',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/SpaceX-Logo-Xonly.svg/150px-SpaceX-Logo-Xonly.svg.png',
        description: 'American spacecraft manufacturer and space transport services company'
    },
    tesla: {
        id: 'tesla',
        name: 'Tesla, Inc.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/150px-Tesla_Motors.svg.png',
        description: 'Electric vehicle and clean energy company'
    },
    russia: {
        id: 'russia',
        name: 'Russia',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/150px-Flag_of_Russia.svg.png',
        description: 'The largest country in the world by land mass'
    },
    baltic: {
        id: 'baltic',
        name: 'Baltic Sea',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Baltic_Sea_map.png/150px-Baltic_Sea_map.png',
        description: 'Arm of the Atlantic Ocean in Northern Europe'
    },
    nadal: {
        id: 'nadal',
        name: 'Rafael Nadal',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Rafael_Nadal_10%2C_Aegon_Championships%2C_London%2C_UK_-_Diliff.jpg/150px-Rafael_Nadal_10%2C_Aegon_Championships%2C_London%2C_UK_-_Diliff.jpg',
        description: 'Spanish professional tennis player'
    },
    'davis-cup': {
        id: 'davis-cup',
        name: 'Davis Cup',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Davis_Cup_logo.svg/150px-Davis_Cup_logo.svg.png',
        description: 'Premier international team event in men\'s tennis'
    },
    delta: {
        id: 'delta',
        name: 'Delta Air Lines',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Delta_logo.svg/150px-Delta_logo.svg.png',
        description: 'Major American airline'
    },
    'shake-shack': {
        id: 'shake-shack',
        name: 'Shake Shack',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Shake_Shack_Logo.svg/150px-Shake_Shack_Logo.svg.png',
        description: 'American fast casual restaurant chain'
    }
}; 