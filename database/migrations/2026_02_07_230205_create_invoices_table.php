<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('codigo', 50);

            $table->integer('documento');

            $table->foreignId('usuario_id')
                  ->constrained('users')
                  ->restrictOnDelete();

            $table->decimal('subtotal', 10, 2);
            $table->decimal('porcentaje_iva', 5, 2);
            $table->decimal('monto_iva', 10, 2);
            $table->decimal('descuento', 10, 2);
            $table->decimal('total', 10, 2);

            $table->enum('metodo_pago', ['efectivo', 'tarjeta', 'transferencia']);
            $table->enum('estado', ['completada', 'anulada', 'pendiente']);

            $table->text('notas')->nullable();
            $table->timestamp('fecha_emision');

            // índices útiles
            $table->index('codigo');
            $table->index('estado');
            $table->index('fecha_emision');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
