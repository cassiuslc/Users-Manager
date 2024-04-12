<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
/**
 * @OA\Ignore
 */
class IndexRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'perPage' => 'integer|min:1|max:100',
        ];
    }

    public function messages()
    {
        return [
            'perPage.integer' => 'O valor de "perPage" deve ser um número inteiro.',
            'perPage.min' => 'O valor de "perPage" deve ser no mínimo :min.',
            'perPage.max' => 'O valor de "perPage" deve ser no máximo :max.',
        ];
    }
}
