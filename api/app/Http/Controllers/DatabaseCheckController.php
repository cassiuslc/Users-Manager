<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DatabaseCheckController extends Controller
{
    /**
     * API para operações de manipulação de banco de dados
     *
     * Este controlador é responsável pelo gerenciamento de ações no DB.
     *
     * @return void
     * @OA\Tag(name="DB", description="Operações relacionadas ao DB")
     */
    public function __construct() {
    }

    /**
     * Verifica a conexão com o banco de dados.
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Get(
     *      path="/api/db/check",
     *      tags={"DB"},
     *      summary="Verifica a conexão com o banco de dados",
     *      description="Verifica se é possível conectar ao banco de dados.",
     *      @OA\Response(
     *          response=200,
     *          description="Conexão com o banco de dados estabelecida",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example="true")
     *          )
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Erro ao conectar ao banco de dados",
     *          @OA\JsonContent(
     *              @OA\Property(property="status", type="boolean", example="false")
     *          )
     *      )
     * )
     */
    public function check()
    {
        try {
            DB::connection()->getPdo();
            return response()->json(['status' => true]);
        } catch (\Exception $e) {
            return response()->json(['status' => false]);
        }
    }

    /**
     * Gera 50 usuários de exemplo.
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Post(
     *      path="/api/db/generate-users",
     *      tags={"DB"},
     *      summary="Gera 50 usuários de exemplo",
     *      description="Gera 50 usuários fictícios para fins de teste.",
     *      @OA\Response(
     *          response=200,
     *          description="Usuários gerados com sucesso",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="50 usuários gerados com sucesso")
     *          )
     *      )
     * )
     */
    public function generateUsers()
    {
        User::factory()->count(50)->create();

        return response()->json(['message' => '50 usuários gerados com sucesso']);
    }

    /**
     * Limpa o banco de dados.
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Delete(
     *      path="/api/db/clear-database",
     *      tags={"DB"},
     *      summary="Limpa o banco de dados",
     *      description="Remove todos os registros do banco de dados.",
     *      @OA\Response(
     *          response=200,
     *          description="Banco de dados limpo",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Banco de dados limpo")
     *          )
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Erro ao limpar o banco de dados",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Erro ao limpar o banco de dados")
     *          )
     *      )
     * )
     */
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
