import axios from 'axios';
async function fetchAllUsers() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/admin/getAllUsers`);

    const userData = response.data; // Get the array of users from 'message'
    console.log(userData, 'ALL');
    return userData;
  } catch (error) {
    return error;
  }
}


export default fetchAllUsers;
