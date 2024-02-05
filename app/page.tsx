import { Submission, getSubmissions } from '@/lib/getSubmissions'
import Image from 'next/image'

export const revalidate = 3600 // revalidate at most every hour

export default async function Home() {
    const submissions = await getSubmissions()

    return (
        <main className="container mx-auto bg-white px-4">
            <h1 className="text-xl md:text-3xl pt-8 md:pt-12">
                2023 Pacific DataViz Entries
            </h1>
            <div className="bg-slate-100 h-[1px] w-full px-4 mb-8 mt-1"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-6 md:gap-y-8">
                {/* <Debug submissions={submissions} /> */}
                {submissions.map((s) => (
                    <SubmissionCard key={s.uuid} {...s} />
                ))}
            </div>
        </main>
    )
}

function SubmissionCard({
    img,
    title,
    country,
    link,
    prize,
    owner,
}: Submission) {
    return (
        <div className="flex flex-col group relative rounded-xl hover:bg-slate-50 cursor-pointer p-2 border-slate-200 border md:text-base text-sm">
            <Image
                className="aspect-video object-contain rounded-lg bg-slate-100 w-full"
                src={img.url}
                alt={img.alt}
                width={img.width}
                height={img.height}
            />
            <div className="p-2 grow flex flex-col justify-start">
                <a href={link} className="capitalize md:text-lg font-medium">
                    {/* So you can click anywhere in the card */}
                    <span className="absolute inset-0 z-20"></span>
                    {title}
                </a>
                {prize && (
                    <div className="flex items-center px-3 rounded-full bg-[#ffc800] text-blue-900 self-start mt-2">
                        <TrophyIcon className="w-4 h-4 mr-2" />
                        Prize Winner
                    </div>
                )}
                <div className="py-4 space-y-2">
                    <div className="flex items-center ">
                        <AuthorIcon className="w-5 h-5 mr-2 text-[#ffc800]" />
                        <p className="capitalize text-zinc-700">{owner}</p>
                    </div>
                    <div className="flex items-center ">
                        <PlaceIcon className="w-5 h-5 mr-2 text-[#ffc800]" />
                        <p className="capitalize text-zinc-700">{country}</p>
                    </div>
                </div>
                <p className="mt-auto relative z-10 flex text-sm font-medium text-zinc-400 transition group-hover:text-[#ffc800] dark:text-zinc-200">
                    <LinkIcon className="h-6 w-6 flex-none" />
                    <span className="ml-2">{new URL(link).host}</span>
                </p>
            </div>
        </div>
    )
}

function AuthorIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
            strokeWidth={2}
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
        </svg>
    )
}

function PlaceIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
            strokeWidth={2}
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
        </svg>
    )
}

function TrophyIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
            />
        </svg>
    )
}

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" strokeWidth={2} {...props}>
            <path
                d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
                fill="currentColor"
            />
        </svg>
    )
}

function Debug({ submissions }: { submissions: Submission[] }) {
    return (
        <>
            {submissions.map((s, i) => (
                <pre key={i}>{JSON.stringify(s, null, 4)}</pre>
            ))}
        </>
    )
}
