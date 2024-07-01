import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { paymentEndpoints } from "../apis";
import { setPaymentLoading } from "../../features/courses/courseSlice";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = src;

        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

export const buyCourses = async (courses, token, userDetails, navigate, dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if(!response) {
            toast.error("Razorpay SDK failed to load");
            return
        }

        const orderResponse = await apiConnector("POST", paymentEndpoints.CAPTURE_PAYMENT_API, {courses}, {Authorization : `Bearer ${token}`})

        console.log("Order Response ", orderResponse)
        if(!orderResponse?.data?.success) {
            throw new Error("Order Reponse Error")
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            currency : orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "Edypros",
            description: "Thanks for purchasing this course" ,
            image: "https://res.cloudinary.com/cloudjerry07/image/upload/v1719820625/Edypros/logos/svknyeivcopnfmb1l8n8.png",
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email
            },
            handler: async function(response) {
                console.log("buyCourse -> response", response)
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
                verifyPayment({...response, courses}, token, navigate, dispatch)
            }
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        paymentObject.on("payment.failed", function(response) {
            toast.error("Payment Failed")
            console.log(response.error)
        })
    } catch (error) {
        console.log("PAYMENT API ERROR ....", error);
        toast.error("Unable to make payment !!")
    }
    toast.dismiss(toastId)
}

const sendPaymentSuccessEmail = async (response, amount, token) => {
    try {

        await apiConnector("POST", paymentEndpoints.SEND_PAYMENT_SUCCESSFULL_EMAIL_API, 
        {paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
        amount},
        {Authorization : `Bearer ${token}`});
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL API ERROR .........", error);

    }
}

const verifyPayment = async (bodyData, token, navigate, dispatch) => {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true))
    try {
        const response = await apiConnector("POST", paymentEndpoints.VERIFY_SIGNATURE_API, bodyData, {
            Authorization : `Bearer ${token}`
        })

        if(!response?.data?.success) {
            throw new Error(response.data.message)
        }

        toast.success("Payment Successfull. You Are Added to the course !!");
        navigate("/dashboard/registered-courses")
    } catch (error) {
        console.log("PAYMENT VERIFY API ERROR.......", error);
        toast.error("Could not verify payment !!")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}