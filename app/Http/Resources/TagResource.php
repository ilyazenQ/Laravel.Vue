<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class TagResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request) // возвращаем массив, значение
        // это обращение к свойству или методу модели, ключ может быть произвольиным

    {
        return [
            'id'=>$this->id,
            'label'=>Str::ucfirst($this->label),
        ];
    }
}
