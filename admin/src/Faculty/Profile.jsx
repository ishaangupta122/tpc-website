import { useState } from 'react';
import { useFaculty } from '../context/FacultyContext'; 
import { Trash2, Search, Plus, Edit2 } from 'lucide-react';

const FacultyProfile = () => {
  const { facultyList, fetchFaculty, addFaculty, updateFaculty, deleteFaculty } = useFaculty(); 

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    designation: '',
    department: '',
    experience: '',
    joinedDate: '',
    image: null,
    education: []
  });
  const [educationInput, setEducationInput] = useState('');
  const [selectvalue, setSelectedValue] = useState("")
  const departments = [
    'All',
    'Admin Staff',
    'Applied Science',
    'Computer Science Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Architectural Assistantship',
  ];

  const filteredFaculty = facultyList.filter((faculty) => {
    const matchesSearch =
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      !selectedDepartment ||
      selectedDepartment === 'All' ||
      faculty.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const updatenFaculty = (e) => {
	e.preventDefault();
	updateFaculty(selectvalue, formData)
	setIsEditOpen(false)
  }

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, educationInput],
    });
    setEducationInput('');
	fetchFaculty()
  };

  const addnFaculty = (e) => {
    e.preventDefault();
    const formDataCopy = { ...formData };
    addFaculty(formDataCopy);
    setIsEditOpen(false);
  };

  const handleEdit = (faculty) => {
    setFormData(faculty);
	setSelectedValue(faculty._id)
    setIsEditOpen(true);
  };

  const handleDelete = (id) => {
    deleteFaculty(id);
    fetchFaculty()
  };

  return (
    <section className="p-6 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Faculty Profiles</h1>
          <p className="text-neutral-500">Manage and view faculty information</p>
        </div>
        <button
          onClick={() => setIsEditOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors">
          <Plus className="w-5 h-5" />
          <span className="lg:block hidden">Add New Faculty</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60">
        <div className="relative flex-grow">
          <input
            type="search"
            placeholder="Search faculty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
          />
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-neutral-400" />
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500">
          <option value="">All Departments</option>
          {departments
            .filter((dept) => dept !== 'All')
            .map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
        </select>
      </div>

	  {filteredFaculty.length === 0 ? (
				<div className="bg-white p-6 rounded-lg border border-neutral-200/60 text-center text-neutral-600">
					No faculty members found matching your search.
				</div>
			) : (
				filteredFaculty.map((faculty) => (
					<div key={faculty._id} className="flex justify-center w-full">
						<div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-3xl">
							{/* Header Section */}
							<div className="bg-gradient-to-r from-[#de265d] to-[#98002E] text-white px-6 py-4">
								<div className="flex items-center gap-4">
									<img
										src={faculty.image}
										alt="Profile"
										className="w-20 h-20 rounded-full object-cover border-4 border-white"
										loading="lazy"
									/>

									<div className="flex-grow">
										<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
											<div className="mr-3">
												<h2 className="text-xl font-bold text-neutral-100">{faculty.name}</h2>
												<p className="text-neutral-100">{faculty.title}</p>
											</div>
											<div className="flex gap-3">
												{/* <button
													onClick={() => handleEdit(faculty._id)}
													className="flex items-center space-x-2 p-2 text-green-600 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
													<Edit2 className="w-4 h-4" />
												</button> */}
												<button
													onClick={() => handleDelete(faculty._id)}
													className="flex items-center space-x-2 p-2 rounded-lg text-red-600 bg-gray-100 hover:bg-gray-200 transition-colors">
													<Trash2 className="w-4 h-4" />
													{/* <span>Delete</span> */}
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Details Section */}
							<div className="flex xl:flex-nowrap flex-wrap items-start justify-between gap-6 py-8 px-10">
								<div className="text-sm space-y-2">
									<div className="flex gap-2 justify-start items-center">
										<h3 className=" text-gray-500 font-semibold">Email:</h3>
										<p className="text-gray-800 font-medium">{faculty.email}</p>
									</div>
									{/* Email */}
									{/* Phone */}
									<div className="flex gap-2 justify-start items-center">
										<h3 className=" text-gray-500  font-semibold">Phone:</h3>
										<p className="text-gray-800 font-medium">{faculty.phone}</p>
									</div>
									<div className="flex gap-2 justify-start items-center">
										<h3 className=" text-gray-500  font-semibold">Department:</h3>
										<p className="text-gray-800 font-medium">{faculty.department}</p>
									</div>
									{/* Designation */}
									<div className="flex gap-2 justify-start items-center">
										<h3 className=" text-gray-500  font-semibold">Designation:</h3>
										<p className="text-gray-800 font-medium">{faculty.designation}</p>
									</div>
									{/* Joined Date */}
									<div className="flex gap-2 justify-start items-center">
										<h3 className=" text-gray-500 font-semibold">Joined Date:</h3>
										<p className="text-gray-800  font-medium">{faculty.joinedDate}</p>
									</div>
									{/* Experience */}
									<div className="flex gap-2 justify-start items-center">
										<h3 className=" text-gray-500  font-semibold">Experience:</h3>
										<p className="text-gray-800 font-medium">{faculty.experience}</p>
									</div>
									{/* Education Section */}
								</div>
								<div className="text-sm">
									<h3 className=" text-gray-500 mb-2  font-semibold">Education:</h3>
									<ul className="space-y-1 list-disc list-inside">
										{faculty.education.map((edu, index) => (
											<li key={index} className="text-gray-800 font-medium ">
												{edu}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				))
			)}
      {/* Edit Dialog */}
      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-auto">
            <h2 className="text-2xl font-bold text-neutral-800 pl-6 pr-6 pt-6">
              Edit Faculty
            </h2>
            <form onSubmit={addnFaculty}>
              <div className="pl-6 pr-6 pb-6">
                <div className="mt-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter title"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className="mt-4">
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500">
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    placeholder="Enter designation"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Enter experience"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="date"
                    name="joinedDate"
                    value={formData.joinedDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-600 font-semibold">Upload Image</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-600">Education</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={educationInput}
                      onChange={(e) => setEducationInput(e.target.value)}
                      placeholder="Enter education"
                      className="px-4 py-2 border border-neutral-300 rounded-lg flex-grow focus:outline-none focus:border-green-500"
                    />
                    <button
                      type="button"
                      onClick={addEducation}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Add
                    </button>
                  </div>
                  <ul className="mt-2 space-y-2">
                    {formData.education.map((edu, index) => (
                      <li key={index} className="text-gray-800">
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
                <button
                  onClick={() => setIsEditOpen(false)}
                  type="button"
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default FacultyProfile;
