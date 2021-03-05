<?php
namespace App\Http\Controllers;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskContoller extends Controller
{
  public function index(){
    return Task::all();
    
  }  
  public function store(Request $request){
    return Task::create($request->all());
    
  } 
  public function update(Request $request,$id){
      $task=Task::findOrFail($id);
      $task->update($request->all());
      return $task;
  }
  public function delete($id){
      $task=Task::findOrFail($id);
      $task->delete();
      return 204;
  }
}

