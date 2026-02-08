<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $table = 'customers';

    protected $fillable = [
        'nombre',
        'tipo_documento',
        'numero_documento',
        'telefono',
        'correo',
        'direccion',
        'tipo_cliente',
        'total_compras',
        'estado',
    ];

    protected $casts = [
        'total_compras' => 'decimal:2',
    ];

    /**
     * =====================
     * Relaciones
     * =====================
     */

    public function ventas()
    {
        return $this->hasMany(Sale::class, 'cliente_id');
    }
}
