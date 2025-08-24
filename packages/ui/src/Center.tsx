export function Center({children}:{children: React.ReactNode}) {
    return <div className="h-full flex justify-center flex-col">
        <div className="flex justify-center">
            {children}
        </div>
    </div>
}