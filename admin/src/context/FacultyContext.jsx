import { createContext, useState, useContext, useEffect } from 'react';

const FacultyContext = createContext();

export const useFaculty = () => {
  return useContext(FacultyContext);
};

export const FacultyProvider = ({ children }) => {
  const [facultyList, setFacultyList] = useState([]);

  // Fetch faculty data
  const fetchFaculty = async () => {
    try {
      const response = await fetch('http://localhost:3000/faculty');
      const data = await response.json();
      setFacultyList(data);
    } catch (error) {
      console.error('Failed to fetch faculty data:', error);
    }
  };

  const fetchFaculty2 = async (e) => {
    try{
      const response = await fetch(`http://localhost:3000/faculty/${e}`);
      const data = await response.json();
    //  setFacultyList(data);
    return data;
    }catch(error){
      console.error('Failed to fetch faculty data:', error);
    }
  }


  const addFaculty = async (newFaculty) => {
    try {
      const formData = new FormData();

      formData.append('name', newFaculty.name);
      formData.append('email', newFaculty.email);
      formData.append('phone', newFaculty.phone);
      formData.append('department', newFaculty.department);
      formData.append('designation', newFaculty.designation);
      formData.append('experience', newFaculty.experience);
      formData.append('joinedDate', newFaculty.joinedDate);
      formData.append('title', newFaculty.title);
      formData.append('education', newFaculty.education)
  
      // Append the image file
      if (newFaculty.image) {
        formData.append('image', newFaculty.image);
      }
   
      const response = await fetch('http://localhost:3000/faculty', {
        method: 'POST',
        body: formData, 
      });
  
      if (!response.ok) {
        throw new Error('Failed to add faculty');
      }
  
      const data = await response.json();
      setFacultyList((prevList) => [...prevList, data]);
    } catch (error) {
      console.error('Failed to add new faculty:', error);
    }
  };
  

  // Update faculty
  const updateFaculty = async (id, u) => {
    try {
      console.log(u.name)
      const formData = new FormData();
      formData.append('name', u.name);
      formData.append('email', u.email);
      formData.append('phone', u.phone);
      formData.append('department', u.department);
      formData.append('designation', u.designation);
      formData.append('experience', u.experience);
      formData.append('joinedDate', u.joinedDate);
      formData.append('title', u.title)

      const response = await fetch(`http://localhost:3000/faculty/${id}`, {
        method: 'PUT',
        body:  formData,
      });
      console.log(response);
      const data = await response.json();
      fetchFaculty();
    } catch (error) {
      console.error('Failed to update faculty:', error);
    }
  };

  // Delete faculty
  const deleteFaculty = async (id) => {
    try {
      await fetch(`http://localhost:3000/faculty/${id}`, {
        method: 'DELETE',
      });
      setFacultyList((prevList) => prevList.filter((faculty) => faculty.id !== id));
    } catch (error) {
      console.error('Failed to delete faculty:', error);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  return (
    <FacultyContext.Provider
      value={{ facultyList, addFaculty, updateFaculty, deleteFaculty, setFacultyList, fetchFaculty2, fetchFaculty }}
    >
      {children}
    </FacultyContext.Provider>
  );
};
