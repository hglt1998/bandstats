import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href={"https://municipaldemairena.com"}>Become a member</Link>
                </li>
                <li className="mb-4">
                  <Link href={"https://municipaldemairena.com"}>Become a member</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href={"https://municipaldemairena.com"}>Become a member</Link>
                </li>
                <li className="mb-4">
                  <Link href={"https://municipaldemairena.com"}>Become a member</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href={"https://municipaldemairena.com"}>Become a member</Link>
                </li>
                <li className="mb-4">
                  <Link href={"https://municipaldemairena.com"}>Become a member</Link>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:mt-0">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© Mezzo 2024</span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <Link className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5" href={"https://facebook.com/bandamairena"}>
                Facebook
                <span className="sr-only">Facebook page</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}