import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : {
        type : String ,
        required: function() { return this.provider === ProviderEnum.System }, 
            minLength:[2 , "FirstName cannot be less than 2 characters, you entered {VALUE}"] ,
            maxLength: 25 , 
            trim : true 
    } , 
    lastName :{
        type:String , 
        required: function() { return this.provider === ProviderEnum.System },
        minLength:[2 , "LastName cannot be less than 2 characters, you entered {VALUE}"] ,
        maxLength: 25 , 
        trim : true 
    },
    email :{
            type:String , 
            required:true , 
            unique:true ,
        },
    password :{
            type:String ,
            required:function(){
                    return this.provider === ProviderEnum.System
                }
        },
        gender:{
            type:Number, 
            enum :Object.values(GenderEnum),
            default : GenderEnum.Male 
        },










},{










})














