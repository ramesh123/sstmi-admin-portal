// src/components/Navigation.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navigation() {
  const [roleCond, setRoleCond] = useState(true);
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
      const rolechk = user.roleid;
      if (rolechk === 3) setRoleCond(false);
    }
  }, [router, pathname]);


  return (
    <nav className="bg-gray-200 p-4 shadow">
      <ul className="flex space-x-4">
        <li>
          <button
            onClick={() => navigateTo('/admin.html')}
            className="text-blue-600 hover:underline"
          >
            Admin Dashboard
          </button>
        </li>
        <li>
          <button
            onClick={() => navigateTo('/priest.html')}
            className="text-blue-600 hover:underline"
          >
            Priest Dashboard
          </button>
        </li>
        <li>
          <button
            onClick={() => navigateTo('/volunteer.html')}
            className="text-blue-600 hover:underline"
          >
            Volunteer Dashboard
          </button>
        </li>
        {roleCond && <li>
          <button
            onClick={() => navigateTo('/manageusers.html')}
            className="text-blue-600 hover:underline"
          >Manage Users</button>
        </li>}
        {roleCond && <li>
          <button
            onClick={() => navigateTo('/managefaqs.html')}
            className="text-blue-600 hover:underline"
          >Manage Faq's</button>
        </li>}
      </ul>
    </nav>
  );
}
