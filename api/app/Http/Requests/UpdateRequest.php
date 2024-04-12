<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\CPF;
use App\Rules\PasswordStrengthRule;
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
        $id = $this->route('id');
        $password_required = !empty($this->input('password')) || !empty($this->input('confirmPassword'));

        return [
            'name' => 'required|string',
            'cpf' => ['required', 'string', new CPF, 'unique:users,cpf,' . $id],
            'email' => 'required|string|email|unique:users,email,' . $id,
            'password' => $password_required ? ['required', 'string', new PasswordStrengthRule] : 'nullable|string',
            'confirmPassword' => $password_required ? ['required', 'string', 'same:password', new PasswordStrengthRule] : 'nullable|string',
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
