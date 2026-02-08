<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $table = 'suppliers';

    protected $fillable = [
        'nombre',
        'persona_contacto',
        'telefono',
        'correo',
        'direccion',
        'estado',
    ];

    /**
     * =====================
     * Relaciones
     * =====================
     */

    // Un proveedor tiene muchos productos
    public function productos()
    {
        return $this->hasMany(Product::class, 'proveedor_id');
    }

    /**
     * =====================
     * Scopes
     * =====================
     */

    public function scopeActivos($query)
    {
        return $query->where('estado', 'activo');
    }
}
