import React, { useEffect, useState } from 'react'
import { Plus, Book, Clock, BarChart3 } from 'lucide-react'
import { useSubjectStore } from '../store/useSubject.store'
import SubjectCard from '../components/SubjectCard'
import SubjectModel from '../components/popupModel/SubjectModel'
import SkeletonCard from '../components/SkeletonCard'

const SubjectPage = () => {
  const [editingSubject, setEditingSubject] = useState(null);

  const { 
    fetchSubjectsData, 
    data, 
    fetchSubjects, 
    subjects,
    createSubject,
    editSubject,
    deleteSubject,
    isLoading 
  } = useSubjectStore();

  useEffect(() => {
    fetchSubjectsData();
    fetchSubjects();
  }, [fetchSubjectsData, fetchSubjects]);

  const { totalSubjects, weeklyClassesInHours, avgAttendance } = data || {};

  const handleSubjectSubmit = async (formData) => {
    if (editingSubject) {
      await editSubject(editingSubject._id, formData);
    } else {
      await createSubject(formData);
    }
    await Promise.all([fetchSubjectsData(), fetchSubjects()]);
    document.getElementById('subject_modal').close();
    setEditingSubject(null);
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    document.getElementById('subject_modal').showModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      await deleteSubject(id);
      await Promise.all([fetchSubjectsData(), fetchSubjects()]);
    }
  };

  // Skeleton array for loading state
  const skeletonCards = Array(6).fill(null);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      {/* Modal */}
      <dialog id="subject_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {editingSubject ? 'Edit Subject' : 'Add New Subject'}
          </h3>
          <SubjectModel 
            onSubmit={handleSubjectSubmit} 
            initialData={editingSubject}
          />
          <div className="modal-action">
            <form method="dialog">
              <button 
                className="btn btn-ghost"
                onClick={() => setEditingSubject(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setEditingSubject(null)}>close</button>
        </form>
      </dialog>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2">Subject Management</h1>
          <p className="text-base-content/70">Manage your subjects, schedules, and attendance goals</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingSubject(null);
            document.getElementById('subject_modal').showModal();
          }}
        >
          <Plus className="h-4 w-4" />
          Add Subject
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-base-content/70">Total Subjects</h3>  
                {isLoading ? (
                  <div className="skeleton h-10 w-16"></div>
                ) : (
                  <p className="text-3xl font-bold text-primary">{totalSubjects}</p>
                )}
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Book className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-base-content/70">Weekly Classes</h3>
                {isLoading ? (
                  <div className="skeleton h-10 w-24"></div>
                ) : (
                  <p className="text-3xl font-bold text-secondary">{weeklyClassesInHours} hrs</p>
                )}
              </div>
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-secondary" />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-base-content/70">Avg. Attendance</h3>
                {isLoading ? (
                  <div className="skeleton h-10 w-20"></div>
                ) : (
                  <p className="text-3xl font-bold text-accent">{avgAttendance}%</p>
                )}
              </div>
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          // Show skeleton cards while loading
          skeletonCards.map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          // Show actual subject cards
          subjects?.map((subject) => (
            <SubjectCard 
              key={subject._id} 
              course={subject}
              onEdit={() => handleEdit(subject)}
              onDelete={() => handleDelete(subject._id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default SubjectPage