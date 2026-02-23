<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    use HasFactory;

    protected $table = 'invoice-items';

    public $timestamps = false;

    protected $fillable = [
        'factura_id',
        'producto_id',
        'nombre_producto',
        'categoria_producto',
        'cantidad',
        'precio_unitario',
        'subtotal',
    ];

    protected $casts = [
        'precio_unitario' => 'decimal:2',
        'subtotal' => 'decimal:2',
    ];

    /**
     * =====================
     * Relaciones
     * =====================
     */

    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'factura_id');
    }

    public function producto()
    {
        return $this->belongsTo(Product::class, 'producto_id');
    }
}
