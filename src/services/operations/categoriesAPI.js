import { apiConnector } from "../apiConnector"
import { categories } from "../apis"

export const getAllCategorys = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", categories.GET_CATEGORIES_API);
        console.log("GET CATEGORIES API RESPONSE...........",response)
        result = response.data.data
    } catch (error) {
        console.log("GET CATEGORIES API ERROR ......", error)
    }
    return result;
}