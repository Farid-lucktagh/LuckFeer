<?php

namespace App\Http\Controllers;

use App\Models\sale;
use App\Http\Requests\StoresaleRequest;
use App\Http\Requests\UpdatesaleRequest;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('sales/index',[
            'sales' => sale::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('sales/create', [
            'sale' => new sale(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoresaleRequest $request)
    {
        $valued = $request->validated();
        sale::create($valued);
        return redirect()->route('sales.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(sale $sale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(sale $sale)
    {
        return inertia('sales/edit', [
            'sale' => $sale,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatesaleRequest $request, sale $sale)
    {
        $valued = $request->validated();
        $sale->update($valued);
        return redirect()->route('sales.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(sale $sale)
    {
        $sale->delete();
        return redirect()->route('sales.index');
    }
}
