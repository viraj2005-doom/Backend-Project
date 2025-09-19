//const asynchandler = (requestHandler) => {
    //    return async (req,res,next) => {
    //        Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err));
//    }}


//uparnu function su kare che? je higher order function che

//higher order function atle function ne pote input le ane ane biju ek function j return kare





export {asynchandler}



//function ni andar function nakhvu
const asynchandler = (fn) => async (req,res,next) => {
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}





//higher order function su che? 
//je function ne argument tarike lai ne biji function return kare