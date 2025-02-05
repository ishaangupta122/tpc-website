import { Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useFaculty } from '../context/FacultyContext';

const FacultyManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false); // New state for dialog
  const { facultyList, addFaculty, deleteFaculty, setFacultyList , updateFaculty, fetchFaculty2} = useFaculty();
  const[isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    experience: "",
    joinedDate: "",
    image: null, 
	education: []
  });


  const [educationInput, setEducationInput] = useState("");
  const [selectvalue, setSelectedValue] = useState("")
  const [formData2, setFormData2] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    experience: "",
    joinedDate: "",
    image: null, 
	education: []
  });

  const addEducation = () => {
    if (educationInput.trim() !== "") {
      setFormData((prevState) => ({
        ...prevState,
        education: [...prevState.education, educationInput],
      }));
	  console.log(formData.education)
      setEducationInput("");
    }
  };

  const deleteEducation = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      education: prevState.education.filter((_, i) => i !== index),
    }));
  };

  const handleEdit = async(e) => {
	try {
		console.log(e)
		const response = await fetchFaculty2(e);
		setFormData2(response)
		setIsEditOpen(true)
		setSelectedValue(e)
	}catch(error){
		console.log(error);
	}
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
	console.log(value)
    setFormData2({
      ...formData2,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleFileChange2 = (e) => {
    setFormData({
      ...formData2,
      image: e.target.files[0],
    });
	//console.log(formData)
  };

  const filteredFaculty = facultyList.filter(
    (faculty) =>
      (faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedDepartment === '' || faculty.department === selectedDepartment),
  );

  const handleDelete = async (id) => {
    try {
      await deleteFaculty(id); // Call the delete API from the context
      // Update state to filter out the deleted faculty
      setFacultyList(prevList => prevList.filter(faculty => faculty._id !== id));
    } catch (error) {
      console.error('Error deleting faculty:', error);
    }
  };

  const handleAddNewFaculty = () => {
    setIsDialogOpen(true); // Open dialog
  };

  const addnFaculty = (e) => {
    e.preventDefault();
    //console.log("Form Data Submitted:", formData);
	setFormData(
		{
			name: "",
			title: "",
			email: "",
			phone: "",
			department: "",
			designation: "",
			experience: "",
			joinedDate: "",
			image: null, 
			education: [],
		}
	)
	addFaculty(formData);
    setIsDialogOpen(false);
  };

  const updatenFaculty = (e) => {
	e.preventDefault();
	console.log(formData2)
	updateFaculty(selectvalue, formData2)
	setIsEditOpen(false)
  }

  return (
    <section id="faculty-management" className="p-6 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Faculty Management</h1>
          <p className="text-neutral-500">Manage and organize faculty members</p>
        </div>
        <button 
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
          onClick={handleAddNewFaculty}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span className="lg:block hidden">Add New Faculty</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60">
        <div className="relative flex-grow">
          <input
            type="search"
            placeholder="Search faculty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-2.5 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500">
          <option value="">All Departments</option>
          <option value="Admin Staff">Admin Staff</option>
          <option value="Applied Science">Applied Science</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Architechtural Assitantship">Architechtural Assitantship</option>
        </select>
      </div>

      {filteredFaculty.length === 0 ? (
        <div className="bg-white p-6 rounded-lg border border-neutral-200/60 text-center text-neutral-600">
          No updates found matching your search.
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-neutral-300 overflow-hidden">
          <div className="overflow-x-auto mx-4 my-4 pb-4">
            <table className="min-w-full divide-y divide-neutral-300">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider">
                    Faculty Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider">
                    Designation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-300">
                {filteredFaculty.map((faculty) => (
                  <tr key={faculty.id} className="hover:bg-neutral-50 font-medium">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={faculty.img}
                          alt={faculty.name}
                          onError={(e) => {
                            e.target.src = 'https://cdn-icons-png.flaticon.com/512/3001/3001758.png';
                          }}
                          loading="lazy"
                        />
                        <div className="ml-4 mr-2">
                          <div className="text-sm font-medium text-neutral-900">{faculty.name}</div>
                          <div className="text-sm text-neutral-500">{faculty.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{faculty.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{faculty.designation}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{faculty.experience}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button className="text-green-600 hover:text-green-900 bg-green-100 p-2 rounded-lg" onClick={() => handleEdit(faculty._id)}>
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 bg-red-100 p-2 rounded-lg"
                          onClick={() => handleDelete(faculty._id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-auto">
            <h2 className="text-2xl font-bold text-neutral-800 pl-6 pr-6 pt-6">
              Add New Faculty
            </h2>
            <form onSubmit={addnFaculty}>
              <div className="pl-6 pr-6 pb-6">
                {/* Basic Fields */}
                <div className="mt-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter title here"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
				<div className="mt-4">
                  <input
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    placeholder="Enter designation"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  ></input>
                </div>
                <div className="mt-4">
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select department</option>
                    <option value="Admin Staff">Admin Staff</option>
                    <option value="Applied Science">Applied Science</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electrical Engineering">
                      Electrical Engineering
                    </option>
                    <option value="Mechanical Engineering">
                      Mechanical Engineering
                    </option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Architectural Assistantship">
                      Architectural Assistantship
                    </option>
                  </select>
                </div>
                <div className="mt-4">
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Enter experience details"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>
                <div className="mt-4">
                  <input
                    type="date"
                    name="joinedDate"
                    value={formData.joinedDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Education Section */}
                <div className="mt-4">
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      value={educationInput}
                      onChange={(e) => setEducationInput(e.target.value)}
                      placeholder="Add education (e.g., B.Sc in Computer Science)"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={addEducation}
                      className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-4 space-y-2">
                    {formData.education.map((edu, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow"
                      >
                        <span>{edu}</span>
                        <button
                          type="button"
                          onClick={() => deleteEducation(index)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}


{isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-auto">
            <h2 className="text-2xl font-bold text-neutral-800 pl-6 pr-6 pt-6">
              Edit Faculty
            </h2>
            <form onSubmit={updatenFaculty}>
              <div className="pl-6 pr-6 pb-6">
                <div className="mt-3">
                  <input
                    type="text"
                    name="name"
                    value={formData2.name}
                    onChange={handleInputChange2}
                    placeholder="Enter full name"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    name="title"
                    value={formData2.title}
                    onChange={handleInputChange2}
                    placeholder="Enter title here"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="email"
                    name="email"
                    value={formData2.email}
                    onChange={handleInputChange2}
                    placeholder="Enter email address"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    name="phone"
                    value={formData2.phone}
                    onChange={handleInputChange2}
                    placeholder="Enter phone number"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <select
                    name="department"
                    value={formData2.department}
                    onChange={handleInputChange2}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select department</option>
                    <option value="Admin Staff">Admin Staff</option>
                    <option value="Applied Science">Applied Science</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electrical Engineering">
                      Electrical Engineering
                    </option>
                    <option value="Mechanical Engineering">
                      Mechanical Engineering
                    </option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Architectural Assistantship">
                      Architectural Assistantship
                    </option>
                  </select>
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    name="designation"
                    value={formData2.designation}
                    onChange={handleInputChange2}
                    placeholder="Enter designation"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                 <div className="mt-4">
                  <textarea
                    name="experience"
                    value={formData2.experience}
                    onChange={handleInputChange2}
                    placeholder="Enter experience details"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div> 
                <div className="mt-4">
                  <input
                    type="date"
                    name="joinedDate"
                    value={formData2.joinedDate}
                    onChange={handleInputChange2}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange2}
                    accept="image/*"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};

export default FacultyManagement;
