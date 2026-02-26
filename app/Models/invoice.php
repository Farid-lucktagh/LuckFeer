<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $table = 'invoices';

    public $timestamps = false;

    protected $fillable = [
        'codigo',
        'cliente_id',
        'usuario_id',
        'subtotal',
        'porcentaje_iva',
        'monto_iva',
        'descuento',
        'total',
        'metodo_pago',
        'estado',
        'notas',
        'fecha_emision',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'monto_iva' => 'decimal:2',
        'descuento' => 'decimal:2',
        'total' => 'decimal:2',
        'fecha_emision' => 'datetime',
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
        return $this->hasMany(InvoiceItem::class, 'factura_id');
    }
}
