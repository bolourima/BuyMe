## Нэршил

1. folder name - [camelCase]
2. component name - [PascalCase]

## Асаах заавар

1. Backend хавтаст ".env" файл үүсгэнэ.

2. ".env" файл дотор teams дээрх мэдээллийг оруулж, хадгална.

3. Терминалаа slip хийнэ. Та терминал хэсгийн зүүн дээд хэсэгт байрлах terminal slip хийх товчлуурыг дарж хувааж болно. Эсвэл доорх гар хослолуудыг ашиглана уу.

Гар хослол:
- терминал хэсэг курсороо байршуулж "command" товчийг "\" товчтой хамт дарж терминалаа /slip/ хуваана.
- windows ээр "ctrl" + "shift" + "5" товчнуудыг зэрэг дарж хуваана.

4. Эхний терминал дээр доорх командуудыг дарааллын дагуу оруулна.

```bash
cd backend
#
npm install
#
npx nodemon index.ts
```
Дээрх командуудыг оруулсны дараа backend [http://localhost:8800] port дээр асна.

5. Хоёр дахь терминал дээр доорх командуудыг дарааллын дагуу оруулна.

```bash
cd frontend
#
npm install
#
npm run dev
```

Дээрх командуудыг оруулсны дараа backend [http://localhost:3000] port дээр асна.

## Icon уудыг export import хийх заавар

1. Icon component ийг дараах загварын дагуу үүсгэж экспорт хийнэ.

```bash
export const ExampleIcon =()=>{
    return(
        <svg></svg>
    )
}
```

2. Icon оруулсан тухайн хавтас бүрд байгаа "index.ts" дараах загварын дагуу [БҮХ!] Icon уудаа экспорт хийнэ.

```bash
export * from "./ExampleIcon"
export * from "./ExampleShape"
```

3. Icon уудаа дараах байдлаар импорт хийж ашиглана.

ЗӨВ ИМПОРТ!
```bash
import { ExampleIcon , ExampleShape } from "@/components/icons/aboutPage";
```

БУРУУ импорт!
```bash
import {ExampleIcon} from "@/components/icons/aboutPage/ExampleIcon"
import {ExampleShape} from "@/components/icons/aboutPage/ExampleShape"
```
