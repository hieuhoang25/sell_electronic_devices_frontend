import { Navigate, useSearchParams } from 'react-router-dom';
import axios from '../../services/axios';
import TokenService from '../../services/tokenService';
import { useDispatch, useSelector } from 'react-redux';
import { mergeAnnonCart } from '../../services/cartService';
import { INIT, LOGIN } from '../../redux/actions/AuthAction';
const OAuth2RedirectHandler = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const access_token = searchParams.get('access_token');
    const refresh_token = searchParams.get('refresh_token');
    if (access_token && refresh_token) {
        axios
            .get(process.env.REACT_APP_URL + 'un/token-login-google', {
                params: {
                    accessToken: access_token,
                    refreshToken: refresh_token,
                },
            })
            .then((res) => {
                dispatch({
                    type: LOGIN,
                    payload: {
                        isAuthenticated: true,
                        fullName: null,
                        role: res.data.roles[0].authority,
                        accessToken: res.data.access_token,
                    },
                });
                dispatch(mergeAnnonCart());
            });
        TokenService.setCookieAccessToken(access_token);
        return <Navigate to="/" />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default OAuth2RedirectHandler;
