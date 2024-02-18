import { useNavigate } from "react-router-dom";

export default function Logout()
{
    const navigate=useNavigate();
    localStorage.setItem('token', '');
    navigate(import.meta.env.VITE_BASE_URL)
}