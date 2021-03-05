<?php
namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function __construct()
    {
        $this->middleware(['guest']);
    }
    public function index()
    {
        return view('auth.register');
    }
    public function store(Request $request)
    { //dd($request->only('email','password'));
        //validation
        //dd($request->email);
        $request->validate([
        'name' => 'required|max:255',
        'username' => 'required|max:255',
        'email' =>'required|email|max:255',
        'password'=>'required|confirmed'
    ]);
        User::create([
        'name'=>$request->name,
        'username'=>$request->username,
        'email'=>$request->email,
        'password'=>Hash::make($request->password),
    ]);
        Auth::attempt($request->only('email','password'));
       return redirect()->route('dashboard');
       //$credentials = $request->only('email', 'password');

        //if (Auth::attempt($credentials)) {
            // Authentication passed...
            //return redirect()->intended('dashboard');
       // }
    }
}
