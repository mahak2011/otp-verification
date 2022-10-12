import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Pic1 from '../public/Typing-bro.png';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../config/firebase.config';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: (response) => {
          router.push('/otp');
        },
      },
      auth,
    );
  }, []);

  const [number, setNumber] = useState('');

  const handleNumber = () => {
    const regx = /^[6-9]\d{9}$/;

    if (regx.test(number)) {
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, `+91${number}`, appVerifier)
        .then((confirmationResult) => {
          window.phoneNumber = `+91${number}`;
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
          toast.error('Error sending OTP!');
          window.recaptchaVerifier.render().then(function (widgetId) {
            grecaptcha.reset(widgetId);
          });
        });
    } else {
      toast.error('Invalid Mobile Number!');
    }
  };
  return (
    <div className="flex justify-center items-center h-[100vh] bg-[#f5f2ea] font-Poppins">
      <div className=" flex flex-col h-50% w-50% px-16 py-10 justify-center bg-[#ffffff] rounded-2xl">
        <h1 className="text-3xl text-[#1d99f2] font-semibold">
          OTP Verification
        </h1>
        <Image src={Pic1} alt="" width={200} height={200} />
        <label className="block mb-2 text-md font-Poppins text-gray-900 mt-4">
          Enter Mobile Number
        </label>
        <input
          type="tel"
          id="num"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Mobile Number"
          onChange={(e) => setNumber(e.target.value)}
          required
        />
        <button
          id="sign-in-button"
          className="bg-[#fdc886] w-full mt-6 text-gray-800 font-Poppins py-2 px-4 rounded-lg shadow"
          onClick={handleNumber}
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default Home;
