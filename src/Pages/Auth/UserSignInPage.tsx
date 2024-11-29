import React, { useState, useEffect } from "react";
import UserSignIn from "../../Components/Auth/UserSignIn";
import { useLoginUserMutation } from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Layouts/AuthLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Constants/Loader";

const UserSignInPage: React.FC = () => {
    const [loginUser] = useLoginUserMutation();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [failedAttempts, setFailedAttempts] = useState(0);
    const [captchaText, setCaptchaText] = useState("");

    const generateCaptchaText = () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let text = "";
        for (let i = 0; i < 5; i++) {
            text += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCaptchaText(text);
    };

    useEffect(() => {
        if (failedAttempts >= 3) generateCaptchaText();
    }, [failedAttempts]);

    const handleLogin = async (email: string, password: string, userCaptchaInput: string) => {
        if (failedAttempts >= 3 && userCaptchaInput !== captchaText) {
            toast.error("CAPTCHA text did not match. Please try again.");
            return;
        }

        try {
            setLoading(true);
            const result = await loginUser({ email, password }).unwrap();
            dispatch(setToken(result.access_token));
            if (result.refresh_token) {
                localStorage.setItem("refresh_token", result.refresh_token);
            }
            setFailedAttempts(0);
            if (result.user) {
                dispatch(setUser(result.user));
                toast.success("Login Successfull!", {
                    onClose: () => navigate("/user-dashboard"),
                    autoClose: 1000,
                });
            }
        } catch (error) {
            if (isAPIError(error)) {
                toast.error("Login error: " + error.data.message);
            } else if (error instanceof Error) {
                toast.error("Login error: " + error.message);
            } else {
                toast.error("An unknown error occurred");
            }
            setFailedAttempts((prev) => prev + 1);
        } finally {
            setLoading(false);
        }
    };
    const isAPIError = (error: any): error is { data: { message: string } } => {
        return error && typeof error === "object" && "data" in error && "message" in (error.data || {});
    };

    return (
        <AuthLayout>
            {loading ? (
                <div className="w-full h-[70vh] flex items-center justify-center">
                    <Loader text="Processing..." />
                </div>
            ) : (
                <UserSignIn
                    onSubmit={handleLogin}
                    showCaptcha={failedAttempts >= 3}
                    captchaText={captchaText}
                />
            )}
            <ToastContainer position="top-right" autoClose={1000} />
        </AuthLayout>
    );
};

export default UserSignInPage;
