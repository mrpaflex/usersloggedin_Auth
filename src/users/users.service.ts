import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { usersDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>){}
// createuserlogic(body: usersDto){
//     const userhold = this.repo.create(body);
//     return this.repo.save(userhold);

    createuser(email: string, password: string){
        const userhold = this.repo.create({email, password});
        return this.repo.save(userhold);
}

// async allusers(){
//     const allusers = await this.repo.find();
//     if (!allusers) {
//         throw new Error(`no user in the database yet`);
//     }
//     return allusers;
// }

async findoneuser(id: number) {
    const user = await this.repo.findOne({where: {id}});
    if(!user){
        throw new NotFoundException('user not found');
    }
    return user;
}

 finduser(email: string){
    return  this.repo.find({where: {email}});
}

async updateuserInfo(id: number, body: Partial<UserEntity>){
    const userfind =  await this.repo.findOneBy({id});

    if(!userfind){
        throw new NotFoundException(`user not found with such id to update`);
    }
   const updateduser =  Object.assign(userfind, body);
    return this.repo.save(updateduser);
}

async reomveuser(id: number){
    const finduser = await this.repo.findOneBy({id});
    if (!finduser) {
        throw new NotFoundException(`user doesn't exit`);
    }
    return await this.repo.remove(finduser);
}

}