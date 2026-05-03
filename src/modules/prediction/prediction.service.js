import { BadRequestException } from "../../common/utils/index.js";

import axios from "axios";

// export const checkReadingsService = async (readings) => {
//     try {
//         console.log("Calling FastAPI...");

//         const response = await axios.post(
//         "http://13.50.124.36:8000/predict",
//         { readings },
//         { timeout: 5000 }
//         );

//         return response.data;

//     } catch (error) {
//         throw BadRequestException({
//         message: "Failed to connect to AI model ❌"
//         });
//     }
// };
// Test 
export const checkReadingsService = async (readings) => {
    try{
            console.log("INPUT:", readings);

    return {
        result: "test ok",
        confidence: 1,
        variation: 0
    };

    } catch (error) {
        throw BadRequestException({message : "Failed to connect to AI model ❌"})
    }
};
