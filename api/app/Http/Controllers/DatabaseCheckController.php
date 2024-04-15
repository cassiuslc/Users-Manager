<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DatabaseCheckController extends Controller
{
    public function check()
    {
        try {
            DB::connection()->getPdo();
            return response()->json(['status' => true]);
        } catch (\Exception $e) {
            return response()->json(['status' => false]);
        }
    }

    public function generateUsers()
    {
        User::factory()->count(50)->create();

        return response()->json(['message' => '50 usuários gerados com sucesso']);
    }

    public function clearDatabase()
    {
        DB::beginTransaction();

        try {
            User::query()->delete();
            DB::commit();
            
            return response()->json(['message' => 'Banco de dados limpo']);
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json(['message' => 'Erro ao limpar o banco de dados'], 500);
        }
    }
}