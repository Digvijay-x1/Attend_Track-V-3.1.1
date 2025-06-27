import React from 'react'

const SkeletonCard = () => {
  return (
    <div className='bg-base-100 rounded-xl p-6 shadow-lg border border-base-200'>
      <div className='flex justify-between items-start mb-4'>
        <div className='space-y-2 flex-1'>
          <div className="skeleton h-6 w-3/4"></div>
          <div className="skeleton h-4 w-1/2"></div>
          <div className="skeleton h-4 w-1/3"></div>
        </div>
        <div className='flex gap-2'>
          <div className="skeleton w-8 h-8 rounded-lg"></div>
          <div className="skeleton w-8 h-8 rounded-lg"></div>
        </div>
      </div>

      <div className='space-y-2 mb-6'>
        <div className="skeleton h-4 w-2/3"></div>
        <div className="skeleton h-4 w-1/2"></div>
      </div>

      <div className='mb-4'>
        <div className='flex justify-between items-baseline mb-2'>
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-6 w-16"></div>
        </div>
        <div className="skeleton h-2 w-full mb-2"></div>
        <div className='flex justify-between'>
          <div className="skeleton h-4 w-16"></div>
          <div className="skeleton h-4 w-16"></div>
          <div className="skeleton h-4 w-16"></div>
        </div>
      </div>

      <div className='flex justify-start'>
        <div className="skeleton h-6 w-20 rounded-lg"></div>
      </div>
    </div>
  )
}

export default SkeletonCard 