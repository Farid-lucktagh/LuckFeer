import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from '@/layouts/app-layout';
import password from '@/routes/password';
import userRoute from '@/routes/users';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: userRoute.index().url,
    },
    {
        title: 'Create User',
        href: userRoute.create().url,
    },
];


export default function Create() {

    const {data, setData, post, processing, errors} = useForm({
            name: '',
            email: '',
            password: '',
            rol: 'cajero',
            estado: 'activo',
    }) ;

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(userRoute.store().url);
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users | create" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={submit} className="flex flex-col gap-4 max-w-md">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">User name</Label>
                        <Input
                            id="name"
                            placeholder='User name'
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">User email</Label>
                        <Input
                            id="email"
                            placeholder='User email'
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type='password'
                            placeholder='Password'
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />
                        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="rol">Rol</Label>
                        <Select
                            value={data.rol}
                            onValueChange={(value) => setData('rol', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a rol" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cajero">Cajero</SelectItem>
                                <SelectItem value="admin">Administrador</SelectItem>
                                <SelectItem value="vendedor">Vendedor</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.rol && <div className="text-red-500 text-sm">{errors.rol}</div>}
                    </div> 

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="estado">Status</Label>
                        <Select
                            value={data.estado}
                            onValueChange={(value) => setData('estado', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="activo">Activo</SelectItem>
                                <SelectItem value="inactivo">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.estado && <div className="text-red-500 text-sm">{errors.estado}</div>}
                    </div>  
                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Create User
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
