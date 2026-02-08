<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $table = 'sales';

    protected $fillable = [
        'cliente_id',
        'usuario_id',
        'subtotal',
        'impuesto',
        'total',
        'metodo_pago',
        'estado',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'impuesto' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    /**
     * =====================
     * Relaciones
     * =====================
     */

    public function cliente()
    {
        return $this->belongsTo(Customer::class, 'cliente_id');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function items()
    {
        return $this->hasMany(SaleItem::class, 'venta_id');
    }
}
