import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../reducers/authSlice';

export default function LogoutButton({ variant = "contained", color = "primary", size = "medium" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={handleLogout}
      startIcon={<LogoutIcon />}
    >
      Logout
    </Button>
  );
}