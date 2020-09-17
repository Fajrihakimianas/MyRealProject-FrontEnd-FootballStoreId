// PHONE NUMBER VALIDATION
// 1. Nomor Harus Dimulai dari 0 / +62
// 2. Nomor Memiliki Panjang Minimal 9 Digit dan Maksimal 13 Digit

function PhoneNumberValidator(phone){
    if(phone[0] !== '0') return 'First Digit Of Phone Number Must Be Zero "0"'

    if((phone.length >= 9) && (phone.length <= 13)){
        for(var i = 0; i < phone.length; i++){
            if(!(phone[i] >= 0)){
                return 'Phone Number Inputs Must Be Numbers'
            }

            if(phone[i] === ' '){
                return 'Phone Number Inputs Without Space'
            }
        }
    }else{
        return 'Phone Number Lengths 9-13 Digits'
    }

    return true
}

export default PhoneNumberValidator