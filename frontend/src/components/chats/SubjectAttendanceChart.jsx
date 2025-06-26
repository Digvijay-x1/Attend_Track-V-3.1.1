import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const SubjectAttendanceChart = ({ 
  title = "Subject-wise Attendance", 
  subjects = [],
  centerText = "",
  centerNumber = ""
}) => {
  // Calculate data for the chart - using percentage values directly
  const data = {
    labels: subjects.map(subject => subject.name),
    datasets: [
      {
        data: subjects.map(subject => subject.percentage),
        backgroundColor: [
          '#10B981', // Green for PHY
          '#3B82F6', // Blue for RMS  
          '#EF4444', // Red for DSA
          '#F97316', // Orange for HTR
          '#8B5CF6', // Purple for additional
          '#EC4899'  // Pink for additional
        ],
        borderWidth: 0,
        cutout: '70%', // Creates the doughnut effect
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll create custom legend below
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    }
  };

  // Plugin to draw center text
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: function(chart) {
      const { width, height, ctx } = chart;
      ctx.restore();
      
      const fontSize = Math.min(width, height) / 15;
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.fillStyle = '#374151';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Draw main text
      ctx.fillText(centerText, centerX, centerY - fontSize/3);
      
      // Draw number below
      ctx.font = `${fontSize * 0.8}px sans-serif`;
      ctx.fillStyle = '#6B7280';
      ctx.fillText(centerNumber, centerX, centerY + fontSize/2);
      
      ctx.save();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
          View All
        </button>
      </div>

      {/* Chart Container */}
      <div className="relative h-64 mb-6">
        <Doughnut 
          data={data} 
          options={options} 
          plugins={[centerTextPlugin]}
        />
      </div>

      {/* Subject List */}
      <div className="space-y-3">
        {subjects.map((subject, index) => (
          <div key={subject.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
              ></div>
              <span className="text-gray-700 font-medium">{subject.name}</span>
            </div>
            <span className="text-gray-900 font-semibold">{subject.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectAttendanceChart;