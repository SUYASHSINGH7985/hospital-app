import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';

export function ProtectedRoute({ children, loginPath = '/login' }: { children: React.ReactNode, loginPath?: string }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push(loginPath);
      return;
    }
    try {
      const decoded = jwt_decode(token);
      setUser(decoded);
      setIsAuthenticated(true);
    } catch (err) {
      localStorage.removeItem('token');
      router.push(loginPath);
    }
  }, [router, loginPath]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  // Optionally pass user info to children via context or props
  return <>{children}</>;
}
