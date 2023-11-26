import { Metadata } from "next"
import OrganizationAddUser from "./OrganizationAddUser"

export const metadata: Metadata = {
    title: 'Organization Add User',
    description: 'Organization Add User',
}


export default function Page(){
    // const route = useRouter()
    // const id = route?.query?.id
    return <OrganizationAddUser />
} 


