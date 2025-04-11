import React, { useRef, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export function VerificationEmailPage() {
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const toast = useToast();
  const navigate = useNavigate();
  const { error, isLoading: loading, verifyEmail, resendVerificationCode } = useAuthStore();
  

  const handleVerification = async (e) => {
    e.preventDefault();
    const codeString = code.join("");
  
    if (codeString.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit verification code.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
  
    try {
      await verifyEmail(codeString);
      
      // ✅ Show success message
      toast({
        title: "Account Verified",
        description: "Your email has been successfully verified.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
  
      navigate("/"); // Redirect to home or login page
    } catch (err) {
      console.error("Verification error:", err);
  
      // ✅ Show error message
      toast({
        title: "Verification Failed",
        description: err.message || "Invalid or expired verification code.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  

  
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  
  const handlePaste = (e) => {
    const pastedCode = e.clipboardData.getData("text").slice(0, 6).split("");
    setCode(pastedCode);
    const lastFilledIndex = pastedCode.length - 1;
    inputsRef.current[lastFilledIndex]?.focus();
  };

 
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

 
  const handleResendCode = async () => {
    try {
      await resendVerificationCode();
      alert("Verification code sent again to your email!");
    } catch (error) {
      console.log("Resend error:", error);
      alert("Failed to resend verification code. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Verify Your Account</h2>
        <form onSubmit={handleVerification} className="space-y-6">
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-md text-center mb-4">
              {error}
            </div>
          )}
          <p className="text-gray-600 text-center mb-6">
            Enter the 6-digit code we sent to your email.
          </p>
          
          <div onPaste={handlePaste} className="flex justify-between mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-14 text-center bg-transparent text-black border-2 border-gray-300 rounded-md text-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleResendCode}
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              Resend Code
            </button>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md focus:outline-none hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                "Verify Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
