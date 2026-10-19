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
    "The department aims at providing quality technical education for producing professionally sound and morally strong diploma engineers in Civil Engineering, with knowledge and skills suited to the real world. The three-year Diploma in Civil Engineering is affiliated to the Punjab State Board of Technical Education and Industrial Training, Chandigarh, with an approved intake of 60 seats.",
    "It has well-equipped labs for Applied Mechanics, Building Construction, Construction Material, Surveying and Concrete Technology, along with a fully developed Project Lab. The Highway Engineering, Fluid Mechanics and Structure labs of Thapar University are also used for practicals, so students work with instruments and test setups that go beyond the basic syllabus.",
    "The course covers building construction, surveying, estimation and costing, structural mechanics, highway engineering and water supply, and prepares diploma engineers for supervisory work with government departments, construction companies and consultants. Graduates may also continue to a degree through lateral entry, and the faculty of the department makes continuous efforts to improve the quality of learning.",
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
    "The Department of Mechanical Engineering offers a three-year course leading to the Diploma in Mechanical Engineering, affiliated to the Punjab State Board of Technical Education and Industrial Training, Chandigarh. The approved intake is 60 seats, filled through the online admissions of the state board.",
    "The department has two fully fledged laboratories, Lab No. 107 and Lab No. 401, as per AICTE space requirements. It has a well-equipped Applied Mechanics Laboratory, a CNC trainer and a Mechanical Project Shop. The Project Shop has adequate facilities for projects involving fabrication processes and machining operations, and metrological instruments for holding, locating and measuring work-pieces are also available.",
    "The course combines classroom teaching in subjects such as thermodynamics, strength of materials, manufacturing processes, fluid mechanics and machine drawing with regular practical work in the laboratories and workshops. Students are prepared for jobs in manufacturing, maintenance and production, and for higher studies through lateral entry to degree programmes.",
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
    "The Electrical Engineering department was started at the time of the establishment of Thapar Polytechnic College in 1956, and has run the three-year Diploma in Electrical Engineering since then. The diploma is affiliated to the Punjab State Board of Technical Education and Industrial Training, Chandigarh, with an approved intake of 60 seats. Many of its alumni work in the public and private sectors.",
    "The laboratories are fully equipped with relevant instruments and machines for practical exposure, so that students see the working of electrical circuits, machines and control equipment first-hand rather than only on paper. Practicals are held every week alongside the theory classes.",
    "The syllabus covers electrical circuits, electrical machines, power systems, electrical installation and estimation, and control and measurement. Recent graduates have received campus placements, and many go on to higher education through lateral entry to degree programmes.",
  ],
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
    "The Department of Applied Sciences provides knowledge in the areas of physics, chemistry, mathematics and communication skills, taught by qualified and dedicated faculty. These subjects form the foundation for the technical subjects that students study in every engineering branch of the college.",
    "Its well-equipped laboratories give students practical training alongside the theory. Students learn to carry out experiments in physics and chemistry, record observations carefully and draw conclusions from them, which builds the habits they need in the laboratories of their own branch.",
    "Mathematics sharpens analytical and problem-solving skills, while the communication skills classes help students to write, speak and present with confidence, in English and in the workplace. The department also guides students in settling into college life and in building steady study habits from the start of their diploma.",
  ],
};

// `category` must match the category stored with achievements in the backend.
const base = { heroImage: "/rec_gate.jpg" };

export const departments = {
  cse: { ...base, about: cseAbout, hod: cseHod, name: "Computer Science & Engineering", category: "CSE", basePath: "/cse", hodMessage: ["Welcome to the Department of Computer Science & Engineering. Computing now sits at the heart of almost every industry, and our aim is to give every student a strong base in programming, networking and hardware, along with the habit of learning new tools on their own.", "Our students work in well-equipped laboratories every week, and we encourage them to build projects, take part in contests and prepare early for jobs and higher studies. The faculty guides each batch closely, and the lab assistants are always available for technical help.", "I invite you to explore the department, and I wish every student a successful and rewarding journey with us."] },
  mechanical: { ...base, ...mechanical, name: "Mechanical Engineering", category: "Mechanical", basePath: "/mechanical", hodMessage: ["Welcome to the Department of Mechanical Engineering. Manufacturing and design depend on engineers who can both understand the theory and work confidently on the shop floor, and that is the balance we try to build in every student.", "Through practical work in the laboratories, the CNC trainer and the Project Shop, our students learn to design, fabricate and measure. We ask every student to take their projects seriously, to work safely and to ask questions freely.", "I encourage each of you to make full use of the facilities of the department, and I wish you every success in your studies and your career."] },
  civil: { ...base, ...civil, name: "Civil Engineering", category: "Civil", basePath: "/civil", hodMessage: ["Welcome to the Department of Civil Engineering. Roads, buildings, bridges and water systems shape how a community lives, and our diploma engineers play a real part in building them with care and responsibility.", "We combine classroom teaching with laboratory work, surveying practice and project work so that students learn to apply what they study. Accuracy, honesty in measurement and respect for safety are values we ask of every student from the first semester.", "I welcome you to the department, and I hope you will take pride in the profession you are preparing for."] },
  electrical: { ...base, ...electrical, name: "Electrical Engineering", category: "Electrical", basePath: "/electrical", hodMessage: ["Welcome to the Department of Electrical Engineering. Since the college began in 1956, this department has trained diploma engineers who now work in power, industry and maintenance across the region.", "Our laboratories give students hands-on experience with machines, instruments and control systems. We ask every student to work with discipline, to follow safety rules at all times and to keep learning as technology changes.", "I encourage you to work with curiosity and care, and I wish you success in your studies and beyond."] },
  architectural: { ...base, ...architectural, name: "Architectural Assistantship", shortName: "Architectural", category: "Architectural", basePath: "/architectural", hodMessage: ["Welcome to the Department of Architectural Assistantship. Good design begins with careful observation, and this course helps students turn ideas into clear drawings and well-planned spaces.", "Through studio work, drawing, AutoCAD and a study of materials and construction, students learn to prepare complete working drawings and to understand how buildings respond to climate and to the people who use them. Regular practice and attention to detail matter as much as creativity.", "I invite you to be creative, to work steadily and to make the most of your time in the department."] },
  appliedScience: { ...base, ...appliedScience, name: "Applied Science", category: "Applied Science", basePath: "/applied-science", hodMessage: ["Welcome to the Department of Applied Science. Physics, chemistry, mathematics and communication skills are the foundation on which every engineering branch is built, and we take care to teach them well.", "Our laboratories and classrooms help students understand how the sciences apply to real problems, and the communication classes help them to express their ideas clearly. Strong basics built early make the technical subjects of later semesters much easier.", "I encourage every student to build those basics here, and I wish you a rewarding start to your diploma."] },
};
