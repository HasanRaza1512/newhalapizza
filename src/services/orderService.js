// Simulate API delay
const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

// Simulate random failures (10% chance)
const simulateRandomFailure = () => Math.random() < 0.1

export const orderService = {
  // Submit new order
  submitOrder: async (orderData) => {
    await delay()
    
    // Simulate random API failure
    if (simulateRandomFailure()) {
      throw new Error('Network error: Unable to process order. Please try again.')
    }
    
    // Validate required fields
    const requiredFields = ['customerInfo', 'items', 'totalAmount']
    for (const field of requiredFields) {
      if (!orderData[field]) {
        throw new Error(`Missing required field: ${field}`)
      }
    }
    
    // Validate customer info
    const customerFields = ['name', 'phone']
    for (const field of customerFields) {
      if (!orderData.customerInfo[field] || orderData.customerInfo[field].trim() === '') {
        throw new Error(`Missing customer ${field}`)
      }
    }
    
    // Validate items
    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
      throw new Error('Order must contain at least one item')
    }
    
    const orderId = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase()
    
    return {
      success: true,
      data: {
        orderId,
        status: 'confirmed',
        estimatedDelivery: '30-45 minutes',
        message: 'Order placed successfully!'
      }
    }
  },

  // Get order status
  getOrderStatus: async (orderId) => {
    await delay(500)
    
    // Mock order statuses
    const statuses = ['confirmed', 'preparing', 'ready', 'delivering', 'delivered']
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    
    return {
      success: true,
      data: {
        orderId,
        status: randomStatus,
        estimatedDelivery: randomStatus === 'delivered' ? 'Delivered' : '30-45 minutes',
        lastUpdated: new Date().toISOString()
      }
    }
  },

  // Get order history (mock)
  getOrderHistory: async (customerPhone) => {
    await delay()
    
    // Mock order history
    return {
      success: true,
      data: [
        {
          orderId: 'ORD-' + (Date.now() - 86400000) + '-ABC12',
          date: new Date(Date.now() - 86400000).toISOString(),
          status: 'delivered',
          total: 45.99,
          items: 3
        },
        {
          orderId: 'ORD-' + (Date.now() - 172800000) + '-XYZ34',
          date: new Date(Date.now() - 172800000).toISOString(),
          status: 'delivered',
          total: 28.50,
          items: 2
        }
      ]
    }
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    await delay()
    
    return {
      success: true,
      data: {
        orderId,
        status: 'cancelled',
        refundAmount: null, // Would be calculated based on order
        message: 'Order cancelled successfully'
      }
    }
  },

  // Validate delivery area
  validateDeliveryArea: async (area) => {
    await delay(300)
    
    // Mock delivery areas (would come from backend)
    const validAreas = [
      'Satellite Town', 'Jinnah Town', 'Samungli Road', 
      'Airport Road', 'Brewery Road', 'Zarghoon Road'
    ]
    
    const isValid = validAreas.includes(area)
    
    return {
      success: true,
      data: {
        isValid,
        deliveryFee: isValid ? 5.99 : 0,
        estimatedTime: isValid ? '30-45 minutes' : 'Delivery not available'
      }
    }
  }
}
