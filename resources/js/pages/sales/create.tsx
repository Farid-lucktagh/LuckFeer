import { Head, useForm } from '@inertiajs/react';
import { Trash2, Plus } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

interface Customer {
    id: number;
    nombre: string;
    numero_documento: string;
}

interface Category {
    id: number;
    nombre: string;
}

interface Product {
    id: number;
    nombre: string;
    precio: number;
    cantidad_stock: number;
    categoria: Category;
}

interface Props {
    customers: Customer[];
    products: Product[];
}

interface SaleItem {
    producto_id: number;
    nombre: string;
    precio_unitario: number;
    cantidad: number;
    precio_total: number;
    stock_disponible: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sales',
        href: salesRoutes.index().url,
    },
    {
        title: 'Create Sale',
        href: salesRoutes.create().url,
    },
];

export default function Create({ customers, products }: Props) {
    const [selectedItems, setSelectedItems] = useState<SaleItem[]>([]);
    const [currentProductId, setCurrentProductId] = useState<string>("");

    const { data, setData, post, processing, errors, transform } = useForm<{
        cliente_id: string;
        metodo_pago: string;
        items: SaleItem[];
        subtotal: number;
        impuesto: number;
        total: number;
    }>({
        cliente_id: '',
        metodo_pago: 'efectivo',
        items: [] as SaleItem[],
        subtotal: 0,
        impuesto: 0,
        total: 0,
    });

    const totals = useMemo(() => {
        const subtotal = selectedItems.reduce((acc, item) => acc + item.precio_total, 0);
        const impuesto = subtotal * 0.10; // Asumiendo 10% de IVA
        const total = subtotal + impuesto;
        return { subtotal, impuesto, total };
    }, [selectedItems]);

    const handleAddProduct = () => {
        if (!currentProductId) return;

        const product = products.find(p => p.id === Number(currentProductId));
        if (!product) return;

        const existingItem = selectedItems.find(item => item.producto_id === product.id);
        
        if (existingItem) {
            if (existingItem.cantidad + 1 > product.cantidad_stock) {
                alert("No hay suficiente stock disponible");
                return;
            }
            setSelectedItems(selectedItems.map(item => 
                item.producto_id === product.id 
                    ? { ...item, cantidad: item.cantidad + 1, precio_total: (item.cantidad + 1) * item.precio_unitario }
                    : item
            ));
        } else {
            if (product.cantidad_stock < 1) {
                alert("Producto sin stock");
                return;
            }
            setSelectedItems([...selectedItems, {
                producto_id: product.id,
                nombre: product.nombre,
                precio_unitario: Number(product.precio),
                cantidad: 1,
                precio_total: Number(product.precio),
                stock_disponible: product.cantidad_stock
            }]);
        }
        setCurrentProductId("");
    };

    const handleRemoveItem = (productId: number) => {
        setSelectedItems(selectedItems.filter(item => item.producto_id !== productId));
    };

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        const item = selectedItems.find(i => i.producto_id === productId);
        if (!item) return;

        if (newQuantity > item.stock_disponible) {
            alert("Stock insuficiente");
            return;
        }

        if (newQuantity < 1) return;

        setSelectedItems(selectedItems.map(i => 
            i.producto_id === productId 
                ? { ...i, cantidad: newQuantity, precio_total: newQuantity * i.precio_unitario }
                : i
        ));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItems.length === 0) {
            alert("Debe agregar al menos un producto");
            return;
        }

        transform((curr) => ({
            ...curr,
            items: selectedItems,
            subtotal: totals.subtotal,
            impuesto: totals.impuesto,
            total: totals.total,
        }));
        post(salesRoutes.store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales | Create" />
            
            <div className="p-6">
                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cliente_id">Select Customer</Label>
                                    <Select 
                                        value={data.cliente_id} 
                                        onValueChange={(val) => setData('cliente_id', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose a customer" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {customers.map(c => (
                                                <SelectItem key={c.id} value={c.id.toString()}>
                                                    {c.nombre} - {c.numero_documento}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.cliente_id && <p className="text-red-500 text-xs">{errors.cliente_id}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="metodo_pago">Payment Method</Label>
                                    <Select 
                                        value={data.metodo_pago} 
                                        onValueChange={(val) => setData('metodo_pago', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="efectivo">Efectivo</SelectItem>
                                            <SelectItem value="tarjeta">Tarjeta</SelectItem>
                                            <SelectItem value="transferencia">Transferencia</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-lg font-semibold mb-4">Add Products</h2>
                            <div className="flex gap-4 mb-6">
                                <div className="flex-1">
                                    <Select 
                                        value={currentProductId} 
                                        onValueChange={setCurrentProductId}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Search product..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {products.map(p => (
                                                <SelectItem key={p.id} value={p.id.toString()}>
                                                    {p.nombre} ({p.categoria?.nombre}) - ${p.precio} [Stock: {p.cantidad_stock}]
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="button" onClick={handleAddProduct} variant="outline">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add
                                </Button>
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead className="text-right">Price</TableHead>
                                            <TableHead className="text-center">Quantity</TableHead>
                                            <TableHead className="text-right">Total</TableHead>
                                            <TableHead className="text-center">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedItems.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                                    No products added yet
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            selectedItems.map((item) => (
                                                <TableRow key={item.producto_id}>
                                                    <TableCell className="font-medium">{item.nombre}</TableCell>
                                                    <TableCell className="text-right">${item.precio_unitario.toFixed(2)}</TableCell>
                                                    <TableCell className="text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Input 
                                                                type="number" 
                                                                className="w-20 text-center"
                                                                value={item.cantidad}
                                                                min={1}
                                                                max={item.stock_disponible}
                                                                onChange={(e) => handleQuantityChange(item.producto_id, parseInt(e.target.value))}
                                                            />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">${item.precio_total.toFixed(2)}</TableCell>
                                                    <TableCell className="text-center">
                                                        <Button 
                                                            type="button" 
                                                            variant="ghost" 
                                                            size="icon"
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={() => handleRemoveItem(item.producto_id)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-6">
                            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span>${totals.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Tax (16%)</span>
                                    <span>${totals.impuesto.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between font-bold text-xl">
                                    <span>Total</span>
                                    <span className="text-primary">${totals.total.toFixed(2)}</span>
                                </div>
                                <Button 
                                    type="submit" 
                                    className="w-full mt-6" 
                                    size="lg"
                                    disabled={processing || selectedItems.length === 0}
                                >
                                    Complete Sale
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
