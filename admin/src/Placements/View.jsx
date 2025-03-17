import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

const Placements = () => {
  const [placements, setPlacements] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPlacement, setNewPlacement] = useState({
    year: "",
    departments: [
      {
        department: "",
        approvedIntake: "",
        companiesVisited: "",
        studentsPlaced: "",
        avgPackage: "",
      },
    ],
  });

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = () => {
    fetch("http://localhost:3000/placements")
      .then((res) => res.json())
      .then((data) => setPlacements(data))
      .catch((error) => console.error("Error fetching placements:", error));
  };

  const handleAddPlacement = () => {
    if (!newPlacement.year || !newPlacement.departments[0].department) return;

    fetch("http://localhost:3000/placements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlacement),
    })
      .then((res) => res.json())
      .then((data) => {
        setPlacements([...placements, data]);
        setNewPlacement({
          year: "",
          departments: [
            {
              department: "",
              approvedIntake: "",
              companiesVisited: "",
              studentsPlaced: "",
              avgPackage: "",
            },
          ],
        });
        setIsDialogOpen(false);
      })
      .catch((error) => console.error("Error adding placement:", error));
    // fetchPlacements()
    //console.log('TY')
    window.location.reload();
  };

  const handleDeletePlacement = (id) => {
    fetch(`http://localhost:3000/placements/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPlacements(placements.filter((placement) => placement._id !== id));
      })
      .catch((error) => console.error("Error deleting placement:", error));
  };

  return (
    <section className='p-6 space-y-6 max-w-7xl mx-auto'>
      <div className='bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden p-4 flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-neutral-800'>
            Placements Tracker
          </h1>
          <p className='text-neutral-500'>
            Monitor and manage student placements
          </p>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className='bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition'>
          <Plus className='w-5 h-5' />
          <span>Add Placement</span>
        </button>
      </div>

      {placements.length === 0 ? (
        <div className='bg-white p-6 rounded-lg border border-neutral-200 text-center text-neutral-600'>
          No Placements Found.
        </div>
      ) : (
        placements.map((placement) => (
          <div
            key={placement._id}
            className='bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-lg font-semibold text-neutral-800 '>
                {placement.year} Placements
              </h2>
              <button
                onClick={() => handleDeletePlacement(placement._id)}
                className='text-red-600 hover:text-red-900 bg-red-100 p-2 rounded-lg'>
                <Trash2 className='w-4 h-4' />
              </button>
            </div>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-neutral-200'>
                <thead className='bg-gray-100'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-700'>
                      Department
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-700'>
                      Approved Intake
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-700'>
                      Companies Visited
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-700'>
                      Students Placed
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-700'>
                      Avg Package
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-700'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {placement.departments.map((department, index) => (
                    <tr key={index} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 text-sm text-gray-900'>
                        {department.department}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-900'>
                        {department.approvedIntake}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-900'>
                        {department.companiesVisited}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-900'>
                        {department.studentsPlaced}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-900'>
                        ₹ {department.avgPackage} LPA
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-900 flex space-x-3'>
                        {/* <button className="text-green-600 hover:text-green-900 bg-green-100 p-2 rounded-lg">
                          <Edit2 className="w-4 h-4" />
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      {/* Add Placement Dialog */}
      {isDialogOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4'>
          <div className='bg-white p-6 rounded-lg w-full max-w-md'>
            <h2 className='text-lg font-semibold mb-4'>Add Placement</h2>
            <input
              type='text'
              placeholder='Year'
              value={newPlacement.year}
              onChange={(e) =>
                setNewPlacement({ ...newPlacement, year: e.target.value })
              }
              className='w-full mb-2 p-2 border rounded'
            />
            <input
              type='text'
              placeholder='Department'
              value={newPlacement.departments[0].department}
              onChange={(e) =>
                setNewPlacement({
                  ...newPlacement,
                  departments: [
                    {
                      ...newPlacement.departments[0],
                      department: e.target.value,
                    },
                  ],
                })
              }
              className='w-full mb-2 p-2 border rounded'
            />
            <input
              type='number'
              placeholder='Approved Intake'
              value={newPlacement.departments[0].approvedIntake}
              onChange={(e) =>
                setNewPlacement({
                  ...newPlacement,
                  departments: [
                    {
                      ...newPlacement.departments[0],
                      approvedIntake: e.target.value,
                    },
                  ],
                })
              }
              className='w-full mb-2 p-2 border rounded'
            />
            <input
              type='number'
              placeholder='Companies Visited'
              value={newPlacement.departments[0].companiesVisited}
              onChange={(e) =>
                setNewPlacement({
                  ...newPlacement,
                  departments: [
                    {
                      ...newPlacement.departments[0],
                      companiesVisited: e.target.value,
                    },
                  ],
                })
              }
              className='w-full mb-2 p-2 border rounded'
            />
            <input
              type='number'
              placeholder='Students Placed'
              value={newPlacement.departments[0].studentsPlaced}
              onChange={(e) =>
                setNewPlacement({
                  ...newPlacement,
                  departments: [
                    {
                      ...newPlacement.departments[0],
                      studentsPlaced: e.target.value,
                    },
                  ],
                })
              }
              className='w-full mb-2 p-2 border rounded'
            />
            <input
              type='number'
              placeholder='Avg Package'
              value={newPlacement.departments[0].avgPackage}
              onChange={(e) =>
                setNewPlacement({
                  ...newPlacement,
                  departments: [
                    {
                      ...newPlacement.departments[0],
                      avgPackage: e.target.value,
                    },
                  ],
                })
              }
              className='w-full mb-4 p-2 border rounded'
            />
            <div className='flex justify-end space-x-3'>
              <button
                onClick={() => setIsDialogOpen(false)}
                className='px-4 py-2 bg-gray-300 rounded'>
                Cancel
              </button>
              <button
                onClick={handleAddPlacement}
                className='px-4 py-2 bg-green-600 text-white rounded'>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Placements;
