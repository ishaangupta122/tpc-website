const API_URL = 'http://localhost:3000/placements'; 
export async function createPlacement(placementData) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(placementData),
    });
    const data = await response.json();
    console.log('Placement Created:', data);
  } catch (error) {
    console.error('Error creating placement:', error);
  }
}

// Function to get all placements
export async function getAllPlacements() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log('All Placements:', data);
  } catch (error) {
    console.error('Error fetching placements:', error);
  }
}

// Function to get a single placement by ID
export async function getPlacementById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    console.log('Placement:', data);
  } catch (error) {
    console.error('Error fetching placement:', error);
  }
}

// Function to update a placement
export async function updatePlacement(id, placementData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(placementData),
    });
    const data = await response.json();
    console.log('Placement Updated:', data);
  } catch (error) {
    console.error('Error updating placement:', error);
  }
}

// Function to delete a placement
export async function deletePlacement(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log('Placement Deleted:', data);
  } catch (error) {
    console.error('Error deleting placement:', error);
  }
}

// Function to add a department to a placement
export async function addDepartmentToPlacement(id, departmentData) {
  try {
    const response = await fetch(`${API_URL}/${id}/departments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(departmentData),
    });
    const data = await response.json();
    console.log('Department Added:', data);
  } catch (error) {
    console.error('Error adding department:', error);
  }
}

// Function to update a department in a placement
export async function updateDepartmentInPlacement(id, departmentId, departmentData) {
  try {
    const response = await fetch(`${API_URL}/${id}/departments/${departmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(departmentData),
    });
    const data = await response.json();
    console.log('Department Updated:', data);
  } catch (error) {
    console.error('Error updating department:', error);
  }
}

// Function to remove a department from a placement
export async function removeDepartmentFromPlacement(id, departmentId) {
  try {
    const response = await fetch(`${API_URL}/${id}/departments/${departmentId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log('Department Removed:', data);
  } catch (error) {
    console.error('Error removing department:', error);
  }
}
