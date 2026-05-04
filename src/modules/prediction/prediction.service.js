import { BadRequestException } from "../../common/utils/index.js";

import axios from "axios";
import { PredictionModel } from "../../DB/model/prediction.model.js";

export const checkReadingsService = async (readings) => {
    try {
        console.log("Calling FastAPI...");

        const response = await axios.post(
        "http://13.50.124.36:8000/predict",
        { readings },
        { timeout: 5000 }
        );

            const data = response.data;

                save in DB
                await PredictionModel.create({
                    result: data.result,
                    confidence: data.confidence,
                    variation: data.variation
                });

                return data;

    } catch (error) {
        throw BadRequestException({
        message: "Failed to connect to AI model ❌"
        });
    }
};


// Test 
// export const checkReadingsService = async (readings) => {
//     try {
//         console.log("INPUT:", readings);

//         // mock logic (test only)
//         const result = "normal";
//         const confidence = 1;
//         const variation = 0;

//         // convert result → number
//         const prediction = result === "not normal" ? 1 : 0;

//         // save in DB
//         await PredictionModel.create({
//             result,
//             prediction,
//             confidence,
//             variation
//         });

//         // return response
//         return {
//             result,
//             prediction,
//             confidence,
//             variation
//         };

//     } catch (error) {
//         console.log(error);
//         throw BadRequestException({
//             message: "Failed to connect to AI model ❌"
//         });
//     }
// };

