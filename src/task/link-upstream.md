Привязать апстрим к локальному каталогу
---------------------------------------

После того, как репозитарий склонирован, необходимо привязать
его к "чистовику".

Чтобы проверить, привязан ли локальный репозитарий к чистовику,
достаточно выполнить команду

```
git remote -v
```

(См. [список удалённых репозитариев](#list-remotes))

Если в полученном выводе нет ссылок на репозитарии организации
`htmlacademy-javascript`, необходимо привязать локальный репозитарий
к удалённому репозитарию `htmlacademy-javascript`.

Для этого нужно выполнить команду:

```
git remote add upstream {{ssh.upstream}}
```