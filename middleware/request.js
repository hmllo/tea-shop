// middleware
export const req = (req,res,next) => {
    console.log(res.body)
    next();
}

export const res = (req,res,next) => {
    console.log(res.body)
    next();
}