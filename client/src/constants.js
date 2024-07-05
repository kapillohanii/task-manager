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