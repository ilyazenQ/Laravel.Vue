<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\AddNewComment;
use Illuminate\Http\Request;
use Validator;
use App\Http\Requests\Comment\CreateRequest;

class CommentController extends Controller
{
    public function store(CreateRequest $request) {
        //CreateRequest кастомный реквест App\Http\Requests\Comment в котором содержиться валидация
        AddNewComment::dispatch($request['subject'],$request['body'],$request["article_id"]); // передаем в job полученные данные
        //для создания нового комментраия

        return response()->json([
            'status'=>'success'
        ],201);



    }
}
