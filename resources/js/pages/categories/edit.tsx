import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from '@/layouts/app-layout';
import categoriesRoutes from '@/routes/categories';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: categoriesRoutes.index().url,
    },
    {
        title: 'Edit Category',
        href: window.location.pathname,
    },
];

interface category {
    id: number;
    nombre: string;
    descripcion: string;
    color: string;
    estado: string;
}


export default function Edit({ category }: { category: category }) {

    const {data, setData, put, processing, errors} = useForm({
            nombre: category.nombre,
            descripcion: category.descripcion,
            color: category.color,
            estado: category.estado,
    }) ;

    const Update = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(categoriesRoutes.update(category.id).url);
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories | Edit" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={Update} className="flex flex-col gap-4 max-w-md">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="nombre">Category name</Label>
                        <Input
                            id="nombre"
                            placeholder='Category name'
                            value={data.nombre}
                            onChange={e => setData('nombre', e.target.value)}
                        />
                        {errors.nombre && <div className="text-red-500 text-sm">{errors.nombre}</div>}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="descripcion">Category description</Label>
                        <Textarea 
                            id="descripcion"
                            placeholder="Product description" 
                            value={data.descripcion}
                            onChange={e => setData('descripcion', e.target.value)}
                        />
                        {errors.descripcion && <div className="text-red-500 text-sm">{errors.descripcion}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="color">Color</Label>
                        <Input
                            id="color"
                            type="color"
                            placeholder='Product color'
                            value={data.color}
                            onChange={e => setData('color', e.target.value)}
                        />
                        {errors.color && <div className="text-red-500 text-sm">{errors.color}</div>}
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
                            Update Category
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
