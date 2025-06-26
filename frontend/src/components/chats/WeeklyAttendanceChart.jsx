import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const WeeklyAttendanceChart = ({ stats = [] }) => {
  // If stats is undefined or null, return null or a loading state
  if (!stats) {
    return <div>Loading chart data...</div>;
  }

  const data = {
    labels: stats.map(week => week.weekLabel),
    datasets: [
      {
        label: 'Attended',
        data: stats.map(week => week.totalClassesAttended),
        borderColor: 'rgb(34,197,94)', // green
        backgroundColor: 'rgba(34,197,94,0.2)',
        tension: 0.3,
      },
      {
        label: 'Missed',
        data: stats.map(week => week.totalClassesMissed),
        borderColor: 'rgb(239,68,68)', // red
        backgroundColor: 'rgba(239,68,68,0.2)',
        tension: 0.3,
      },
      {
        label: 'Cancelled',
        data: stats.map(week => week.totalClassesCancelled),
        borderColor: 'rgb(156,163,175)', // gray
        backgroundColor: 'rgba(156,163,175,0.2)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Classes Count' },
      },
      x: {
        title: { display: true, text: 'Week' },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default WeeklyAttendanceChart;