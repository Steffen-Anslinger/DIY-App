import ProjectForm from "@/components/ProjectForm";
import Link from "next/link";
export default function CreatePage(){
    return (
        <>
        <h2>Create new project</h2>
        <ProjectForm />
        <Link href="/"><button>Back</button></Link>
        </>
    )
}
