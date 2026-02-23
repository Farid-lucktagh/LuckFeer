<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'documento'      => ['required', 'integer'],
            'metodo_pago'    => ['required', 'string', 'in:efectivo,tarjeta,transferencia'],
            'porcentaje_iva' => ['required', 'numeric', 'min:0'],
            'descuento'      => ['required', 'numeric', 'min:0'],
            'notas'          => ['nullable', 'string', 'max:1000'],
            'subtotal'       => ['required', 'numeric', 'min:0'],
            'monto_iva'      => ['required', 'numeric', 'min:0'],
            'total'          => ['required', 'numeric', 'min:0'],
            'items'                    => ['required', 'array', 'min:1'],
            'items.*.producto_id'      => ['required', 'integer', 'exists:products,id'],
            'items.*.nombre_producto'  => ['required', 'string'],
            'items.*.categoria_producto' => ['required', 'string'],
            'items.*.cantidad'         => ['required', 'integer', 'min:1'],
            'items.*.precio_unitario'  => ['required', 'numeric', 'min:0'],
            'items.*.subtotal'         => ['required', 'numeric', 'min:0'],
        ];
    }
}
