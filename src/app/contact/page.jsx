export default function ContactPage() {
    return (
        <div className="max-w-4x1 mx-auto p-6">
            <h1 className="text-3x1 font-bold mb-4">Contact Us</h1>
            <p className="mb-2">Phone: +234 810 694 8873</p>
            <p className="mb-2">
                Whatsapp: {" "}
                <a 
                href="https://wa.me/2348106948873"
                target="_blank"
                className="text-green-600 underline"
                >
                    Chat with us
                </a>
            </p>
            <p className="mb-2"> Email: support@nexgadget.com</p>
            <p>Head office: Port Harcourt, Nigeria</p>
        </div>
    );
}