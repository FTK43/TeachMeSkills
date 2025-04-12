- добавить в cli команду edit (возможность редактирования записи)
- ``` node app.js edit 5 'updated task' ```


- добавить в server в GET метод пагинацию
- ``` http://localhost:3000/notes?limit=4&page=3  ```
- ``` {
    "page": 3,
    "limit": 4,
    "total": 30,
    "totalPages": 8,
    "data": [
        {
            "id": 9,
            "title": "Посмотреть фильм"
        },
        {
            "id": 10,
            "title": "Сделать уборку"
        },
        {
            "id": 11,
            "title": "Изучить новый язык"
        },
        {
            "id": 12,
            "title": "Записаться на курс"
        }
      ]
  }  

