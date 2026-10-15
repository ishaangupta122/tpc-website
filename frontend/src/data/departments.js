import { mockElectricalAchievements } from "./mockData";

// Content for the department pages.
//
// Content taken from tpc.ac.in.


const cseAbout = [
  "The diploma program in Computer Science Engg is designed to educate students with a broad intellectual base, well-developed interpersonal skills, analytical and problem-solving skills and a mastery of the appropriate elements of the discipline of Computer Science.",
  "The department has 120 seats, filled every year through the online admissions of the state board, and 24 seats for LEET students who are directly admitted to the 3rd semester. The course equips students with practical and theoretical knowledge of computer software and hardware and prepares them for higher studies.",
  "Students use the labs according to their timetables, and practicals are held every week. The labs have hardware, software and lab manuals, along with ventilation, uninterrupted power, lighting and internet access, and a lab assistant is available for technical support.",
];


const cseHod = {
  name: "Mrs. Shashi Bala",
  designation: "Head of Department",
  image: "/default_user_img.jpeg",
  bio: "Mrs. Shashi Bala heads the Computer Science Engineering department and also serves as the college's Training and Placement Officer. She holds an M.Tech in Computer Science and Engineering and has over 16 years of teaching experience.",
};

const civil = {
  hod: {
    name: "Vipin Kumar Gupta",
    designation: "Head of Department",
    image: "/default_user_img.jpeg",
    bio: "Vipin Kumar Gupta leads the Civil Engineering department. He holds an M.E. in Structures and an LL.B, and brings 31 years of experience to the department.",
  },
  about: [
    "The department aims at providing quality technical education for producing professionally sound and morally strong diploma engineers in Civil Engineering, with knowledge and skills suited to the real world.",
    "It has well-equipped labs for Applied Mechanics, Building Construction, Construction Material, Surveying and Concrete Technology, along with a fully developed Project Lab. The Highway Engineering, Fluid Mechanics and Structure labs of Thapar University are also used for practicals.",
    "The faculty of the department makes continuous efforts to improve the quality of learning.",
  ],
};

const mechanical = {
  hod: {
    name: "Punjab Rai",
    designation: "Incharge, Mechanical Engineering",
    image: "/default_user_img.jpeg",
    bio: "Punjab Rai is the Incharge of the Mechanical Engineering department. He holds an AMIME (Mechanical) qualification and has 28 years of teaching experience along with 6.5 years in industry.",
  },
  about: [
    "The Department of Mechanical Engineering offers a three-year course leading to the Diploma in Mechanical Engineering.",
    "The department has two fully fledged laboratories, Lab No. 107 and Lab No. 401, as per AICTE space requirements. It has a well-equipped Applied Mechanics Laboratory, a CNC trainer and a Mechanical Project Shop.",
    "The Project Shop has adequate facilities for projects involving fabrication processes and machining operations, and metrological instruments for holding, locating and measuring work-pieces are also available.",
  ],
};

const electrical = {
  hod: {
    name: "Dr. Anurag Joshi",
    designation: "Head of Department",
    image: "/default_user_img.jpeg",
    bio: "Dr. Anurag Joshi heads the Electrical Engineering department. He holds an M.E. in Electrical Engineering and an MHRM, and has 22 years of experience. He has received the Best Polytechnic Teacher Award from ISTE, New Delhi, and a Leadership Award for Excellence from CEE.",
  },
  about: [
    "The Electrical Engineering department was started at the time of the establishment of Thapar Polytechnic College in 1956, and has run the three-year Diploma in Electrical Engineering since then. Many of its alumni work in the public and private sectors.",
    "The laboratories are fully equipped with relevant instruments and machines for practical exposure. Recent graduates have received campus placements, and many go on to higher education.",
  ],
  achievements: mockElectricalAchievements,
};

const architectural = {
  hod: {
    name: "Sangeeta Goyal",
    designation: "Head of Department",
    image: "/default_user_img.jpeg",
    bio: "Sangeeta Goyal heads the Architectural Assistantship department. She holds a B.Arch and an M.Sc (IT), and has 31 years of experience.",
  },
  about: [
    "The Diploma in Architectural Assistantship is a three-year, job-oriented course in building design, urban planning and construction management. It suits students with artistic talent and creative thinking.",
    "Students develop critical and analytical skills for the built environment, learn to visualise and organise interior and exterior spaces, and study building materials and their behaviour under varied climatic conditions. They are introduced to green building design and to building services such as water supply, waste water disposal, firefighting and sound insulation.",
    "Through two- and three-dimensional designs and compositions, graphic representation and AutoCAD, students learn to prepare complete working drawings. They also learn to assist in preparing master plans and layouts of urban development schemes, follow local body norms and national building codes, prepare building estimates, and develop landscape design skills.",
  ],
};

const appliedScience = {
  hod: {
    name: "Dr. Ritu Jindal",
    designation: "Head of Department",
    image: "/default_user_img.jpeg",
    bio: "Dr. Ritu Jindal heads the Applied Science department, which covers physics, chemistry, mathematics and communication skills. She holds a Ph.D. and has over 24 years of teaching experience.",
  },
  about: [
    "The Department of Applied Sciences provides knowledge in the areas of physics, chemistry, mathematics and communication skills, taught by qualified and dedicated faculty.",
    "Its well-equipped laboratories give students practical training alongside the theory.",
  ],
};

// `category` must match the category stored with achievements in the backend.
const base = { heroImage: "/rec_gate.jpg" };

export const departments = {
  cse: { ...base, about: cseAbout, hod: cseHod, name: "Computer Science & Engineering", category: "CSE", basePath: "/cse" },
  mechanical: { ...base, ...mechanical, name: "Mechanical Engineering", category: "Mechanical", basePath: "/mechanical" },
  civil: { ...base, ...civil, name: "Civil Engineering", category: "Civil", basePath: "/civil" },
  electrical: { ...base, ...electrical, name: "Electrical Engineering", category: "Electrical", basePath: "/electrical" },
  architectural: { ...base, ...architectural, name: "Architecture", category: "Architectural", basePath: "/architectural" },
  appliedScience: { ...base, ...appliedScience, name: "Applied Science", category: "Applied Science", basePath: "/applied-science" },
};
