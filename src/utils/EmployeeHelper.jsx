import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "100px"

    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "90px"


    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "120px"


    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "130px"

    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: "true"

    },
]

export const fetchDepartments = async () => {
    let departments
    try {
        const response = await axios.get('http://localhost:5000/api/department', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }

        })
        if (response.data.success) {
            departments = response.data.departments
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }

    }
    return departments

};

//employees for Salary form

export const getEmployees = async (id) => {
    let employees
    try {
        const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })

        if (response.data.success) {
            employees = response.data.employees
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }

    }
    return employees

};

export const EmployeeButtons = ({ _id }) => {
    const navigate = useNavigate()

    return (
        <div className="flex space-x-3">
            <button className="px-4 py-1 bg-gray-700 text-white"
                onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
            >view</button>
            <button className="px-4 py-1 bg-blue-500 text-white"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}

            >Edit</button>
            <button className="px-4 py-1 bg-teal-500 text-white"
                onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}

            >Salary</button>
            <button className="px-4 py-1 bg-red-500 text-white"
             onClick={() => navigate(`/admin-dashboard/employees/leaves/${_id}`)}>Leave</button>
        </div>
    )
}