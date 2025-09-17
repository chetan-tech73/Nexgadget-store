import TrustBadge from "./TrustBadge";
import {
    ShieldCheckIcon,
    ChatBubbleLeftRightIcon,
    WrenchScrewdriverIcon,
    TruckIcon
} from "@heroicons/react/24/outline";


export default function TrustSection() {
    const trustBadges = [
        {
               icon: ShieldCheckIcon,
               title: "Authentic Products",
               subtitle: "No-clones, no refurbished tricks"
        },
        {
           icon: ChatBubbleLeftRightIcon,
            title: 'Fast Response',
            subtitle: 'whatsApp support within 10 mins'
        },
        {
            icon: WrenchScrewdriverIcon,
            title: 'Pro Installations',
            subtitle: 'Solar, CCTV, IT setups'
           },
           {
            icon: TruckIcon,
            title: 'Nationwide Delivery',
            subtitle: 'Secure, insured dispatch'
           }

    ];
    return (
        <section className="pt-10 pb-12 max-w-7x1 mx-auto">
            <h2 className="text-xl sm:text-2x1 font-bold text-center px-4">
                Why 1,000+ Nigerians Trust Nexgadget
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mt-8 px-4">
                {trustBadges.map((badge, index) =>(
                    <TrustBadge 
                    key={index} 
                    icon={badge.icon}
                    title={badge.title}
                    subtitle={badge.subtitle}
                     />
                ))}
            </div>
        </section>
    );
}