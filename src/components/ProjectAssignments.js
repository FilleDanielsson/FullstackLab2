import React, { useState, useEffect } from 'react';

const ProjectAssignments = () => {
  const [projectAssignments, setProjectAssignments] = useState([]);

  useEffect(() => {
    fetchProjectAssignments();
    const intervalId = setInterval(fetchProjectAssignments, 60000); // Fetch data every minute

    return () => clearInterval(intervalId);
  }, []);

  const fetchProjectAssignments = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/project_assignments');
      const data = await response.json();
      const projectAssignmentsDetails = await Promise.all(data.map(async (assignment) => {
        const resEmployee = await fetch(`http://localhost:3000/api/employees/${assignment.employee_id}`);
        const dataEmployee = await resEmployee.json();

        const resProject = await fetch(`http://localhost:3000/api/projects/${assignment.project_code}`);
        const dataProject = await resProject.json();

        return {
          ...assignment,
          employee_name: dataEmployee.full_name,
          project_name: dataProject.project_name 
        };
      }));
      setProjectAssignments(projectAssignmentsDetails.slice(0, 5)); // Get latest 5 project assignments with names
    } catch (error) {
      console.error('Error fetching project assignments:', error);
    }
  };

  return (
    <div>
      <h1>Recent Project</h1>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Project Name</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {projectAssignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>{assignment.employee_id}</td>
              <td>{assignment.employee_name}</td>
              <td>{assignment.project_name}</td>
              <td>{assignment.start_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectAssignments;
