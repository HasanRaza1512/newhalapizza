export const submitOrder = async (payload) => {
  console.log("Order payload:", payload);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    orderId: 'MOCK-' + Math.random().toString(36).substr(2, 9).toUpperCase()
  };
};
