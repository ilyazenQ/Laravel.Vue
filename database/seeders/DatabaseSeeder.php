<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \Api\Models\User::factory(10)->create();

        $tags = \App\Models\Tag::factory(10)->create();
        // создаем 10 тегов

        $articles = \App\Models\Article::factory(20)->create();
        // создаем 20 статей тегов
        $tags_id = $tags->pluck('id');
        // сохраняем все id все тегов в массив
        // https://laravel.com/docs/8.x/collections#method-pluck

        $articles->each(function ($article) use ($tags_id) { // проходим по созданным статьям
            $article->tags()->attach($tags_id->random(3)); // заполняем каждое поле в таблице article 3мя ранжомными тегами
            \App\Models\Comment::factory(3)->create([
                'article_id' => $article->id
            ]); // для каждой статьи создаем 3 коммента

            \App\Models\State::factory(1)->create([
                'article_id' => $article->id
            ]); // для каждой статьи создаем 1 элемент статистики
        });

    }
}
