import axios from 'axios';

export const getAuthToken = () => {
  const authData = JSON.parse(window.sessionStorage.getItem('auth_data'));

  if (authData && authData.token && new Date(authData.expiresAt) > new Date()) {
    return authData.token;
  } else {
    return null;
  }
};

export const request = async (method, url, data) => {
  try {
    const headers = {};

    const authToken = getAuthToken();

    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    const response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: data
      // withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Request failed:', error);
    return error.response.data;
  }
};

export const requestNoHeader = async (method, url, data) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data
    });

    return response?.data;
  } catch (error) {
    console.error('Request failed:', error);
    return error.response.data;
    // throw error; // Re-throw the error for handling in the component
  }
};

export const setAuthHeader = (token) => {
  if (token) {
    const authData = {
      token: token,
      expiresAt: new Date(Date.now() + 5 * 60 * 60 * 1000) // 5 hours expiration
    };

    window.sessionStorage.setItem('auth_data', JSON.stringify(authData));
  } else {
    window.sessionStorage.removeItem('auth_data');
  }
};

axios.defaults.baseURL =
  // "http://localhost:8086/api/v2"
  'https://0wb4i9f3m5.execute-api.us-east-1.amazonaws.com/api/v2';
//  "http://k8s-default-mainingr-63f836edef-504885888.us-east-1.elb.amazonaws.com/api/v2"
// "https://5ho90yypzh.execute-api.us-east-1.amazonaws.com/api/v2";
// 'https://c1psi86zka.execute-api.us-east-1.amazonaws.com/dev';
axios.defaults.headers.post['Content-Type'] = 'application/json';
