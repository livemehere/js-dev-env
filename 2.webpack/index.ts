import './style.css'


console.log('1')

import("@/shared/print").then((module) => {
    const print = module.default;
    print();
})