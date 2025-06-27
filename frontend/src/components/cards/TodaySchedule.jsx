import { useState } from 'react';
import { useInputStore } from '../../store/useInput.store';
import { CheckCircle2, XCircle, Ban, Album } from 'lucide-react';
import { toast } from 'react-hot-toast';

const TodaySchedule = ({ todaySchedule }) => {
  const { markAttendance, attendanceStatus } = useInputStore();
  const [attendanceInputs, setAttendanceInputs] = useState({});

  const handleChange = (id, value) => {
    setAttendanceInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleMark = (id, status) => {
    const value = parseFloat(attendanceInputs[id]);
    if (isNaN(value)) {
      toast.error('Please enter a valid number for attendance value');
      return;
    }
    markAttendance(id, status, value);
  };

  const getStatusStyles = (id, status) => {
    const currentStatus = attendanceStatus[id];
    const isDisabled = currentStatus !== undefined;
    
    if (isDisabled && currentStatus !== status) {
      return 'btn btn-ghost btn-sm text-base-content/30';
    }

    switch(status) {
      case 'present':
        return currentStatus === status 
          ? 'btn btn-success btn-sm text-white gap-2' 
          : 'btn btn-outline btn-success btn-sm gap-2';
      case 'absent':
        return currentStatus === status 
          ? 'btn btn-error btn-sm text-white gap-2' 
          : 'btn btn-outline btn-error btn-sm gap-2';
      case 'canceled':
        return currentStatus === status 
          ? 'btn bg-base-content text-base-100 btn-sm gap-2 hover:bg-base-content/90' 
          : 'btn btn-outline border-base-content text-base-content btn-sm gap-2 hover:bg-base-content hover:text-base-100';
      default:
        return 'btn btn-ghost btn-sm';
    }
  };

  if (!todaySchedule || todaySchedule.length === 0) {
    return (
      <div className="text-center py-8 text-base-content/70">
        No classes scheduled for today
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todaySchedule.map((classItem) => (
        <div 
          key={classItem._id} 
          className={`card bg-base-100 border border-base-200 transition-all duration-200 hover:shadow-md ${
            attendanceStatus[classItem._id] === 'present' ? 'bg-success/5 border-success/20' :
            attendanceStatus[classItem._id] === 'absent' ? 'bg-error/5 border-error/20' :
            attendanceStatus[classItem._id] === 'canceled' ? 'bg-base-content/5 border-base-content/20' :
            ''
          }`}
        >
          <div className="card-body p-4">
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Album className="w-4 h-4 text-primary" />
                  <h3 className="font-medium text-base-content">{classItem.title}</h3>
                </div>
                <div className="mt-1 space-y-1">
                  <p className="text-sm text-base-content/70">{classItem.profName}</p>
                  <p className="text-sm text-base-content/70">{classItem.startTime} – {classItem.endTime}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="form-control w-full sm:w-24">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={attendanceInputs[classItem._id] || ''}
                    onChange={(e) => handleChange(classItem._id, e.target.value)}
                    placeholder="Value"
                    className="input input-bordered input-sm w-full"
                    disabled={attendanceStatus[classItem._id] !== undefined}
                  />
                </div>

                <div className="flex gap-2 justify-stretch sm:justify-start">
                  <button
                    onClick={() => handleMark(classItem._id, "present")}
                    disabled={attendanceStatus[classItem._id] !== undefined}
                    className={`${getStatusStyles(classItem._id, "present")} flex-1 sm:flex-none`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Present</span>
                  </button>
                  <button
                    onClick={() => handleMark(classItem._id, "absent")}
                    disabled={attendanceStatus[classItem._id] !== undefined}
                    className={`${getStatusStyles(classItem._id, "absent")} flex-1 sm:flex-none`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">Absent</span>
                  </button>
                  <button
                    onClick={() => handleMark(classItem._id, "canceled")}
                    disabled={attendanceStatus[classItem._id] !== undefined}
                    className={`${getStatusStyles(classItem._id, "canceled")} flex-1 sm:flex-none`}
                  >
                    <Ban className="w-4 h-4" />
                    <span className="hidden sm:inline">Canceled</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodaySchedule;