import { FC, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export const GlossyBox: FC<{ header: string, body: string, button?: { text: string, onClick: () => void } }> = ({ header, body, button }) => {
  console.log(button)
  return (
    <div id='glossy-box' className="z-10 flex flex-col items-center text-center px-4 w-[90%] rounded-sm overflow-hidden glossy p-6">
      <p className="font-iran-sans text-4xl lg:text-6xl leading-none [text-shadow:1px_1px_3px_rgba(0,0,0,0.4)] py-[5px] my-[13px] text-black">
        {header}
      </p>
      <div className="h-[2px] bg-gray-500/20 w-full mx-auto my-8"></div>
      <h1 className="font-iran-sans text-lg lg:text-xl font-normal tracking-wide [text-shadow:1px_1px_2px_rgba(0,0,0,0.6)] my-0">
        {body}
      </h1>
      {
        !!button &&
        <div className="mt-12">
          <button
            onClick={button.onClick}
            aria-label={button.text}
            className="font-iran-sans inline-block bg-primary text-primary-foreground font-semibold uppercase text-[15px] tracking-wider py-4 px-10 rounded-[30px] transition duration-300 hover:opacity-90 shadow-md my-[26px] cursor-pointer"
          >
            {button.text}
          </button>
        </div>
      }
    </div>
  )
}
export const WhiteBox: FC<{ header: ReactNode, body: ReactNode, className?: string, footer?: ReactNode }> = ({ footer, header, body, className }) => {
  return (
    <div id='white-box' className={`bg-[#ffffffb3] relative${className ? ' ' + className : ''}`}>
      <div className="shadow-lg max-w-xl mx-auto p-8 sm:p-12 lg:p-16 lg:max-w-none lg:mx-0 relative z-10 lg:mt-0 !opacity-90 h-full backdrop-blur-[15px]" style={{ backdropFilter: 'blur(15px)' }}>

        <h2 className="font-iran-sans text-foreground text-5xl lg:text-6xl leading-none font-bold">
          {header}
        </h2>

        <div className="my-6 h-0.5 w-24 bg-primary" />

        <p className="font-iran-sans text-muted-foreground text-lg leading-relaxed mb-8 text-end">
          {body}
        </p>

        {!!footer && footer}
      </div>
    </div>
  )
}


export const GreenButton: FC<{ onClick?: () => void, text: string, href?: string }> = ({ onClick, text, href }) => {
  if (href) {
    return (
      <Button asChild size="lg" className="rounded-full px-8 h-14 button-text text-sm tracking-wider font-iran-sans">
        <Link href={href}>{text}</Link>
      </Button>
    )
  }

  return (
    <Button size="lg" onClick={onClick} className="rounded-full px-8 h-14 button-text text-sm tracking-wider font-iran-sans">
      {text}
    </Button>
  )
}


export const Map: FC = () => {
  // Coordinates: 35.75762644541586, 51.4136871636391
  // Constructing Google Maps embed URL with coordinates
  const latitude = 35.75762644541586;
  const longitude = 51.4136871636391;
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.1234567890123!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ1JzI3LjQiTiA1McKwMjQnNDkuMiJF!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus`;
  
  return (
    <div className="order-1 min-h-[320px] w-full h-full overflow-hidden rounded-xl bg-warm-beige md:order-2">
      <iframe
        title="Map"
        className="h-full w-full min-h-[320px]"
        src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=15&output=embed`}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}

export const ImageBox: FC<{ header: ReactNode, body?: ReactNode, image: ReactNode }> = ({ header, body, image }) => {
  return (
    <section id='image-box' className="relative h-[60vh] min-h-[400px] flex flex-col items-center justify-center">
      {image}
      <div className="absolute inset-0 bg-black/40 z-[2] pointer-events-none" />
      {/* Hero Content */}
      <div className="absolute z-[3] text-center text-white px-6 pointer-events-none">
        <h1 className="font-heading-script text-6xl md:text-7xl mb-6 text-white">
          {header}
        </h1>
        {!!body && body}
      </div>
    </section>
  )
}



export const BoxImage: FC<{ image: { alt: string, src: string,type?:'img' | 'bg',style?:any }, box: ReactNode, reverse?: boolean }> = ({ image, box, reverse }) => {
  const {type = 'img'} = image
  const imglayout = (
    <div className="relative flex-1">
      {type === 'img' && <Image src={image.src} alt={image.alt} fill className="object-cover" />}
    </div>
  )
  const boxlayout = <div className={`flex-1 z-10 transform-${reverse ? 'start' : 'end'}-48 my-4`}>{box}</div>
  return (
    <section className="bg-accent lg:py-24 relative" style={{backgroundImage:type === 'bg'?`url(${image.src})`:undefined,...image.style}}>
      <div className="flex flex-row py-4 relative">
        {!reverse && <>{imglayout}{boxlayout}</>}
        {!!reverse && <>{boxlayout}{imglayout}</>}
      </div>
    </section>);
}


