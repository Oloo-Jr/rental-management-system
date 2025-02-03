import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Database/config';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // or your loading spinner
  }

  return children;
};

export default ProtectedRoute;