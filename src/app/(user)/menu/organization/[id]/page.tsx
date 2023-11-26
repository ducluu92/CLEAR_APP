import { Metadata } from "next"
import OrganizationDetail from "./OrganizationDetail"
import { useRouter } from "next/router"

export const metadata: Metadata = {
    title: 'Organization Detail',
    description: 'Organization Detail',
}


export default function Page(){
    // const route = useRouter()
    // const id = route?.query?.id
    return <OrganizationDetail />
} 


