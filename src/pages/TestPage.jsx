import { useState } from 'react'

function TestPage() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Test Page</h1>
        <p className="text-gray-600 mb-6">Basic React rendering test</p>
        <p className="text-lg font-semibold text-blue-600 mb-4">Count: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600"
        >
          Increment
        </button>
      </div>
    </div>
  )
}

export default TestPage
