import axios from 'axios';
async function fetchAllUsers() {
  try {
    const response = await axios.get(
      "http://192.168.100.19:3000/api/admin/getAllUsers");

    console.log(response, "ok");
    const userData = response.data; // Get the array of users from 'message'
    console.log(userData, 'ALL');
    return userData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
}


export default fetchAllUsers;
