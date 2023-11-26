import { Metadata } from "next"
import OrganizationEdit from "./OrganizationEdit"

export const metadata: Metadata = {
    title: 'Organization Edit',
    description: 'Organization Edit',
}


export default function Page(){
    // const route = useRouter()
    // const id = route?.query?.id
    return <OrganizationEdit />
} 


