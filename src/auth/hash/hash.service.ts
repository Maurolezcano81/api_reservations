import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
    private readonly saltRounds = 10;


    async hashPwd(pwd: string): Promise<string> {

        const salt = await bcrypt.genSalt(this.saltRounds);

        const hashedPwd = bcrypt.hash(pwd, salt);

        return hashedPwd
    }


    async comparePwd(pwdInBD: string, pwdInBody: string): Promise<boolean> {

        const compare: boolean = await bcrypt.compare(pwdInBody, pwdInBD);

        return compare
    }
}
