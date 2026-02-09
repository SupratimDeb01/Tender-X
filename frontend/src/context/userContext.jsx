import React,{createContext,useState,useEffect} from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
//useEffect is a React Hook used to handle side effects(which is anything that happens outside the component during render) in functional components.

export const UserContext = createContext();


//UserProvider is your custom component that wraps UserContext.Provider.
const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    const accessToken=localStorage.getItem("token");
    if(!accessToken){
      console.log("No token found in localStorage.");
      setLoading(false);
      return;
    }
    console.log("Token found. Fetching user profile...");
    const fetchUser=async()=>{
      try{
        const response =await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        console.log("User profile fetched successfully.");
        // Inject token so user.token is available
        setUser({ ...response.data, token: accessToken });
      }catch(err){
        console.error("User not authorized",err);
        clearUser();
      }
      finally{
        setLoading(false);
      }
    }
    fetchUser();
  },[]);

  const updateUser=(userData)=>{
    setUser(userData);                             //You're only storing the JWT token string, not the whole object.
    localStorage.setItem("token",userData.token); //here i am selecting only the token generated at backend by jwt from among the all user data.(the entire string which contains the jwt token along with other user data.)
    setLoading(false);
  };

  const clearUser=()=>{
    setUser(null);
    localStorage.removeItem("token");
  }

  const refreshUser = () => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      const fetchUser=async()=>{
        try{
          const response =await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
          // Inject token explicitly so user.token is available throughout the app
          setUser({ ...response.data, token: accessToken });
        }catch(err){
          console.error("User refresh failed",err);
          if (err.response && err.response.status === 401) {
             clearUser();
          } else {
             // Don't logout, just log error. 
             // Maybe show toast?
          }
        }
      }
      fetchUser();
    }
  };

  return (
          //UserContext.Provider: Gives any child component access to user, loading
         <UserContext.Provider value={{ user, loading, updateUser, clearUser, refreshUser }}> 
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;


