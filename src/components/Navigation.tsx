// src/components/Navigation.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navigation() {
  const [roleCond, setRoleCond] = useState(1);
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (path: string) => {
    router.push(path);
  };


  useEffect(() => {
    const storedUser = sessionStorage.getItem('adminuser');
    if (!storedUser && pathname !== '/login') {
      router.push('/login');
    } else if (storedUser) {
      const user = JSON.parse(storedUser);
      setRoleCond(user.roleid);
    }
  }, [router, pathname]);


  return (
    <nav className="bg-gray-200 p-4 shadow">
      <ul className="flex space-x-4">
        {(roleCond===1 || roleCond===2) && <li>
          <button
            onClick={() => navigateTo('/admin.html')}
            className="text-blue-600 hover:underline"
          >
            Admin Dashboard
          </button>
        </li>}
        {(roleCond===1 || roleCond===2) && <li>
          <button
            onClick={() => navigateTo('/priest.html')}
            className="text-blue-600 hover:underline"
          >
            Priest Dashboard
          </button>
        </li>}
        {(roleCond===1 || roleCond===2 || roleCond===3) && <li>
          <button
            onClick={() => navigateTo('/volunteer.html')}
            className="text-blue-600 hover:underline"
          >
            Volunteer Dashboard
          </button>
        </li>}
        {(roleCond===1) && <li>
          <button
            onClick={() => navigateTo('/manageusers.html')}
            className="text-blue-600 hover:underline"
          >Manage Users</button>
        </li>}
        {(roleCond===1 || roleCond===2) && <li>
          <button
            onClick={() => navigateTo('/managefaqs.html')}
            className="text-blue-600 hover:underline"
          >Manage Faq's</button>
        </li>}
      </ul>
    </nav>
  );
}
