import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import backArrow from '../public/back-button.png';
import toast from 'react-hot-toast';
import Link from 'next/link';
import OtpField from '../components/OtpField';

const Otp = () => {
  const resendOtp = () => {
    toast.success('OTP resent successfully');
  };
  return (
    <div className="flex justify-center items-center h-[100vh] bg-[#f5f2ea] font-Poppins">
      <div className=" flex flex-col h-50% w-50% px-16 py-10 justify-center bg-[#ffffff] rounded-2xl relative">
        <Link href="/" passHref>
          <a>
            <div className="w-7 h-7 absolute left-5 top-5">
              <Image src={backArrow} alt="" />
            </div>
          </a>
        </Link>
        <OtpField />
        <p
          id="resend-otp"
          onClick={resendOtp}
          className="text-sm mt-2 hover:underline underline-offset-4 cursor-pointer"
        >
          Resend OTP
        </p>
        <Link href="/" passHref>
          <a className="text-sm hover:underline underline-offset-4">
            Not your number?
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Otp;
