export default function AuthSkeleton() {
    return (
        <div className="w-full animate-pulse space-y-5">
            <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-12 w-full rounded-lg bg-gray-200" />
            </div>

            <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-12 w-full rounded-lg bg-gray-200" />
            </div>

            <div className="h-12 w-full rounded-lg bg-gray-300" />
        </div>
    );
}