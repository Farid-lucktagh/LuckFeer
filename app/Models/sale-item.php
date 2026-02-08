<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleItem extends Model
{
    use HasFactory;

    protected $table = 'sale_items';

    public $timestamps = false;

    protected $fillable = [
        'venta_id',
        'producto_id',
        'cantidad',
        'precio_unitario',
        'precio_total',
    ];

    protected $casts = [
        'precio_unitario' => 'decimal:2',
        'precio_total' => 'decimal:2',
    ];

    /**
     * =====================
     * Relaciones
     * =====================
     */

    public function venta()
    {
        return $this->belongsTo(Sale::class, 'venta_id');
    }

    public function producto()
    {
        return $this->belongsTo(Product::class, 'producto_id');
    }
}
