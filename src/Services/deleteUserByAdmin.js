import axios from 'axios';
async function deleteUserByAdmin(_id) {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API}/api/admin/delete/${_id}`);
    console.log(response, "ok");
    const userData = response?.data;
    console.log(userData, 'Del');
    return userData;
  } catch (error) {
    console.error('Error fetching data at Delete Users Api:', error);
    return error;
  }
}

export default deleteUserByAdmin;