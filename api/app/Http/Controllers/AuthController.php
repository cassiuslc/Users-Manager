<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

/**
 * @OA\Info(
 *     title="APIS Users Manager",
 *     version="1.0.0",
 *     @OA\Contact(
 *         name="Support Cassius Lc",
 *         email="cassiuslc.dev@gmail.com"
 *     )
 * ),
 * @OA\Server(
 *     url="http://localhost",
 *     description="Base URL da API"
 * ),
 * @OA\SecurityScheme(
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     securityScheme="bearerAuth",
 *     in="header",
 * ),
 * @OA\ExternalDocumentation(
 *     description="GitHub Repository",
 *     url="https://github.com/cassiuslc/Users-Manager"
 * ),
 * @OA\Schema(
 *     schema="User",
 *     required={"id", "name", "email"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="The user's id"
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="The user's name"
 *     ),
 *     @OA\Property(
 *         property="cpf",
 *         type="string",
 *         description="The user's CPF"
 *     ),
 *     @OA\Property(
 *         property="email",
 *         type="string",
 *         description="The user's email"
 *     ),
 *     @OA\Property(
 *         property="email_verified_at",
 *         type="string",
 *         format="date-time",
 *         description="The timestamp when the user's email was verified"
 *     ),
 *     @OA\Property(
 *         property="created_at",
 *         type="string",
 *         format="date-time",
 *         description="The timestamp when the user was created"
 *     ),
 *     @OA\Property(
 *         property="updated_at",
 *         type="string",
 *         format="date-time",
 *         description="The timestamp when the user was last updated"
 *     ),
 * )
 */
class AuthController extends Controller
{

    /**
     * Controlador de Autenticação JWT
     *
     * Este controlador é responsável pelo gerenciamento de autenticação de usuários,
     * utilizando a estrutura de tokens JWT (JSON Web Tokens) para segurança e validação.
     *
     * @return void
     *
     * @OA\Tag(name="Authentication", description="Operações relacionadas à autenticação do usuário")
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @OA\Post(
     *     path="/api/auth/login",
     *     tags={"Authentication"},
     *     summary="Logs in a user",
     *     operationId="login",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Login")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         @OA\JsonContent(ref="#/components/schemas/Token"),
     *         description="Successful operation",
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *           @OA\Property(
     *             property="error",
     *             type="string",
     *             example="Unauthorized login"
     *           )
     *         )
     *     ),
     * )
     *
     * @OA\Schema(
     *     schema="Login",
     *     type="object",
     *     required={"email", "password"},
     *     @OA\Property(
     *         property="email",
     *         type="string",
     *         format="email",
     *         description="User's email address"
     *     ),
     *     @OA\Property(
     *         property="password",
     *         type="string",
     *         format="password",
     *         description="User's password"
     *     )
     * )

     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @OA\Get(
     *     path="/api/auth/me",
     *     tags={"Authentication"},
     *     summary="Get current user",
     *     description="Returns the details of the currently authenticated user",
     *     operationId="me",
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="User details",
     *         @OA\JsonContent(ref="#/components/schemas/User"),
     *     ),
     * )
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

     /**
     * Log the user out (Invalidate the token).
     *
     * @OA\Post(
     *     path="/api/auth/logout",
     *     tags={"Authentication"},
     *     summary="Log out",
     *     description="Logs out the user by invalidating the token",
     *     operationId="logout",
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Logged out successfully",
     *          @OA\JsonContent(
     *           @OA\Property(
     *             property="message",
     *             type="string",
     *             example="Successfully logged out"
     *            )
     *           )
     *     ),
     * )
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    /**
     * Refresh a token.
     *
     * @OA\Post(
     *     path="/api/auth/refresh",
     *     tags={"Authentication"},
     *     summary="Refresh token",
     *     description="Refreshes the JWT token",
     *     operationId="refresh",
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="New JWT token",
     *         @OA\JsonContent(ref="#/components/schemas/Token"),
     *     ),
     * )
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(Auth::refresh());
    }

     /**
     * Get the token array structure.
     *
     * @param string $token
     * @return \Illuminate\Http\JsonResponse
     *
     * @OA\Schema(
     *     schema="Token",
     *     type="object",
     *     description="The structure of the token response.",
     *     @OA\Property(
     *         property="access_token",
     *         type="string",
     *         description="The access token value.",
     *     ),
     *     @OA\Property(
     *         property="token_type",
     *         type="string",
     *         description="The type of the token. Should be 'bearer' (JWT).",
     *         example="bearer",
     *     ),
     *     @OA\Property(
     *         property="expires_in",
     *         type="integer",
     *         description="The number of seconds until the token expires.",
     *     ),
     * )
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

}