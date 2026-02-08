<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('invoice-items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('factura_id')
                  ->constrained('facturas')
                  ->cascadeOnDelete();

            $table->foreignId('producto_id')
                  ->constrained('products')
                  ->restrictOnDelete();

            $table->string('nombre_producto', 255);
            $table->string('categoria_producto', 255);

            $table->integer('cantidad');
            $table->decimal('precio_unitario', 10, 2);
            $table->decimal('subtotal', 10, 2);

            $table->timestamp('creado_en')->useCurrent();

            $table->index('factura_id');
            $table->index('producto_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoice-items');
    }
};

