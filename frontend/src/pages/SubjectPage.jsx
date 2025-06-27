import React, { useEffect } from 'react'
import { Plus, Book, Clock, BarChart3 } from 'lucide-react'
import { useSubjectStore } from '../store/useSubject.store'
import SubjectCard from '../components/SubjectCard'



const SubjectPage = () => {

  const { fetchSubjectsData , data , fetchSubjects , subjects } = useSubjectStore();

  useEffect(()=>{
    fetchSubjectsData();
    fetchSubjects();
  },[fetchSubjectsData , fetchSubjects]);

  const { totalSubjects, weeklyClassesInHours, avgAttendance } = data || {};
  console.log(subjects);
  {/* SUBJECTS DATA [
    {
        "_id": "685c46f86c2fce9dd808459a",
        "title": "Operating Systems",
        "code": "CS401",
        "profName": "Prof. Gupta",
        "type": "lab",
        "schedule": [
            {
                "dayOfWeek": 2,
                "startTime": "10:00",
                "endTime": "12:00",
                "_id": "685c46f86c2fce9dd808459b"
            },
            {
                "dayOfWeek": 4,
                "startTime": "14:00",
                "endTime": "16:00",
                "_id": "685c46f86c2fce9dd808459c"
            }
        ],
        "totalClasses": 4,
        "attendedClasses": 4,
        "attendancePercentage": 100
    },
    {
        "_id": "685bfbc8493850b3db88b180",
        "title": "Network And Synthesis",
        "code": "NS301",
        "profName": "Dr. Bhatt",
        "type": "lecture",
        "schedule": [
            {
                "dayOfWeek": 4,
                "startTime": "10:00",
                "endTime": "11:30",
                "status": "scheduled",
                "_id": "685bfbc8493850b3db88b181"
            },
            {
                "dayOfWeek": 6,
                "startTime": "12:00",
                "endTime": "13:30",
                "status": "scheduled",
                "_id": "685bfbc8493850b3db88b182"
            }
        ],
        "totalClasses": 41,
        "attendedClasses": 30,
        "attendancePercentage": 73.17
    },
    {
        "_id": "685bf8c40d99d4d5a42358da",
        "title": "Data Structures and Algorithms",
        "code": "CS301",
        "profName": "Dr. Mehta",
        "type": "lecture",
        "schedule": [
            {
                "dayOfWeek": 1,
                "startTime": "10:00",
                "endTime": "11:30",
                "status": "scheduled",
                "_id": "685bf8c40d99d4d5a42358db"
            },
            {
                "dayOfWeek": 3,
                "startTime": "12:00",
                "endTime": "13:30",
                "status": "scheduled",
                "_id": "685bf8c40d99d4d5a42358dc"
            }
        ],
        "totalClasses": 5,
        "attendedClasses": 2,
        "attendancePercentage": 40
    }
] */}

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
                <p className="text-3xl font-bold text-gray-900">{totalSubjects}</p>
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
                <p className="text-3xl font-bold text-purple-600">{weeklyClassesInHours} hrs</p>
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
                <p className="text-3xl font-bold text-green-600">{avgAttendance}%</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* subjects cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {subjects?.map((course)=>(
            <SubjectCard key={course._id} course={course} />
          ))}
        </div>
    </div>
  )
}

export default SubjectPage