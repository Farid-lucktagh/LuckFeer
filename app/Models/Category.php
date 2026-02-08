<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [
        'nombre',
        'descripcion',
        'color',
        'estado',
    ];

    /**
     * =====================
     * Relaciones
     * =====================
     */

    // Una categoría tiene muchos productos
    public function productos()
    {
        return $this->hasMany(Product::class, 'categoria_id');
    }

    /**
     * =====================
     * Scopes
     * =====================
     */

    public function scopeActivas($query)
    {
        return $query->where('estado', 'activo');
    }
}
