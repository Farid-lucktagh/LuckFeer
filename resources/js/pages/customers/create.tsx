import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from '@/layouts/app-layout';
import custmoerRoutes from '@/routes/customers';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: custmoerRoutes.index().url,
    },
    {
        title: 'Create Customer',
        href: custmoerRoutes.create().url,
    },
];

export default function Create() {

    const {data, setData, post, processing, errors} = useForm({
            nombre: '',
            tipo_documento: '',
            numero_documento: '',
            telefono: '',
            correo: '',
            direccion: '',
            total_compras: 0,
            estado: 'activo',
    }) ;

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(custmoerRoutes.store().url);
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers | create" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={submit} className="flex flex-col gap-4 max-w-md">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="nombre">Customer name</Label>
                        <Input
                            id="nombre"
                            placeholder='Customer name'
                            value={data.nombre}
                            onChange={e => setData('nombre', e.target.value)}
                        />
                        {errors.nombre && <div className="text-red-500 text-sm">{errors.nombre}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="tipo_documento">Document type</Label>
                        <Select
                            value={data.tipo_documento}
                            onValueChange={(value) => setData('tipo_documento', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cedula">Cédula</SelectItem>
                                <SelectItem value="tarjeta_identidad">Tarjeta de Identidad</SelectItem>
                                <SelectItem value="pasaporte">Pasaporte</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.tipo_documento && <div className="text-red-500 text-sm">{errors.tipo_documento}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="numero_documento">Document number</Label>
                        <Input
                            id="numero_documento"
                            placeholder='Document number'
                            value={data.numero_documento}
                            onChange={e => setData('numero_documento', e.target.value)}
                        />
                        {errors.numero_documento && <div className="text-red-500 text-sm">{errors.numero_documento}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="telefono">Phone</Label>
                        <Input
                            id="telefono"
                            placeholder='Phone number'
                            value={data.telefono}
                            onChange={e => setData('telefono', e.target.value)}
                        />
                        {errors.telefono && <div className="text-red-500 text-sm">{errors.telefono}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="correo">Email</Label>
                        <Input
                            id="correo"
                            type="email"
                            placeholder='Email address'
                            value={data.correo}
                            onChange={e => setData('correo', e.target.value)}
                        />
                        {errors.correo && <div className="text-red-500 text-sm">{errors.correo}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="direccion">Address</Label>
                        <Input
                            id="direccion"
                            placeholder='Address'
                            value={data.direccion}
                            onChange={e => setData('direccion', e.target.value)}
                        />
                        {errors.direccion && <div className="text-red-500 text-sm">{errors.direccion}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="total_compras">Total purchases</Label>
                        <Input
                            id="total_compras"
                            type="number"
                            placeholder='Total purchases'
                            value={data.total_compras}
                            onChange={e => setData('total_compras', Number(e.target.value))}
                        />
                        {errors.total_compras && <div className="text-red-500 text-sm">{errors.total_compras}</div>}
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
                            Create Product
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
