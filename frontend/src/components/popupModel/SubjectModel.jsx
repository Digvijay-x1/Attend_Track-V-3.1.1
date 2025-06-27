// components/SubjectModel.jsx
import React, { useState, useEffect } from 'react';

const dayOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SubjectModel = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    profName: '',
    code: '',
    type: 'lecture',
    schedule: []
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        profName: initialData.profName || '',
        code: initialData.code || '',
        type: initialData.type || 'lecture',
        schedule: initialData.schedule || []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScheduleChange = (index, field, value) => {
    const updated = [...formData.schedule];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, schedule: updated }));
  };

  const addScheduleEntry = () => {
    setFormData(prev => ({
      ...prev,
      schedule: [...prev.schedule, { dayOfWeek: 0, startTime: '', endTime: '' }]
    }));
  };

  const removeScheduleEntry = (index) => {
    const updated = [...formData.schedule];
    updated.splice(index, 1);
    setFormData(prev => ({ ...prev, schedule: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-base-100">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Course Title</span>
        </label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          placeholder="Course Title" 
          required 
          className="input input-bordered w-full" 
        />
      </div>

      <div className="form-control ">
        <label className="label">
          <span className="label-text">Professor Name</span>
        </label>
        <input 
          type="text" 
          name="profName" 
          value={formData.profName} 
          onChange={handleChange} 
          placeholder="Professor Name" 
          required 
          className="input input-bordered w-full" 
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Course Code</span>
        </label>
        <input 
          type="text" 
          name="code" 
          value={formData.code} 
          onChange={handleChange} 
          placeholder="Course Code" 
          required 
          className="input input-bordered w-full" 
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Course Type</span>
        </label>
        <select 
          name="type" 
          value={formData.type} 
          onChange={handleChange} 
          className="select select-bordered w-full"
        >
          <option value="lecture">Lecture</option>
          <option value="lab">Lab</option>
          <option value="tutorial">Tutorial</option>
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Schedule</span>
        </label>
        <div className="space-y-3">
          {formData.schedule.map((entry, index) => (
            <div key={index} className="flex gap-2 items-center">
              <select
                value={entry.dayOfWeek}
                onChange={(e) => handleScheduleChange(index, 'dayOfWeek', Number(e.target.value))}
                className="select select-bordered flex-1"
              >
                {dayOptions.map((day, i) => (
                  <option key={i} value={i}>{day}</option>
                ))}
              </select>

              <input 
                type="time" 
                value={entry.startTime} 
                onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)} 
                className="input input-bordered flex-1" 
              />
              <input 
                type="time" 
                value={entry.endTime} 
                onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)} 
                className="input input-bordered flex-1" 
              />
              <button 
                type="button" 
                onClick={() => removeScheduleEntry(index)} 
                className="btn btn-error btn-square btn-sm"
              >
                ✕
              </button>
            </div>
          ))}
          <button 
            type="button" 
            onClick={addScheduleEntry} 
            className="btn btn-outline btn-sm w-full"
          >
            + Add Schedule
          </button>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-full">
        {initialData ? 'Update Subject' : 'Create Subject'}
      </button>
    </form>
  );
};

export default SubjectModel;