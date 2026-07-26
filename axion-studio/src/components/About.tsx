import { ArrowRight } from 'lucide-react'

const About = () => {
  const smallImageUrl = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85'
  const largeImageUrl = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85'

  return (
    <section className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Badge Row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center flex-shrink-0">
            <span className="text-[11px] sm:text-[12px] font-semibold">1</span>
          </div>
          <span className="text-[12px] sm:text-[13px] font-medium border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            Introducing Axion
          </span>
        </div>

        {/* Heading */}
        <h2 className="px-5 sm:px-8 lg:px-12 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-28">
          Strategy-led creatives, delivering<span className="sm:hidden"> </span>
          <br className="hidden sm:block" />
          results in digital and beyond.
        </h2>

        {/* Mobile/Tablet Content */}
        <div className="lg:hidden px-5 sm:px-8">
          <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900 mb-6">
            Through research, creative thinking and iteration we help growing brands realize their digital full potential.
          </p>

          {/* Orange button */}
          <button className="group bg-[#F26522] hover:bg-[#e05a1a] text-white rounded-full pl-5 sm:pl-6 pr-2 py-2 flex items-center gap-3 transition-colors duration-300 mb-8">
            <span className="overflow-hidden h-[20px]">
              <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                <span className="text-[13px] sm:text-[14px] font-medium h-[20px] flex items-center">About our studio</span>
                <span className="text-[13px] sm:text-[14px] font-medium h-[20px] flex items-center">About our studio</span>
              </span>
            </span>
            <span className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
            </span>
          </button>

          {/* Images */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <div className="sm:w-[45%]">
              <img
                src={smallImageUrl}
                alt="Axion Studio team"
                className="w-full aspect-[438/346] rounded-xl sm:rounded-2xl object-cover"
              />
            </div>
            <div className="sm:w-[55%]">
              <img
                src={largeImageUrl}
                alt="Axion Studio workspace"
                className="w-full aspect-[900/600] rounded-xl sm:rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>

        {/* Desktop Content */}
        <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8 px-5 sm:px-8 lg:px-12">
          {/* Left - Small image */}
          <div className="self-end">
            <img
              src={smallImageUrl}
              alt="Axion Studio team"
              className="w-full aspect-[438/346] rounded-2xl object-cover"
            />
          </div>

          {/* Center - Text + Button */}
          <div className="self-start flex flex-col justify-end">
            <p className="text-[16px] xl:text-[18px] leading-[1.65] font-medium text-gray-900 whitespace-nowrap mb-6">
              Through research, creative thinking<br />
              and iteration we help growing brands<br />
              realize their digital full potential.
            </p>

            <button className="group bg-[#F26522] hover:bg-[#e05a1a] text-white rounded-full pl-5 sm:pl-6 pr-2 py-2 flex items-center gap-3 transition-colors duration-300 w-fit">
              <span className="overflow-hidden h-[20px]">
                <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                  <span className="text-[14px] font-medium h-[20px] flex items-center">About our studio</span>
                  <span className="text-[14px] font-medium h-[20px] flex items-center">About our studio</span>
                </span>
              </span>
              <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
              </span>
            </button>
          </div>

          {/* Right - Large image */}
          <div className="self-end">
            <img
              src={largeImageUrl}
              alt="Axion Studio workspace"
              className="w-full aspect-[3/2] rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
