export const report = async (userId) => {
    const trustedId = 1; // Ustaw trustedId na odpowiednią wartość
    try {
      const response = await $fetch('/api/report', {
        method: 'POST',
        body: {
          userId,
          trustedId
        }
      });
      
      if (response.success) {
        console.log('Data updated successfully');
      } else {
        console.error('Error updating data:', response.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };