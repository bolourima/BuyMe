## About "BUY ME"

Манай веб сайт нь бүх төрлийн бараа бүтээгдэхүүнийг худалдаалдаг бөгөөд зах зээлд эрэлт хэрэгцээтэй шинэлэг бүхнийг хэрэглэгчдэд санал болгож байна.

Мөн манай веб сайтаар дамжуулан хувиараа бизнес эрхлэгч болон бизнесийн цар хүрээгээ тэлэх хүсэлтэй хуулийн итгээд веб ээр дамжуулан бараа бүтээгдэхүүнээ худалдан борлуулах боломжийг олгодог давуу талтай


## Веб сайтаар зочилох

user-fe (buy-me-delta.vercel.app)
admin-fe (buy-me-9vt7.vercel.app)
backend - (buyme-x6zl.onrender.com)


## Асаах заавар

1. Backend хавтаст ".env" файл үүсгэнэ.

2. ".env" файл дотор teams дээрх мэдээллийг оруулж, хадгална.

3. Терминалаа slip хийнэ. Та терминал хэсгийн зүүн дээд хэсэгт байрлах terminal slip хийх товчлуурыг дарж хувааж болно. Эсвэл доорх гар хослолуудыг ашиглана уу.

Гар хослол:
- терминал хэсэг курсороо байршуулж "command" товчийг "\" товчтой хамт дарж терминалаа /slip/ хуваана.
- windows ээр "ctrl" + "shift" + "5" товчнуудыг зэрэг дарж хуваана.

4. Эхний терминал дээр доорх командуудыг дарааллын дагуу оруулна.

```zsh
cd backend
#
npm install
#
npx nodemon index.ts
```
Дээрх командуудыг оруулсны дараа backend [http://localhost:8800] port дээр асна.

5. Хоёр дахь терминал дээр доорх командуудыг дарааллын дагуу оруулна.

```zsh
cd frontend
#
npm install
#
npm run dev
```

Дээрх командуудыг оруулсны дараа backend [http://localhost:3000] port дээр асна.


