import axios from "axios";
(function() {
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJOaGF0UGh1Iiwicm9sZXMiOlsiU1VQRVJfQURNSU4iXSwiZXhwIjoxNjc4MTg3NjI3fQ.1oOq3c5_NYvsn87nBbg6Pr3KCecMGdkD-juRymE-Ao8";
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        axios.defaults.headers.common['Authorization'] = null;
        /*if setting null does not remove `Authorization` header then try     
          delete axios.defaults.headers.common['Authorization'];
        */
    }
})();