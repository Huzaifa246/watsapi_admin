import axios from 'axios';

async function ViewUserDetails(_id) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/admin/getSingleUser/${_id}`);

    const userData = response.data;
    console.log(userData, 'View Data');
    return userData;
  } catch (error) {
    return error;
  }
}

export default ViewUserDetails;
