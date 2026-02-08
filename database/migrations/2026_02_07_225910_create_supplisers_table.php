<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('persona_contacto')->nullable();
            $table->string('telefono', 20)->nullable();
            $table->string('correo')->nullable();
            $table->text('direccion')->nullable();
            $table->enum('estado', ['activo', 'inactivo'])->default('activo');
            $table->timestamps();

            $table->index('nombre');
            $table->index('estado');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};


