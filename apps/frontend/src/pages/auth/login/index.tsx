import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as srv from '@/services';
import { CreateUserPayload } from '@/types/api';

export function Login() {
  const form = useForm<CreateUserPayload>();
  const [inputType, setInputType] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();

  const handleSubmit = async (values: CreateUserPayload) => {
    const { password } = values;

    const res = await srv[inputType]({
      ...values,
      password,
    });

    if (!res.data) {
      return;
    }

    if (inputType === 'login') {
      localStorage.setItem('token', res.data.access_token);

      const redirectUrl =
        new URLSearchParams(window.location.search).get('redirect') || '/projects';
      navigate(redirectUrl);
    }

    if (inputType === 'register') {
      setInputType('login');
    }
  };

  return (
    <div className="container relative h-screen w-full flex-row items-center justify-end grid max-w-none grid-cols-2  !min-w-[1300px]">
      <div className="relative h-full flex-col bg-muted p-10 text-white dark:border-r flex"></div>
      <div className="lg:p-8">
        <div className="flex items-center justify-center ">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-2xl font-bold mb-8">前端监控-数据平台</h1>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  control={form.control}
                  rules={{ required: '请输入用户名' }}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>用户名</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="请输入用户名" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  rules={{ required: '请输入密码' }}
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>密码</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="请输入密码" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-4">
                  {inputType == 'login' ? '登录' : '注册'}
                </Button>
              </form>
            </Form>
            {inputType === 'login' ? (
              <div className="text-center text-sm">
                没有账号?{' '}
                <Button
                  variant="link"
                  onClick={() => {
                    form.clearErrors();
                    setInputType('register');
                  }}
                >
                  注册
                </Button>
              </div>
            ) : (
              <div className="text-center text-sm">
                已有账号?{' '}
                <Button
                  variant="link"
                  onClick={() => {
                    form.clearErrors();
                    setInputType('login');
                  }}
                >
                  登录
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
