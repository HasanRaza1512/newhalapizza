import React from 'react'

const DebugAuthPage = () => {
  console.log('DebugAuthPage rendered')
  
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Debug Auth Page
        </h1>
        <p className="text-gray-600 mb-6">
          Testing basic rendering without motion or complex components
        </p>
        <div className="space-y-4">
          <button className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition-colors">
            Test Button
          </button>
          <input 
            type="text" 
            placeholder="Test input"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>
    </div>
  )
}

export default DebugAuthPage
