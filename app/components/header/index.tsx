import Image from "next/image"
import Link from "next/link"

export const Header = () => {
  return (
    <header>
      <div className="container">
        <Link href="/">
          <Image
          width={58}
          height={49}
          src="/images/logo.svg"
          alt="Logo Receita Mágica"
          />
        </Link>
      </div>
    </header>
  )
}