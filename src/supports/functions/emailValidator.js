// EMAIL VALIDATION
// 1. Index Paling Awal Tidak Boleh Dimulai dengan Angka
// 2. Ada String di Sebelum dan Sesudah @
// 3. Ada . Setelah String Sesudah @
// 4. Ada String Setelah .

function EmailValidator(email){
    // Apabila Email Mengandung Karakter Spasi
    for(var i = 0; i < email.length; i++){
        if(email[i] === ' ') return false
    }

    var emailSplit = email.split('@')
    if(emailSplit.length !== 2) return false
    var emailName = emailSplit[0]
    var hosting = emailSplit[1]

    if(emailName === '' || hosting === '') return false
    // Apabila Index Paling Awal Megandung Bilangan
    if(emailName[0] >= 0) return false

    var hostingSplit = hosting.split('.')
    if(hostingSplit.length !== 2) return false
    var domainName = hostingSplit[0]
    var extension = hostingSplit[1]

    if(domainName === '' || extension === '') return false
    return true
}

export default EmailValidator