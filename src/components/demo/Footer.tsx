
export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-main border-t-4 border-black text-text py-12 px-10">

            <div className="text-center">
                <div className="mt-4 text-center text-lg text-text font-bold">
                    © {currentYear} Created by <a href="https://www.github.com/mochrks" target="_blank" rel="noopener noreferrer" className="hover:underline text-text underline">@mochrks</a>. All rights reserved.
                </div>
            </div>

        </footer >
    )
}
