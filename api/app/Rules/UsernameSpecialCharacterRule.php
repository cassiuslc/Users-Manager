<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UsernameSpecialCharacterRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (preg_match('/[^a-zA-Z\'\sÀ-ÖØ-öø-ÿ]/u', $value)) {
            $fail('O nome de usuário não pode conter caracteres especiais ou números.');
        }
    }
}
