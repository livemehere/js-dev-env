import './style.css'
import sm from '@/shared/me';
import jsImg from '@/assets/js.png';
import data from '@/assets/data.json';
import * as math from '@/shared/math';
import {a} from '@/shared/b';
import obj from "@/shared/me";


const img = new Image()
img.src = jsImg;
document.body.appendChild(img);

console.log(1)

import('@/shared/me').then((res) => {
    console.log(res.default.count)
})