import React from 'react'
import { Plus, Book, Clock, BarChart3 } from 'lucide-react'
const SubjectPage = () => {
  return (
    <div >
       <div className="flex items-center justify-between mb-8">
        {/* header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Subject Management</h1>
            <p className="text-gray-600">Manage your subjects, schedules, and attendance goals</p>
          </div>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
            Add Subject
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Total Subjects</h3>  
                <p className="text-3xl font-bold text-gray-900">{/*totalSubjects*/}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Book className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>


          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Weekly Classes</h3>
                <p className="text-3xl font-bold text-purple-600">{/*weeklyClasses*/}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Avg. Attendance</h3>
                <p className="text-3xl font-bold text-green-600">{/*avgAttendance*/}%</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SubjectPage