import { Submission, getSubmissions } from '@/lib/getSubmissions'

export default async function Home() {
    const submissions = await getSubmissions()

    return (
        <main className="container mx-auto grid grid-cols-3 gap-x-6 gap-y-6">
            {submissions.map((s) => (
                <SubmissionCard key={s.uuid} {...s} />
            ))}
        </main>
    )
}

function SubmissionCard(props: Submission) {
    return <pre>{JSON.stringify(props, null, 4)}</pre>
}
