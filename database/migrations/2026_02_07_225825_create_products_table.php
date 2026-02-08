<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->text('descripcion')->nullable();

            $table->foreignId('categoria_id')
                  ->constrained('categories')
                  ->restrictOnDelete();

            $table->foreignId('proveedor_id')
                  ->constrained('suppliers')
                  ->restrictOnDelete();

            $table->string('sku', 100)->unique()->nullable();
            $table->decimal('precio', 10, 2);
            $table->decimal('costo', 10, 2);
            $table->integer('cantidad_stock')->default(0);
            $table->integer('stock_minimo')->default(10);
            $table->enum('estado', ['activo', 'inactivo'])->default('activo');
            $table->timestamps();

            $table->index('nombre');
            $table->index('sku');
            $table->index('estado');
            $table->index('cantidad_stock');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};


