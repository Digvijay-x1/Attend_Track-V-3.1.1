import React from 'react'
import MainCalculator from '../components/MainCalculator'
import QuickCalculator from '../components/QuickCalculator'
import { Calculator } from 'lucide-react'

const CalculatorPage = () => {
  return (
    <div className="p-2 sm:p-4 lg:p-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="bg-primary/20 p-2 rounded-lg">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-base-content">Attendance Calculator</h1>
          <p className="text-xs sm:text-sm text-base-content/70">
            Calculate your attendance requirements
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
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