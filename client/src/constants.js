export const getColorByStatus = (status) => {
    switch (status.toLowerCase()) {
      case 'to-do':
        return '#2196F3';
      case 'ongoing':
        return '#FFC107';
      case 'completed':
        return '#4CAF50'; 
      default:
        return '#757575'; 
    }
};

export const getHoverColorByStatus = (status) => {
  switch (status.toLowerCase()) {
    case 'to-do':
      return '#1976D2';
    case 'ongoing':
      return '#FFA000';
    case 'completed':
      return '#388E3C'; 
    default:
      return '#757575'; 
  }
};


export async function getUserDetails(userId) {
  try {
    const response = await fetch(`http://localhost:5000/user/profile/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    const userDetails = await response.json();
    return userDetails;

  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
}


