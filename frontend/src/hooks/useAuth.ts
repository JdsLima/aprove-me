import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('bankme_token');

    if (!token) {
      router.push('/');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        localStorage.removeItem('bankme_token');
        router.push('/');
      }
    } catch (error) {
      localStorage.removeItem('bankme_token');
      router.push('/');
    }
  }, [router]);
};