const Content = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full flex flex-col p-2 mt-2 bg-white dark:bg-zinc-900" >
            {children}
        </div>
    );
}

export default Content;