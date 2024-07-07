import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import KeyboardDoubleArrowUpSharpIcon from '@mui/icons-material/KeyboardDoubleArrowUpSharp';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';

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

export const getPriorityIcon = (priority) => {
  switch(priority.toLowerCase()) {
    case 'high':
      return <PriorityHighIcon color="error" />;
    case 'medium':
      return <KeyboardDoubleArrowUpSharpIcon color="warning" />;
    case 'low':
      return <KeyboardArrowUpSharpIcon color="warning" />;
    default:
      return null;
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

export const fetchTasks = async (handleLoading) => {
  handleLoading(true)
  try {
    const response = await fetch('http://localhost:5000/task/all');
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    handleLoading(false)
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    handleLoading(false)
    throw new Error(error.message);
  }
};


