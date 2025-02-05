// UpdatesService.js
const BASE_URL = 'http://localhost:3000/updates'; // Replace with your API URL

export const fetchUpdates = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch updates');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUpdate = async (update, imageFile) => {
  const formData = new FormData();
  Object.keys(update).forEach((key) => formData.append(key, update[key]));
  formData.append('image', imageFile);

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create update');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUpdate = async (id, updatedData, imageFile) => {
  const formData = new FormData();
  Object.keys(updatedData).forEach((key) => formData.append(key, updatedData[key]));
  if (imageFile) formData.append('image', imageFile);

  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update update');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUpdate = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete update');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
