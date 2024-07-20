import React, { useRef, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import asset from "../../assets/SignupBackground.png"
import { resendOtp, verifyOtp } from '../../Api/user';

const Otp = () => {
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(120); // 2 minutes timer (120 seconds)
    const [canResend, setCanResend] = useState(false);
    const formRef = useRef(null);
    const inputsRef = useRef(Array.from({ length: 4 }, () => useRef(null)));
    const navigate = useNavigate();

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer(prev => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    setCanResend(true);
                    clearInterval(countdown);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const handleKeyDown = (e, index) => {
        if (!/^[0-9]{1}$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && !e.metaKey) {
            e.preventDefault();
        }
    
        if (e.key === 'Backspace') {
            if (index > 0 && inputsRef.current[index - 1].current) {
                inputsRef.current[index - 1].current.focus();
            }
            if (inputsRef.current[index].current) {
                inputsRef.current[index].current.value = ''; // Clear current input
            }
        } else if (e.key === 'Delete') {
            if (index < inputsRef.current.length - 1 && inputsRef.current[index + 1].current) {
                inputsRef.current[index + 1].current.focus();
            }
            if (inputsRef.current[index].current) {
                inputsRef.current[index].current.value = ''; // Clear current input
            }
        }
    };
    
    
    

    const handleInput = (e, index) => {
        if (e.target.value) {
            if (index < inputsRef.current.length - 1 && inputsRef.current[index + 1].current) {
                inputsRef.current[index + 1].current.focus();
            }
        }
    };

    const handleFocus = index => {
        if (inputsRef.current && inputsRef.current[index].current) {
            inputsRef.current[index].current.select();
        }
    };

    const handlePaste = e => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        if (!/^[0-9]{4}$/.test(text)) {
            return;
        }
        const digits = text.split('');
        digits.forEach((digit, index) => {
            if (inputsRef.current && inputsRef.current[index]) {
                inputsRef.current[index].current.value = digit;
            }
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        let otp = inputsRef.current.map(input => input.current.value).join('');
        if (!otp) {
            toast.error("Please enter OTP");
            setLoading(false);
            return;
        }

        const response = await verifyOtp(otp);
        console.log( ' verufy------------------------------',response)
        setLoading(false);
        if (response.success) {
            toast.success(response.message);
            navigate("/auth/userLogin");
        } else if (response.response?.data?.error) {
            toast.error(response.response.data.error);
        } else {
            toast.error(response.response?.data?.message);
        }
    };

    const resendOtpHandler = async () => {
        
            const response = await resendOtp()
            if(response.success){

                toast.success("OTP sent to your email");
                setTimer(120); 
                setCanResend(false);
            }else{
                toast.error(response.error)
            }

    };

    return (
        <div className="relative font-inter antialiased background_color">
            <main className="relative min-h-screen flex flex-col justify-center overflow-hidden">
                <div className="w-full flex max-w-6xl mx-auto px-4 md:px-6 py-24 gap-3">
                    <div className="object-contain h-96 w-full hidden xl:block text-center px-4 sm:px-8">
                        <img className='w-full h-full' src={asset} alt="" />
                    </div>
                    <div className="flex justify-center">
                        <div className="max-w-4xl mx-auto max-h-svh text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow-2xl">
                            <Toaster position="top-right" reverseOrder={false} />
                            <header className="mb-8">
                                <h1 className="text-2xl font-bold mb-1">Email OTP Verification</h1>
                                <p className="text-[15px] text-slate-500">Enter the 4-digit verification code that was sent to your Email.</p>
                            </header>
                            <form ref={formRef} onSubmit={handleSubmit}>
                                <div className="flex items-center justify-center gap-3">
                                    {inputsRef.current.map((inputRef, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            className="w-14 h-14 border border-black text-center text-2xl font-extrabold text-slate-900 bg-blue-100 hover:border-slate-300 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                            pattern="\d*"
                                            maxLength={1}
                                            onKeyDown={e => handleKeyDown(e, index)}
                                            onInput={e => handleInput(e, index)}
                                            onFocus={() => handleFocus(index)}
                                            onPaste={handlePaste}
                                            ref={inputRef}
                                        />
                                    ))}
                                </div>
                                <div className="max-w-[260px] mx-auto mt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                                    >
                                        {loading ? 'Verifying...' : 'Verify Account'}
                                    </button>
                                </div>
                            </form>
                            <div className="text-sm text-slate-500 mt-4">Didn't receive code? {canResend ? (
                                <p className="font-medium text-indigo-500 hover:text-indigo-600 cursor-pointer" onClick={resendOtpHandler}>Resend</p>
                            ) : (
                                <p className="text-slate-400">Resend available in {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</p>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Otp;
