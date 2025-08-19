import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useSignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      dispatch({ type: "signOut" });
      dispatch({
        type: "setNotifications",
        payload: {
          notifications: 0,
          notificationMessage: [],
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return { handleSignOut };
};

export default useSignOut;
