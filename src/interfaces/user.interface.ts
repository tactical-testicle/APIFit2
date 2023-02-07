export default interface IUser {
    ////////////////////////////////Admin, client and trade //////////////////////////
    name?: string
    lasname?: string
    cellphone?: string
    password: string
    salt: string
    email?: string
    role?: string
    addres?: string
    descripction?:string
    vigente?:Boolean
    createdDate?: Date
}