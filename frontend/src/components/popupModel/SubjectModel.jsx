// components/SubjectModel.jsx
import React, { useState } from 'react';

const dayOptions = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SubjectModel = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    profName: '',
    code: '',
    type: 'lecture',
    schedule: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScheduleChange = (index, field, value) => {
    const updated = [...formData.schedule];
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
    <form onSubmit={handleSubmit} className="p-4 rounded shadow-lg bg-white space-y-4">
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Course Title" required className="input input-bordered w-full" />
      <input type="text" name="profName" value={formData.profName} onChange={handleChange} placeholder="Professor Name" required className="input input-bordered w-full" />
      <input type="text" name="code" value={formData.code} onChange={handleChange} placeholder="Course Code" required className="input input-bordered w-full" />

      <select name="type" value={formData.type} onChange={handleChange} className="select select-bordered w-full">
        <option value="lecture">Lecture</option>
        <option value="lab">Lab</option>
        <option value="tutorial">Tutorial</option>
      </select>

      <div className="space-y-2">
        <h3 className="font-semibold">Schedule</h3>
        {formData.schedule.map((entry, index) => (
          <div key={index} className="flex gap-2 items-center">
            <select
              value={entry.dayOfWeek}
              onChange={(e) => handleScheduleChange(index, 'dayOfWeek', Number(e.target.value))}
              className="select select-bordered"
            >
              {dayOptions.map((day, i) => (
                <option key={i} value={i}>{day}</option>
              ))}
            </select>

            <input type="time" value={entry.startTime} onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)} className="input input-bordered" />
            <input type="time" value={entry.endTime} onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)} className="input input-bordered" />
            <button type="button" onClick={() => removeScheduleEntry(index)} className="btn btn-error btn-sm">✕</button>
          </div>
        ))}
        <button type="button" onClick={addScheduleEntry} className="btn btn-outline btn-sm">+ Add Schedule</button>
      </div>

      <button type="submit" className="btn btn-primary w-full">Create Course</button>
    </form>
  );
};

export default SubjectModel;