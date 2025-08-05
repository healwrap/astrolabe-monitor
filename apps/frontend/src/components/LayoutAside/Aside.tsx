// import { useQuery } from '@tanstack/react-query';
import { Bug, CalendarCheck, Lightbulb, Package, Settings, Siren, Zap } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import { NavLink, useNavigate } from 'react-router-dom';

import logo from '@/assets/logo.webp';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import * as srv from '@/services';
import { queryClient } from '@/utils/query-client';

const menus = [
  {
    name: 'projects',
    icon: Package,
    title: '项目总览',
    gap: true,
  },
  {
    name: 'issues',
    icon: Bug,
    title: '缺陷',
    badge: 6,
  },
  {
    name: 'performance',
    icon: Zap,
    title: '性能',
    gap: true,
  },
  {
    name: 'dashboard',
    icon: Lightbulb,
    title: '监控',
  },
  {
    name: 'crons',
    icon: CalendarCheck,
    title: '定时任务',
  },
  {
    name: 'alerts',
    icon: Siren,
    title: '告警',
  },
];

export function Aside() {
  const navigate = useNavigate();
  //   const { data: currentUser } = useQuery({
  //     queryKey: ['currentUser'],
  //     queryFn: async () => {
  //       const res = await srv.currentUser();
  //       return res.data;
  //     },
  //   });
  const currentUser = {
    username: 'admin',
    email: 'admin@example.com',
  };

  const handleLogout = async () => {
    const { data } = await srv.logout();
    if (!data) {
      // toast.error('退出登录失败，请稍后重试');
      return;
    }
    localStorage.removeItem('token');
    queryClient.clear();
    navigate(`/auth/login?redirect=${window.location.pathname}`);
  };
  return (
    <div className=" border-r bg-gray-50 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" className="flex items-center gap-2 ">
            <img className="w-10" src={logo} />
            <p className="font-semibold text-lg">前端监控-数据平台</p>
          </a>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {menus.map(menu => (
              <Fragment key={menu.name}>
                <NavLink
                  to={`/${menu.name}`}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      isActive && 'bg-muted'
                    )
                  }
                >
                  <menu.icon className="h-4 w-4" />
                  {menu.title}
                  {menu.badge && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {menu.badge}
                    </Badge>
                  )}
                </NavLink>
                {menu.gap && <div className="my-3 h-[1px] bg-gray-100" />}
              </Fragment>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="grid">
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-fit flex justify-start gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              {currentUser && (
                <>
                  <Avatar>
                    <AvatarImage
                      src={`https://robohash.org/${currentUser.username}?set=set1&size=100x100`}
                    />
                    <AvatarFallback>{currentUser.username}</AvatarFallback>
                  </Avatar>
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full flex justify-start gap-3 mt-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              设置
            </Button>
            <Button variant="outline" size="sm" className="w-full mt-1" onClick={handleLogout}>
              退出登录
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
