import axios from 'axios'
import  {  useState } from 'react'
import React, { useEffect } from 'react'

const AttendanceReport = () => {
  const [report, setReport] = useState({})
  const [limit, setLimit] = useState(5)
  const [skip, setSkip] = useState(0)
  const [dateFilter, setDateFilter] = useState()
  const [loading, setLoading] = useState(false)

  const fetchReport = async () => {
    try {
      setLoading(true)
      const query = new URLSearchParams({ limit, skip })
      if (dateFilter) {
        query.append('date', dateFilter)
      }
      const response = await axios.get(`https://employeems-api.onrender.com/api/attendance/report?${query.toString()}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },

      })
      if (response.data.success) {
        if (skip == 0) {
          setReport(response.data.groupData)
        } else {
          setReport((prevData) => ({ ...prevData, ...response.data.groupData }))
        }

      }
      setLoading(false)

    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    fetchReport();

  }, [skip, dateFilter])

  const handleLoadmore = () => {
    setSkip((prevSkip) => prevSkip + limit)
  }
  return (
    <div className="min-h-screen p-10 bg-white">
      <h2 className="text-center text 2xl font-bold">Attendance Report</h2>
      <div>
        <h2 className="text-xl font-semibold">Filter By Date</h2>
        <input type="date" className="border bg-gray-100"
        onChange={(e) => {
          setDateFilter(e.target.value)
          setSkip(0)
        }} />
      </div>
      {loading ? <div> Loading...</div> : Object.entries(report).map(([date, record]) => (
        <div className="mt-4 border-b" key={date}> 
          <h2 className="text-lg font-semibold">{date}</h2>
          <table className='' border="1" cellPadding="10" >
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">S No</th>
                <th className="border border-gray-200 px-4 py-2">Employee ID</th>
                <th className="border border-gray-200 px-4 py-2">Name </th>
                <th className="border border-gray-200 px-4 py-2">Department </th>
                <th className="border border-gray-200 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {record.map((data, i) => (
                <tr key={data.employeeId} className="hover:bg-gray-100">
                  <td className="border border-gray-200 px-4 py-2">{i + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">{data.employeeId}</td>
                  <td className="border border-gray-200 px-4 py-2">{data.employeeName}</td>
                  <td className="border border-gray-200 px-4 py-2">{data.departmentName}</td>
                  <td className="border border-gray-200 px-4 py-2">{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
     <button className='px-4 py-2 border bg-gray-100 text-lg font-semibold' onClick={handleLoadmore}> Load More </button>

    </div>
  )
}

export default AttendanceReport