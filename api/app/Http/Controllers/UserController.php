<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\StoreRequest;
use App\Http\Requests\UpdateRequest;
use App\Http\Requests\IndexRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    /**
     * API para operações CRUD de usuários
     *
     * Este controlador é responsável pelo gerenciamento dos usuários,
     * utilizando a estrutura para operações CRUD de usuários
     *
     * @return void
     *
     * @OA\Tag(name="Users", description="Operações relacionadas à gestão dos usuários")
     */
    public function __construct() {
    }

    /**
     * @OA\Get(
     *     path="/api/users",
     *     tags={"Users"},
     *     security={{"bearerAuth": {}}},
     *     summary="Display all users",
     *     description="Display all users.",
     *     @OA\Parameter(
     *         name="perPage",
     *         in="query",
     *         description="Number of users per page",
     *         required=false,
     *         @OA\Schema(type="integer", default=10)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of users",
     *         @OA\JsonContent(
     *             @OA\Property(property="users", type="array", @OA\Items(type="object"))
     *         )
     *     )
     * )
     */
    public function index(IndexRequest $request)
    {
        $perPage = $request->query('perPage', 10);
        $page = $request->query('page', 1);

        $sortBy = $request->query('sortBy', 'updated_at');
        $sortOrder = $request->query('sortOrder', 'desc');
        $searchTerm = trim($request->query('search'));

        // Inicializa a query de usuários
        $query = User::query();

        // Aplica a pesquisa genérica
        if (!empty($searchTerm)) {
            $value = preg_replace('/[^a-zA-Z0-9]/', '', $searchTerm);
            if (is_numeric($value)) {
                $query->where(function ($query) use ($value) {
                    $query->where('id', 'LIKE', "%$value%")
                        ->orWhere('cpf', 'LIKE', "%$value%");
                });
            } else {
                $query->where(function ($query) use ($searchTerm) {
                    $query->where('name', 'LIKE', "%$searchTerm%")
                        ->orWhere('email', 'LIKE', "%$searchTerm%");
                });
            }
        }


        // Aplica a ordenação, se fornecida
        if ($sortBy && $sortOrder) {
            $query->orderBy($sortBy, $sortOrder);
        }

        // Obtém os usuários paginados
        $users = ($perPage == -1)
        ? $query->paginate($query->count(), ['*'], 'page', $page)
        : $query->paginate($perPage, ['*'], 'page', $page);


        // Retorna a resposta JSON com os usuários paginados
        return response()->json(['users' => $users], 200);
    }


    /**
     * @OA\Get(
     *     path="/api/users/{id}",
     *     tags={"Users"},
     *     security={{"bearerAuth": {}}},
     *     summary="Display the specified user",
     *     description="Display the specified user by ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the user",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User found",
     *         @OA\JsonContent(
     *             @OA\Property(property="user", type="object")
     *         )
     *     )
     * )
     */
    public function show($id): JsonResponse
    {
        Validator::make(["id" => $id], [
            'id' => 'required|integer|exists:users,id'
        ])->validate();

        $user = User::findOrFail($id);
        return response()->json(['user' => $user], 200);
    }

    /**
     * @OA\Put(
     *     path="/api/users/{id}",
     *     tags={"Users"},
     *     summary="Update the specified user",
     *     security={{"bearerAuth": {}}},
     *     description="Update the specified user by ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the user",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="cpf", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="password", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *             @OA\Property(property="user", type="object")
     *         )
     *     )
     * )
     */
    public function update(UpdateRequest $request, $id): JsonResponse
    {
        Validator::make(["id" => $id], [
            'id' => 'required|integer|exists:users,id'
        ])->validate();

        $user = User::findOrFail($id);
        $data = $request->only(['name', 'email', 'password']);
        $this->validateAndProcessCpf($request, $data, $id);
        $user->update($data);
        return response()->json(['message' => 'Usuário atualizado com sucesso!', 'user' => $user], 200);
    }

    private function validateAndProcessCpf($request, &$data, $id)
    {
        if ($request->has('cpf')) {
            $cpf = preg_replace('/[^0-9]/', '', $request->input('cpf'));
            $data['cpf'] = $cpf;
            $existingUser = User::where('cpf', $cpf)->where('id', '!=', $id)->exists();
            if ($existingUser) {
                abort(response()->json(['message' => 'O CPF já está em uso por outro usuário.'], 422));
            }
        }
    }

    /**
     * @OA\Post(
     *     path="/users/create",
     *     tags={"Users"},
     *     summary="Create a new user",
     *     description="Create a new user.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="cpf", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="password", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *             @OA\Property(property="user", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Failed to create user",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     )
     * )
     */
    public function register(RegisterRequest $request, $id): JsonResponse
    {
        $data = $request->only(['name', 'cpf', 'email', 'password']);
        $user = User::create($data);
        if ($user) {
            return response()->json(['message' => 'Usuário criado com sucesso!', 'user' => $user], 201);
        }
        return response()->json(['message' => 'Falha ao criar usuário.'], 500);
    }

    /**
     * @OA\Delete(
     *     path="/api/users/{id}",
     *     tags={"Users"},
     *     summary="Remove the specified user",
     *     security={{"bearerAuth": {}}},
     *     description="Remove the specified user by ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the user",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User removed successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string")
     *         )
     *     )
     * )
     */
    public function destroy($id): JsonResponse
    {
        Validator::make(["id" => $id], [
            'id' => 'required|integer|exists:users,id'
        ])->validate();

        $user = User::findOrFail($id);

        $user->delete();

        return response()->json(['message' => 'Usuário removido com sucesso!'], 200);
    }
}
