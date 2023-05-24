import './style.css'
import sm from '@/shared/me';
import jsImg from '@/assets/js.png';
import data from '@/assets/data.json';

const img = new Image()
img.src = jsImg;
document.body.appendChild(img);

console.log(data)