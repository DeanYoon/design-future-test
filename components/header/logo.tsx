import Image from "next/image";
import Link from "next/link";

interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
}

export function Logo({ className, width, height }: LogoProps) {
    return (
        <Link href="/" className={`flex items-center ${className || ""}`}>
            <Image
                src="/images/logo.png"
                alt="Design Future Logo"
                width={width}
                height={height}
                priority
            />
        </Link>
    );
}

