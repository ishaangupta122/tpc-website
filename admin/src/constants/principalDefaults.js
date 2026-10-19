// Starting content for a new Principal page (copied from the website's built-in
// text), so the admin can edit it instead of writing everything from scratch.
const highlights = [
  {
    _id: 1,
    title: "Infrastructure Development",
    points: [
      "Maintaining quality infrastructure with fully equipped workshops and labs",
      "Excellent sports facilities and modern classrooms in green surroundings",
    ],
  },
  {
    _id: 2,
    title: "Academic Excellence",
    points: [
      "Offering Diploma in seven branches of Engineering since 1956",
      "Co-located with renowned Thapar University in a lush green campus",
    ],
  },
  {
    _id: 3,
    title: "Student Development",
    points: [
      "Focus on industry-oriented engineering knowledge and scientific skills",
      "Strong emphasis on English communication and problem-solving techniques",
    ],
  },
  {
    _id: 4,
    title: "Career Pathways",
    points: [
      "Supporting progression to undergraduate engineering studies",
      "Facilitating industry placements for diploma graduates",
    ],
  },
];

const paragraphs = [
    "India today is an emerging economic power. Since the economic liberalization, industry has seen significant growth and the country has successfully leveraged its engineering skills to build a formidable manufacturing sector. The continued improvement in industrial infrastructure coupled with favourable policies and thrust from the Government are expected to help sustain the growth momentum in manufacturing.",
    "Diploma engineers with practical and skills-oriented training along with supervisory skills have a major role to ensure quality and volume of production in manufacturing sector. Thapar Polytechnic College Patiala is one of the oldest and most reputed Polytechnics of Punjab imparting technical education upto Diploma in seven branches of Engineering.",
    "Established since 1956 and co-located with the renowned Thapar University in a lush green campus, the College offers a very conducive environment for learning and overall growth. We aim to provide students with industry or job related engineering knowledge, scientific skills, sound knowledge of English to communicate in the field and ability to apply problem solving techniques.",
    "We have quality infrastructure with fully equipped workshops, labs, library, excellent sports facilities, class rooms and hostels in green and clean surroundings providing a healthy academic environment both for students and faculty. Our well qualified and dedicated faculty is focused on imparting high quality education and mentoring for the students for them to become successful technocrats and worthy citizens of our country.",
    "I am looking forward for a purposeful participation and whole hearted co-operation from students and teachers in building this institution stronger.",
  ];

export const PRINCIPAL_DEFAULTS = {
  name: "Dr. Ankush Kansal",
  message: paragraphs.join("\n\n"),
  highlights: highlights.map(({ title, points }) => ({ title, points })),
};
