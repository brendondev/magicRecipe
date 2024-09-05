"use client";
import { Button } from "../Button"
import { SectionTitle } from "../SectionTitle"
import { Envelope, ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const contactFormSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(500),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export const ContactForm = () => {
  const {handleSubmit, register}  = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = (data: ContactFormData) => {
    console.log(data)
  }

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
        <form
          className="mt-12 w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          >
          <input 
            placeholder="Nome"
            className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-red-500"
            {...register('name')}
          />
          <input 
            placeholder="Email"
            type="email"
            className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-red-500"
            {...register('email')}
          />
          <textarea 
            placeholder="Mensagem"
            maxLength={500}
            className="resize-none w-full h-[138px] bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-red-500"
            {...register('message')}
          />
          <Button className="mt-6 shadow-button">
            Entre em Contato <ArrowRight />
          </Button>
        </form>
      </div>
    </section>
  )
}