<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Customer;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreInvoiceRequest;

/**
 * Controlador de Facturas
 * 
 * Gestiona la emisión, generación y administración de facturas.
 * Incluye lógica de generación de códigos único y manejo de ítems.
 * Integra información fiscal como IVA y descuentos.
 */
class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * Obtiene todas las facturas ordenadas por fecha de emisión.
     * 
     * @return \\Inertia\\Response
     */
    public function index()
    {
        $invoices = Invoice::with('cliente')->latest('fecha_emision')->get();

        return inertia('invoices/index', [
            'invoices' => $invoices,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * 
     * Carga el formulario de emisión de factura con clientes y productos.
     * 
     * @return \\Inertia\\Response
     */
    public function create()
    {
        return inertia('invoices/create', [
            'customers' => Customer::where('estado', 'activo')->get(),
            'products'  => Product::with('categoria')->where('estado', 'disponible')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * Crea factura con código único,  ítems y manejo transaccional.
     * 
     * @param  \\App\\Http\\Requests\\StoreInvoiceRequest  $request
     * @return \\Illuminate\\Http\\RedirectResponse
     */
    public function store(StoreInvoiceRequest $request)
    {
        $validated = $request->validated();

        try {
            DB::beginTransaction();

            // Resolver usuario_id valido
            $userId = optional(auth()->guard('web')->user())->id;
            if (!$userId) {
                $userId = User::query()->value('id');
            }
            if (!$userId) {
                $user = User::firstOrCreate(
                    ['email' => 'facturacion@local.test'],
                    [
                        'name'     => 'Facturacion',
                        'password' => Str::random(40),
                        'rol'      => 'cajero',
                        'estado'   => 'activo',
                    ]
                );
                $userId = $user->id;
            }

            // Generar codigo unico
            $lastInvoice = Invoice::orderByDesc('id')->first();
            $nextNumber  = $lastInvoice ? ((int) str_replace('FAC-', '', $lastInvoice->codigo)) + 1 : 1;
            $codigo      = 'FAC-' . str_pad($nextNumber, 6, '0', STR_PAD_LEFT);

            $invoice = Invoice::create([
                'codigo'        => $codigo,
                'documento'     => $validated['documento'],
                'usuario_id'    => $userId,
                'subtotal'      => $validated['subtotal'],
                'porcentaje_iva'=> $validated['porcentaje_iva'],
                'monto_iva'     => $validated['monto_iva'],
                'descuento'     => $validated['descuento'],
                'total'         => $validated['total'],
                'metodo_pago'   => $validated['metodo_pago'],
                'estado'        => 'completada',
                'notas'         => $validated['notas'] ?? null,
                'fecha_emision' => now(),
            ]);

            foreach ($validated['items'] as $item) {
                InvoiceItem::create([
                    'factura_id'        => $invoice->id,
                    'producto_id'       => $item['producto_id'],
                    'nombre_producto'   => $item['nombre_producto'],
                    'categoria_producto'=> $item['categoria_producto'],
                    'cantidad'          => $item['cantidad'],
                    'precio_unitario'   => $item['precio_unitario'],
                    'subtotal'          => $item['subtotal'],
                ]);

                // Decrementar stock
                $product = Product::find($item['producto_id']);
                $product->decrement('cantidad_stock', $item['cantidad']);

                if ($product->cantidad_stock <= 0) {
                    $product->update(['estado' => 'sin']);
                } elseif ($product->cantidad_stock <= $product->stock_minimo) {
                    $product->update(['estado' => 'bajo']);
                }
            }

            DB::commit();
            return redirect()->route('invoices.index')->with('success', 'Factura creada con exito');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Error al procesar la factura: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     * 
     * Elimina una factura y todos sus items asociados.
     * 
     * @param  \\App\\Models\\Invoice  $invoice
     * @return \\Illuminate\\Http\\RedirectResponse
     */
    public function destroy(Invoice $invoice)
    {
        $invoice->items()->delete();
        $invoice->delete();
        return redirect()->route('invoices.index')->with('success', 'Factura eliminada');
    }
}
