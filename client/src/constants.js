import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import KeyboardDoubleArrowUpSharpIcon from '@mui/icons-material/KeyboardDoubleArrowUpSharp';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';

if (!process.env.REACT_APP_SERVER_ENDPOINT) {
  throw new Error("Missing Server Endpoint");
}
export const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT;



export const checkUser = async (user,handleLoading) => {
  handleLoading(true);
  if (user) {
    try {
      const response = await fetch(`${serverEndpoint}/user/profile/${user.id}`);
      if (response.ok) {
      } else if (response.status === 404) {
        const createResponse = await fetch(`${serverEndpoint}/user/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.primaryEmailAddress.emailAddress,
            fullName: `${user.firstName} ${user.lastName}`,
          }),
        });

        if (createResponse.ok) {
          console.log('User created');
        } else {
          console.error('Failed to create user');
        }
      } else {
        console.error('Error checking user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  handleLoading(false);
};

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
    const response = await fetch(`${serverEndpoint}/user/profile/${userId}`, {
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
    const response = await fetch(`${serverEndpoint}/task/all`);
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

export const fetchUsers = async (handleLoading) => {
  handleLoading(true)
  try {
    const response = await fetch(`${serverEndpoint}/user/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    handleLoading(false)
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    handleLoading(false)
    throw new Error(error.message);
  }
};

