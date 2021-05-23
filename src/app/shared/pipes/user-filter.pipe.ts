import { Pipe, PipeTransform } from "@angular/core";
import { IUserRes } from "../interfaces/responses/user-res";

@Pipe({
    name: 'filterUser'
})
export class UserFilterPipe implements PipeTransform {

    transform(users: Array<IUserRes>, search: string) {
        
        if (!search) return users;

        return users.filter(u => {
            return  u.email.includes(search) ||
                    u.firstName.includes(search) ||
                    u.lastName.includes(search) ||
                    u.userId.includes(search)
        })
    }
}