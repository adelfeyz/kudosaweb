import Image from "next/image";
import { BoxImage, WhiteBox } from "../kit";

const TeamSection = () => {
  return (
    <BoxImage
      image={{
        src: "/Strategic_planning_AI-Agent.jpg",
        alt: "دستیار هوش مصنوعی برنامه ریزی در کادوسا"
      }}
      box={(
          <WhiteBox
            header="دستیار هوش مصنوعی برنامه ریزی در کادوسا"
            body={(
              <div className="space-y-6 text-end">
                <p className="font-iran-sans text-lg leading-relaxed mb-4">
                  <strong>دستیار هوش مصنوعی برنامه‌ریزی Kudosa</strong> به شما کمک می‌کند OKRها را هوشمندانه و سریع‌تر تعریف و مدیریت کنید.
                </p>
                
                <ul className="space-y-4 font-iran-sans text-base leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>اهداف و نتایج کلیدی قابل‌سنجش را بر اساس اولویت‌های شما پیشنهاد می‌دهد.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>با گفت‌وگوی ساده، هدف خود را توضیح دهید و پیشنهادهای آماده دریافت کنید.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>مقادیر هدف، نقطه شروع، وزن اهمیت و مالک هدف را به‌صورت خودکار پیشنهاد می‌دهد.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>در چک‌این‌های هفتگی، میزان پیشرفت تحلیل و اقدامات جبرانی پیشنهاد می‌شود.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>در صورت عملکرد قوی، هدف‌های گسترده‌تر و پیام‌های تقدیر ارائه می‌شود.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>بازخوردها و تقدیرها با پردازش زبان طبیعی تولید می‌شوند.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>هر فصل با هوش مصنوعی هدف‌گذاری دقیق‌تری داشته باشید.</span>
                  </li>
                </ul>
              </div>
            )}
          />
      )}
      reverse={true}
    />
  )
};

export default TeamSection;