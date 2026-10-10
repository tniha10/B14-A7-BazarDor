export default function ProfileSkeleton() {
    return (
        <div className="w-full max-w-3xl animate-pulse space-y-5">
            <div className="space-y-2">
                <div className="h-8 w-48 rounded bg-gray-200" />
                <div className="h-4 w-64 rounded bg-gray-200" />
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
                <div className="h-16 w-16 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                    <div className="h-5 w-40 rounded bg-gray-200" />
                    <div className="h-4 w-56 rounded bg-gray-200" />
                </div>
                <div className="h-9 w-24 rounded-lg bg-gray-200" />
            </div>

            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5">
                <div className="h-5 w-16 rounded bg-gray-200" />
                <div className="h-12 w-full rounded-lg bg-gray-200" />
                <div className="h-12 w-full rounded-lg bg-gray-300" />
            </div>
        </div>
    );
}