<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
/**
 * @OA\Ignore
 */
class UpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string',
            'cpf' => 'required|string|unique:users,cpf,' . $this->id,
            'email' => 'required|string|email|unique:users,email,' . $this->id,
            'password' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'O campo "name" é obrigatório.',
            'name.string' => 'O campo "name" deve ser uma string.',
            'cpf.required' => 'O campo "cpf" é obrigatório.',
            'cpf.string' => 'O campo "cpf" deve ser uma string.',
            'cpf.unique' => 'Este CPF já está em uso.',
            'email.required' => 'O campo "email" é obrigatório.',
            'email.string' => 'O campo "email" deve ser uma string.',
            'email.email' => 'O campo "email" deve ser um email válido.',
            'email.unique' => 'Este email já está em uso.',
            'password.required' => 'O campo "password" é obrigatório.',
            'password.string' => 'O campo "password" deve ser uma string.',
        ];
    }
}
