<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\StoreRequest;
use App\Http\Requests\UpdateRequest;
use App\Http\Requests\IndexRequest;
use App\Http\Requests\DestroyRequest;
use App\Http\Requests\ShowRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request): JsonResponse
    {
        $userData = $request->only(['name', 'cpf', 'email', 'password']);
        $user = User::create($userData);
        if ($user) {
            return response()->json(['message' => 'Usuário criado com sucesso!', 'user' => $user], 201);
        }
        return response()->json(['message' => 'Falha ao criar usuário.'], 500);
    }

    /**
     * Display all resource.
     */
    public function index(IndexRequest $request): JsonResponse
    {
        $perPage = $request->query('perPage', 10);
        $users = User::paginate($perPage);
        return response()->json(['users' => $users], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowRequest $request): JsonResponse
    {
        $id = $request->query('id');
        $user = User::findOrFail($id);
        return response()->json(['user' => $user], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request): JsonResponse
    {
        $id = $request->query('id');
        $user = User::findOrFail($id);

        $validatedData = $request->validated();

        $user->update($validatedData);

        return response()->json(['message' => 'Usuário atualizado com sucesso!', 'user' => $user], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DestroyRequest $request): JsonResponse
    {
        $id = $request->query('id');
        $user = User::findOrFail($id);

        $user->delete();

        return response()->json(['message' => 'Usuário removido com sucesso!'], 200);
    }
}
