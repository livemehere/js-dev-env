
const delay = (ms)=>{
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(null)
        },ms)
    })
}

async function add(a,b){
    await delay(1000)
    return a+b
}