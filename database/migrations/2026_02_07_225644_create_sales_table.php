<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();

            $table->foreignId('cliente_id')
                  ->constrained('customers')
                  ->restrictOnDelete();

            $table->foreignId('usuario_id')
                  ->constrained('users')
                  ->restrictOnDelete();

            $table->decimal('subtotal', 10, 2);
            $table->decimal('impuesto', 10, 2);
            $table->decimal('total', 10, 2);

            $table->enum('metodo_pago', ['efectivo', 'tarjeta', 'transferencia']);
            $table->enum('estado', ['completada', 'cancelada'])->default('completada');
            $table->timestamps();

            $table->index('estado');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};


