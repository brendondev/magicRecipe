import { Button } from "../button"
import { SectionTitle } from "../section-title"
import { Envelope, ArrowRight } from "@phosphor-icons/react/dist/ssr"

export const ContactForm = () => {
  return(
    <section className="py-16 px-6 md:py-34 flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-[420px] mx-auto flex items-center justify-center flex-col">
      <Envelope
        className="text-red-500"
        size={20}/>
        <SectionTitle
          subtitle="fale conosco" 
          title="Surgiu alguma dúvida?"
          className="items-center text-center p-0 m-0"
        />
        <form className="mt-12 w-full flex flex-col gap-4">
          <input 
            placeholder="Nome"
            className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-red-500"
          />
          <input 
            placeholder="Email"
            type="email"
            className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-red-500"
          />
          <textarea 
            placeholder="Mensagem"
            maxLength={500}
            className="resize-none w-full h-[138px] bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-red-500"
          />
          <Button className="mt-6 shadow-button">
            Entre em Contato <ArrowRight />
          </Button>
        </form>
      </div>
    </section>
  )
}