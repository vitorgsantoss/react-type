export function isValidName(name:string){
    if (name.length < 3 || name.length > 255) return false;
    return true;
}

export function isValidPassword(password:string){
    if (password.length < 6 || password.length > 50) return false;
    return true;
}