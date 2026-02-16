import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AppLayout from '@/layouts/app-layout';
import salesRoutes from '@/routes/sales';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sales',
        href: salesRoutes.index().url,
    },
];

interface Cliente {
    nombre: string;
    numero_documento: string;
}

interface Sale {
    id: number;
    subtotal: number;
    impuesto: number;
    total: number;
    created_at: string;
    cliente?: Cliente;
}

export default function Index({ sales }: { sales: Sale[] }) {
    const { processing, delete: destroy } = useForm();
    const page = usePage<{ flash?: { success?: string } }>();
    const success = page.props.flash?.success;

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this sale?')) {
            destroy(salesRoutes.destroy(id).url);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />
            <div className="m-4">
                {success && (
                    <div className="mb-4 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-700 dark:bg-green-900/30 dark:text-green-200">
                        {success}
                    </div>
                )}
                <Link href={salesRoutes.create().url}>
                    <Button className="mb-4">
                        Create Sale
                    </Button>
                </Link>
                {sales.length > 0 && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Documento</TableHead>
                                <TableHead className="text-right">Subtotal</TableHead>
                                <TableHead className="text-right">Impuesto</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sales.map((sale) => (
                                <TableRow key={sale.id}>
                                    <TableCell>{sale.id}</TableCell>
                                    <TableCell>{sale.cliente?.nombre ?? '-'}</TableCell>
                                    <TableCell>{sale.cliente?.numero_documento ?? '-'}</TableCell>
                                    <TableCell className="text-right">{Number(sale.subtotal).toFixed(2)}</TableCell>
                                    <TableCell className="text-right">{Number(sale.impuesto).toFixed(2)}</TableCell>
                                    <TableCell className="text-right">{Number(sale.total).toFixed(2)}</TableCell>
                                    <TableCell>{new Date(sale.created_at).toLocaleString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            disabled={processing}
                                            className="bg-red-500 text-white"
                                            onClick={() => handleDelete(sale.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

        </AppLayout>
    );
}
