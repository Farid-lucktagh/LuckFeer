<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->enum('tipo_documento', ['cedula', 'tarjeta_identidad', 'pasaporte']);
            $table->string('numero_documento', 50)->unique();
            $table->string('telefono', 20)->nullable();
            $table->string('correo')->nullable();
            $table->text('direccion')->nullable();
            $table->decimal('total_compras', 10, 2)->default(0);
            $table->enum('estado', ['activo', 'inactivo'])->default('activo');
            $table->timestamps();

            $table->index('nombre');
            $table->index('tipo_cliente');
            $table->index('estado');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};


