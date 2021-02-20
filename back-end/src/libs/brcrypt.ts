import * as bcrypt from 'bcryptjs';


export async function generatePassword(plainTextPassword: string): Promise<string> {

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainTextPassword,salt);
    return hash;
}

export async function comparePasswords(plainTextPassword: string, hash: string): Promise<boolean> {

    const compare = await bcrypt.compare(plainTextPassword, hash);
    return compare;
}