export interface GalleryImage {
  id: string
  src: string
  alt: string
  eventTag: string
  yearTag: string
  caption?: string
}

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/gallery/placeholder-1.png',
    alt: 'Youth Week 2024 — King and Queen crowning night',
    eventTag: 'Youth Week',
    yearTag: '2024-25',
    caption: 'Youth Week 2024 — King and Queen crowning night.',
  },
  {
    id: '2',
    src: '/images/gallery/placeholder-2.png',
    alt: 'Treasure Hunt 2024',
    eventTag: 'Treasure Hunt',
    yearTag: '2024-25',
    caption: 'Zones battling it out across the church grounds.',
  },
  {
    id: '3',
    src: '/images/gallery/placeholder-3.png',
    alt: 'Council Induction 2024',
    eventTag: 'Induction',
    yearTag: '2024-25',
    caption: 'The 2024-25 council takes their oath at Sunday Mass.',
  },
  {
    id: '4',
    src: '/images/gallery/placeholder-4.png',
    alt: 'Christmas Carol Evening 2024',
    eventTag: 'Carols',
    yearTag: '2024-25',
    caption: 'A night of music and warmth to celebrate Christmas.',
  },
  {
    id: '5',
    src: '/images/gallery/placeholder-5.png',
    alt: 'DYC 2024',
    eventTag: 'DYC',
    yearTag: '2024-25',
    caption: 'Youth Ignited at the Diocesan Youth Convention.',
  },
  {
    id: '6',
    src: '/images/gallery/placeholder-6.png',
    alt: 'Service Project 2024',
    eventTag: 'Service',
    yearTag: '2024-25',
    caption: 'Serving the community — one act at a time.',
  },
  {
    id: '7',
    src: '/images/gallery/placeholder-7.png',
    alt: 'Youth Week 2023',
    eventTag: 'Youth Week',
    yearTag: '2023-24',
    caption: 'Talent night at Youth Week 2023.',
  },
  {
    id: '8',
    src: '/images/gallery/placeholder-8.png',
    alt: 'Feast of St. Ignatius 2023',
    eventTag: 'Feast Day',
    yearTag: '2023-24',
    caption: 'Celebrating our patron saint on July 31st.',
  },
]
