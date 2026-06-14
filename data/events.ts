export type EventType = 'church' | 'dyc'
export type Month =
  | 'july' | 'august' | 'september' | 'october' | 'november'
  | 'december' | 'january' | 'february' | 'march' | 'april' | 'may' | 'june'

export interface YouthEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  month: Month
  yearLabel: string
  type: EventType
  imagePath?: string
  bookingUrl?: string
  past?: boolean
}

export const events: YouthEvent[] = [
  {
    id: 'induction-2026',
    title: 'Youth Council Induction',
    description:
      'The official induction of the Youth Ignited Council 2025-26. A solemn and celebratory Mass followed by the formal installation of office bearers and members.',
    date: '5 July 2026',
    time: '9:30 AM',
    location: 'St. Ignatius Church, Jacobs Circle',
    month: 'july',
    yearLabel: '2025-26',
    type: 'church',
    imagePath: '/images/events/induction.png',
    past: false,
  },
  {
    id: 'treasure-hunt-2026',
    title: 'Treasure Hunt',
    description:
      'A zone-wide treasure hunt across St. Ignatius and beyond. Bring your team, bring your energy.',
    date: '19 July 2026',
    time: '10:00 AM',
    location: 'St. Ignatius Church Grounds, Jacobs Circle',
    month: 'july',
    yearLabel: '2025-26',
    type: 'church',
    imagePath: '/images/events/treasure-hunt.png',
    past: false,
  },
  {
    id: 'feast-ignatius-2026',
    title: 'Feast of St. Ignatius of Loyola',
    description:
      'The patronal feast of our parish. Youth Ignited leads the youth segment of the celebrations — music, prayer, and community.',
    date: '31 July 2026',
    time: '6:00 PM',
    location: 'St. Ignatius Church, Jacobs Circle',
    month: 'july',
    yearLabel: '2025-26',
    type: 'church',
    past: false,
  },
  {
    id: 'dyc-goa-2025',
    title: 'Diocesan Youth Convention — Goa',
    description:
      'The annual Diocesan Youth Convention. Youth from across the Archdiocese of Bombay gather for worship, fellowship, and formation.',
    date: '15 August 2025',
    time: '9:00 AM',
    location: 'Don Bosco, Panaji, Goa',
    month: 'august',
    yearLabel: '2025-26',
    type: 'dyc',
    imagePath: '/images/events/dyc.png',
    past: false,
  },
  {
    id: 'youth-week-2025',
    title: 'Youth Week',
    description:
      'A full week of events — games, talent shows, service projects, and the iconic King and Queen crowning night.',
    date: '1 October 2025',
    time: '6:00 PM',
    location: 'St. Ignatius Church Hall',
    month: 'october',
    yearLabel: '2025-26',
    type: 'church',
    past: true,
  },
  {
    id: 'christmas-carol-2025',
    title: 'Christmas Carol Evening',
    description:
      'Youth Ignited presents its annual carol evening — a night of music, warmth, and joy to celebrate the birth of Christ.',
    date: '20 December 2025',
    time: '7:00 PM',
    location: 'St. Ignatius Church Hall',
    month: 'december',
    yearLabel: '2025-26',
    type: 'church',
    past: true,
  },
]
