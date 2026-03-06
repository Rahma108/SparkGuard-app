import { forbiddenException } from "../response/error.response.js"
export const authorization =  ( )=>{
    return async  (req , res , next )=>{
        if (!req.user) {
      return res.status(401).json({ message: "User not logged in" });
    }
    // ممكن تضيف أي تحققات إضافية هنا لاحقًا
    next();

    }
}