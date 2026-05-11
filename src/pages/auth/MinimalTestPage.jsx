import React from 'react'

const MinimalTestPage = () => {
  console.log('MinimalTestPage rendered successfully')
  
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Minimal Test - No Motion
        </h1>
        <p className="text-gray-600 mb-6">
          Testing basic React rendering without Framer Motion
        </p>
        <div className="space-y-4">
          <button className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition-colors">
            Test Button
          </button>
        </div>
      </div>
    </div>
  )
}

export default MinimalTestPage
