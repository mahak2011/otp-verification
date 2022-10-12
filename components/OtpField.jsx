import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

const pinLength = 6;

const OtpField = () => {
  useEffect(() => {
    const resetValue = (i) => {
      for (let x = 0; x < pinLength; x++) {
        if (x >= i) document.getElementById(`codefield_${x}`).value = '';
      }
    };

    const stepForward = (e, i) => {
      if (e.key === 'Backspace') {
        if (i != 0 && document.getElementById(`codefield_${i - 1}`).value) {
          document.getElementById(`codefield_${i - 1}`).focus();
          document.getElementById(`codefield_${i - 1}`).value = '';
        }
        return;
      }
      if (
        i != pinLength - 1 &&
        document.getElementById(`codefield_${i}`).value
      ) {
        document.getElementById(`codefield_${i + 1}`).focus();
        document.getElementById(`codefield_${i + 1}`).value = '';
      }
      // verifyOtp();
    };

    for (let i = 0; i < pinLength; i++) {
      const input = document.querySelector(`#codefield_${i}`);
      if (!input) {
        return;
      }
      input.addEventListener('keyup', (e) => stepForward(e, i));
      input.addEventListener('focus', () => resetValue(i));
    }

    return () => {
      for (let i = 0; i < pinLength; i++) {
        const input = document.querySelector(`#codefield_${i}`);
        if (!input) {
          return;
        }
        input.removeEventListener('keyup', (e) => stepForward(e, i));
        input.removeEventListener('focus', () => resetValue(i));
      }
    };
  }, []);

  const verifyOtp = () => {
    let code = '';
    for (let i = 0; i < pinLength; i++) {
      code = code + document.getElementById(`codefield_${i}`).value;
    }

    if (code.length === pinLength && window.confirmationResult) {
      window.confirmationResult
        .confirm(code)
        .then((result) => {
          const user = result.user;
          toast.success('Successfully verified!');
          console.log(result, user);
        })
        .catch((error) => {
          toast.error('Oops! You Have Entered Wrong OTP!');
        });
    } else {
      toast.error('Enter All 6 Digits');
    }
  };

  return (
    <div>
      <div className="font-Poppins px-2 pb-4 text-xl text-center">
        Enter OTP
      </div>
      <div className="flex">
        {[...Array(pinLength).keys()].map((item, i) => (
          <input
            key={i}
            autoFocus={i === 0}
            id={`codefield_${i}`}
            className="h-16 w-12 border mx-2 rounded-lg flex items-center text-center font-thin text-3xl"
            maxLength="1"
            max="9"
            min="0"
            inputMode="decimal"
          />
        ))}
      </div>
      <button
        className="bg-[#fdc886] w-full mt-6 text-gray-800 font-Poppins py-2 px-4 rounded-lg shadow"
        onClick={verifyOtp}
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OtpField;
