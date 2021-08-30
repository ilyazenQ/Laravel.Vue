<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() //осуществляет миграцию
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->string('slug')->unique();
            $table->text('body');
            $table->text('img');
            $table->timestamps(); // два поля created_at updated_at время создания/изменения
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() //откатывает
    {
        Schema::dropIfExists('articles');
    }
}
