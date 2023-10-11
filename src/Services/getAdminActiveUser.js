import axios from 'axios';
async function adminActiveUser(user_id, status) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/admin/userStatus/${user_id}/${status}`);
    const userData = response?.data; // Get the array of users from 'message'
    console.log(userData, 'Active');
    return userData;
  } catch (error) {
    console.error('Error fetching data at adminActiveUser Users:', error);
    return [];
  }
}

export default adminActiveUser;