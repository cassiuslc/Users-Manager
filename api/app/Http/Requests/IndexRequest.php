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
            'search' => 'nullable|string|min:1|max:100',
            'perPage' => 'nullable|integer|min:-1|max:100',
            'sortOrder' => 'nullable|string|in:asc,desc',
            'sortBy' => 'nullable|string|min:1|max:100',
            'page' => 'nullable|integer|min:1|max:100',
        ];        
    }

    public function messages()
    {
        return [
            'perPage.integer' => 'O valor de "perPage" deve ser um número inteiro.',
            'perPage.min' => 'O valor de "perPage" deve ser no mínimo :min.',
            'perPage.max' => 'O valor de "perPage" deve ser no máximo :max.',
            'page.integer' => 'O valor de "page" deve ser um número inteiro.',
            'page.min' => 'O valor de "page" deve ser no mínimo :min.',
            'page.max' => 'O valor de "page" deve ser no máximo :max.',
        ];
    }
}
