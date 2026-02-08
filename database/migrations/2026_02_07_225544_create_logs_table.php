<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();

            $table->foreignId('usuario_id')
                  ->constrained('users')
                  ->cascadeOnDelete();

            $table->string('accion', 100);
            $table->text('descripcion')->nullable();
            $table->timestamp('creado_en')->useCurrent();

            $table->index('accion');
            $table->index('creado_en');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};


