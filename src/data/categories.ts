import {
  HOME_COMMUNITY_MEDIA,
  HOME_CONFERENCES_MEDIA,
  HOME_EDUCATION_MEDIA,
  HOME_WORKFORCE_MEDIA,
} from './experienceMedia'

export type CategoryCard = {
  id: string
  image: string
  title: string
  description: string
}

export type Category = {
  id: string
  label: string
  title: string
  description: string
  cards: CategoryCard[]
}

/* Experience categories in this exact priority order: Education, Workforce, Community, Conferences */
export const CATEGORIES: Category[] = [
  {
    id: 'education',
    label: 'EDUCATION',
    title: 'EDU Engagement',
    description:
      'Designed to turn student energy into meaningful connections. These experiences help students explore, collaborate, and feel part of something bigger from their very first day on campus.',
    cards: [
      {
        id: 'edu-1',
        image: HOME_EDUCATION_MEDIA[0],
        title: 'Orientation Experiences',
        description:
          'Welcomes students through guided interaction that makes first days feel approachable and familiar.',
      },
      {
        id: 'edu-2',
        image: HOME_EDUCATION_MEDIA[1],
        title: 'Student Connection Experiences',
        description:
          'Helps students form natural connections and friendships early on.',
      },
      {
        id: 'edu-3',
        image: HOME_EDUCATION_MEDIA[2],
        title: 'Campus Discovery Experiences',
        description:
          'Encourages exploration of campus spaces through shared discovery.',
      },
    ],
  },
  {
    id: 'workforce',
    label: 'WORKFORCE',
    title: 'Workforce Experiences',
    description:
      "Designed to strengthen human connection at work. These experiences focus on conversation, collaboration, and shared understanding — helping people connect beyond roles, titles, and day-to-day tasks. Rather than play for play's sake, they are thoughtfully structured moments that support onboarding, team alignment, and a more connected workplace.",
    cards: [
      {
        id: 'wf-1',
        image: HOME_WORKFORCE_MEDIA[0],
        title: 'Onboarding Experiences',
        description:
          'Helps new employees settle in, understand their environment, and feel part of the team.',
      },
      {
        id: 'wf-2',
        image: HOME_WORKFORCE_MEDIA[1],
        title: 'Team Connection Experiences',
        description:
          'Brings teams together through shared moments that build trust and communication.',
      },
      {
        id: 'wf-3',
        image: HOME_WORKFORCE_MEDIA[2],
        title: 'Workplace Alignment Experiences',
        description:
          'Alignment doesn\'t come from meetings alone. We design moments that help teams connect around shared goals, values, and understanding beyond daily tasks.',
      },
    ],
  },
  {
    id: 'community',
    label: 'COMMUNITY',
    title: 'Community Experiences',
    description:
      'Designed to bring people together through shared moments. These experiences focus on participation, celebration, and togetherness — creating spaces where people feel comfortable showing up as themselves. From informal gatherings to larger social moments, each experience is shaped around connection rather than performance.',
    cards: [
      {
        id: 'comm-1',
        image: HOME_COMMUNITY_MEDIA[0],
        title: 'Community Gathering Experiences',
        description:
          'Creates relaxed spaces for people to connect naturally.',
      },
      {
        id: 'comm-2',
        image: HOME_COMMUNITY_MEDIA[1],
        title: 'Social & Cultural Experiences',
        description:
          'Celebrates culture, identity, and shared stories through interaction.',
      },
      {
        id: 'comm-3',
        image: HOME_COMMUNITY_MEDIA[2],
        title: 'Community Discovery Experiences',
        description:
          'Turns shared spaces into places of collective exploration and memory.',
      },
    ],
  },
  {
    id: 'conferences',
    label: 'CONFERENCES',
    title: 'Conference Experiences',
    description:
      'Designed to make large gatherings feel more human. These experiences help turn conferences, exhibitions, and brand events into spaces for interaction and participation. By encouraging movement, conversation, and discovery across the event environment, we help attendees connect beyond sessions, booths, and schedules.',
    cards: [
      {
        id: 'conf-1',
        image: HOME_CONFERENCES_MEDIA[0],
        title: 'Attendee Engagement Experiences',
        description:
          'Encourages interaction and connection beyond scheduled sessions.',
      },
      {
        id: 'conf-2',
        image: HOME_CONFERENCES_MEDIA[1],
        title: 'Exhibition Discovery Experiences',
        description:
          'Guides attendees through event spaces with purpose and curiosity.',
      },
      {
        id: 'conf-3',
        image: HOME_CONFERENCES_MEDIA[2],
        title: 'Brand Participation Experiences',
        description:
          'Creates interactive moments that invite participation, not observation.',
      },
    ],
  },
]
