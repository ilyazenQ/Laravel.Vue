<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
        'img',
        'slug'
    ]; // поля доступные при массовом заполнении
    protected $guarded = [

    ]; // поля не доступные при массовом заполнении
    // указываем отношения
    public  function scopeFindByTag($query)
    {
        return $query->with('tags','state')
            ->orderBy('created_at','desc')
            ->paginate(10);

    }

    public function scopeFindBySlug($query,$slug)
    {
        return $query->with('comments','tags','state')->where('slug',$slug)->firstOrFail();
    }

    public function comments() {
        return $this->hasMany(Comment::class);
        // Article может иметь много comment
    }
    public function state() {
        return $this->hasOne(State::class);
        // Имеет одно состояние
    }
    public function tags() {
        return $this->belongsToMany(Tag::class);
        // Имеет много tags
    }
    public function getBodyPreview(){
        return Str::limit($this->body,100);
    }
    public function createdAtForHumans(){
        return $this->created_at->diffForHumans();
    }
    public function scopeLastLimit($query,$num) {
       return $query->with('state','tags')->orderBy('created_at','desc')->take($num)->get();
    }
    public function scopeAllPaginate($query,$num) {
        return $query->with('state','tags')->orderBy('created_at','desc')->paginate($num);
    }
}
