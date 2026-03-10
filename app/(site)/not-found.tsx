import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen section-padding flex items-center justify-center">
      <div className="max-w-container w-full mx-auto flex items-start justify-center h-full flex-col gap-6">
        <p className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-violet-300">
          404
        </p>
        <div className="flex flex-col gap-2 items-start">
          <h2 className="text-4xl font-bold ">
            <span>Oops! Page Not Found</span>
          </h2>
          <p className="text-xl text-gray-500">
            We&apos;re sorry, but the page you&apos;re looking for doesn&apos;t
            exist.
          </p>
        </div>
        <Link href="/">
          <Button size="lg"> Go Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
