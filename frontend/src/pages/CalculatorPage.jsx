import React from 'react'
import MainCalculator from '../components/MainCalculator'
import QuickCalculator from '../components/QuickCalculator'

const CalculatorPage = () => {
  return (
    <div className="container mx-auto p-4 lg:p-6">
      <h1 className="text-2xl font-bold mb-6 text-base-content">Attendance Calculator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Detailed Calculator in the main content area (now on the left) */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="bg-base-200 rounded-lg shadow-lg">
            <MainCalculator />
          </div>
        </div>
        
        {/* Quick Calculator in the sidebar (now on the right) */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <QuickCalculator />
        </div>
      </div>
    </div>
  )
}

export default CalculatorPage