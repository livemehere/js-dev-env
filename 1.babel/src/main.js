
const delay = (ms)=>{
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(null)
        },ms)
    })
}

