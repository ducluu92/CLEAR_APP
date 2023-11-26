import { Metadata } from "next"
import OrganizationEditUser from "./OrganizationEditUser"

export const metadata: Metadata = {
    title: 'Organization Edit User',
    description: 'Organization Edit User',
}


export default function Page(){
    // const route = useRouter()
    // const id = route?.query?.id
    return <OrganizationEditUser />
} 


