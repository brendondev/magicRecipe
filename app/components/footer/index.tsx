import { DevToLogo, Heart } from "@phosphor-icons/react/dist/ssr"

export const Footer = () => {
  return (
    <footer className="h-14 w-full flex items-center justify-center bg-gray-450">
      <span className="flex items-center gap-1.5 text-xs sm:text-sm font-flower text-gray-400">
        Made by
        <strong className="text-medium">Brendon</strong>
        <DevToLogo
          className="text-red-500"
          size={20}
        />
      </span>
    </footer>
  )
}