
export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 px-10">

            <div className="text-center">
                <div className="mt-4 text-center text-lg text-white">
                    © {currentYear} Created by <a href="https://www.github.com/mochrks" target="_blank" rel="noopener noreferrer" className="hover:underline">@mochrks</a>. All rights reserved.
                </div>
            </div>

        </footer >
    )
}
