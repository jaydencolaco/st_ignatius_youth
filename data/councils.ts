export interface Member {
  name: string
  zone: string
  photoPath: string
}

export interface OfficeBear {
  role: 'Vice President' | 'General Secretary' | 'Joint Secretary'
  name: string
  zone: string
  photoPath: string
}

export interface Council {
  year: string
  president: {
    name: string
    title: string
    photoPath: string
    message: string
  }
  officeBearers: OfficeBear[]
  members: Member[]
}

export const councils: Council[] = [
  {
    year: '2025-26',
    president: {
      name: 'Fr. Sean Sequeira',
      title: 'Spiritual Director & President',
      photoPath: '/images/councils/2025-26/fr-sean.jpg',
      message:
        'Let this year be one where we burn brighter than ever — not for ourselves, but for each other and for God. Youth Ignited is more than a group; it is a calling.',
    },
    officeBearers: [
      {
        role: 'Vice President',
        name: 'Name Here',
        zone: 'Zone X',
        photoPath: '/images/councils/2025-26/vp.jpg',
      },
      {
        role: 'General Secretary',
        name: 'Name Here',
        zone: 'Zone X',
        photoPath: '/images/councils/2025-26/gs.jpg',
      },
      {
        role: 'Joint Secretary',
        name: 'Name Here',
        zone: 'Zone X',
        photoPath: '/images/councils/2025-26/js.jpg',
      },
    ],
    members: [
      { name: 'Karen',     zone: 'Zone 1',   photoPath: '/images/councils/2025-26/karen.jpg' },
      { name: 'Jayden',    zone: 'Zone 2-3', photoPath: '/images/councils/2025-26/jayden.jpg' },
      { name: 'Angela',    zone: 'Zone 4',   photoPath: '/images/councils/2025-26/angela.jpg' },
      { name: 'Darrell',   zone: 'Zone 5',   photoPath: '/images/councils/2025-26/darrell.jpg' },
      { name: 'Sarah',     zone: 'Zone 6',   photoPath: '/images/councils/2025-26/sarah.jpg' },
      { name: 'Stephanie', zone: 'Zone 7',   photoPath: '/images/councils/2025-26/stephanie.jpg' },
      { name: 'Goldens',   zone: 'Zone 8',   photoPath: '/images/councils/2025-26/goldens.jpg' },
    ],
  },
  {
    year: '2024-25',
    president: {
      name: 'Fr. Sean Sequeira',
      title: 'Spiritual Director & President',
      photoPath: '/images/councils/2024-25/fr-sean.jpg',
      message:
        'Another year of grace, growth, and fire. The legacy we built in 2024-25 will echo for years to come.',
    },
    officeBearers: [
      {
        role: 'Vice President',
        name: 'Name Here',
        zone: 'Zone X',
        photoPath: '/images/councils/2024-25/vp.jpg',
      },
      {
        role: 'General Secretary',
        name: 'Name Here',
        zone: 'Zone X',
        photoPath: '/images/councils/2024-25/gs.jpg',
      },
      {
        role: 'Joint Secretary',
        name: 'Name Here',
        zone: 'Zone X',
        photoPath: '/images/councils/2024-25/js.jpg',
      },
    ],
    members: [
      { name: 'Member 1', zone: 'Zone 1', photoPath: '/images/councils/2024-25/m1.jpg' },
      { name: 'Member 2', zone: 'Zone 2', photoPath: '/images/councils/2024-25/m2.jpg' },
      { name: 'Member 3', zone: 'Zone 3', photoPath: '/images/councils/2024-25/m3.jpg' },
      { name: 'Member 4', zone: 'Zone 4', photoPath: '/images/councils/2024-25/m4.jpg' },
    ],
  },
]
