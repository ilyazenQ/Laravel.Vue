<?php
// Гарантирует 100% исполнение, в job(очередь) отправляют тяжелые процессы (отправка писем и т.д), на выполнение отводится несколько попыток
namespace App\Jobs;


use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;


use App\Models\Comment;


class AddNewComment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3; // кол-во попыток

    protected $body;
    protected $subject;
    protected $article_id;


    public function __construct($subject, $body, $article_id)
    {
        // данные из комментария
        $this->subject = $subject;
        $this->body = $body;
        $this->article_id = $article_id;
    }

    public function handle()
    {
        // создание нового комментраия
        $comment = Comment::create([
            'subject' => $this->subject,
            'body' => $this->body,
            'article_id' => $this->article_id
        ]);
    }
}
