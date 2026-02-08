<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sale-items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('venta_id')
                  ->constrained('sales')
                  ->cascadeOnDelete();

            $table->foreignId('producto_id')
                  ->constrained('products')
                  ->restrictOnDelete();

            $table->integer('cantidad');
            $table->decimal('precio_unitario', 10, 2);
            $table->decimal('precio_total', 10, 2);
            $table->timestamp('creado_en')->useCurrent();

            $table->index('venta_id');
            $table->index('producto_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sale-items');
    }
};


