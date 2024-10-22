export const report = async (userId) => {
    const trustedId = JSON.parse(sessionStorage.getItem('userData').toString())[0].id; 
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