<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
/**
 * @OA\Ignore
 */
class ShowRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id' => 'required|integer|exists:users,id',
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'O campo "id" é obrigatório.',
            'id.integer' => 'O campo "id" deve ser um número inteiro.',
            'id.exists' => 'O "id" especificado não existe.',
        ];
    }
}
