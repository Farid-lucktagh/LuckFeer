import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AppLayout from '@/layouts/app-layout';
import userRoute from '@/routes/users';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: userRoute.index().url,
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    rol: string;
    estado: string;
}

export default function index({ users }: { users: User[] }) {

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            destroy(userRoute.destroy(id).url);
        }

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="m-4">
                <Link href={userRoute.create().url}>
                    <Button className="mb-4">
                        Create User
                    </Button>
                </Link>
                <Table>
                    <TableCaption>A list of users.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead className="text-right">Name</TableHead>
                            <TableHead className="text-right">Email</TableHead>
                            <TableHead className="text-right">Rol</TableHead>
                            <TableHead className="text-right">Estado</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="w-[100px]">{user.id}</TableCell>
                                <TableCell className="text-right">{user.name}</TableCell>
                                <TableCell className="text-right">{user.email}</TableCell>
                                <TableCell className="text-right">{user.rol}</TableCell>
                                <TableCell className="text-right">{user.estado}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={userRoute.edit(user.id).url}>
                                        <Button className="mr-2">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button disabled={processing}
                                            className="bg-red-500 text-white" 
                                            onClick={() => handleDelete(user.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>                
            </div>


        </AppLayout>
    );
}
