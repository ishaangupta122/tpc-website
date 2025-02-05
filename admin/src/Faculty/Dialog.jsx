import { useState } from 'react';

const Dialog = ({ faculty, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(faculty || {
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    joinedDate: '',
    experience: '',
    education: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{faculty ? 'Edit Faculty' : 'Add Faculty'}</h2>
        <form>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full p-2 border border-gray-300 rounded mb-4" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 border border-gray-300 rounded mb-4" />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required className="w-full p-2 border border-gray-300 rounded mb-4" />
          <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" required className="w-full p-2 border border-gray-300 rounded mb-4" />
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="Designation" required className="w-full p-2 border border-gray-300 rounded mb-4" />
          <input type="date" name="joinedDate" value={formData.joinedDate} onChange={handleChange} placeholder="Joined Date" required className="w-full p-2 border border-gray-300 rounded mb-4" />
          <input type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience" required className="w-full p-2 border border-gray-300 rounded mb-4" />
          <textarea name="education" value={formData.education} onChange={handleChange} placeholder="Education" className="w-full p-2 border border-gray-300 rounded mb-4"></textarea>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
              Cancel
            </button>
            <button type="button" onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dialog;
