import React, { useState } from 'react';

const MoWashDetails = () => {
    const [activeFAQ, setActiveFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    return (
        <div className="bg-transparent ring-2 rounded-md ring-white text-white p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* About Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b border-blue-700 pb-2">About MoWash Company</h2>
                <p>
                    MoWash Company is committed to providing clean water, sanitation, and hygiene services
                    to underserved communities. Since its founding, MoWash has focused on creating innovative
                    solutions for water and waste management, working towards improving health outcomes and
                    enhancing the quality of life for individuals and families.
                </p>
                <p>
                    Our mission is to ensure that every household in rural and urban areas has access to safe drinking
                    water and sanitation facilities. We provide end-to-end solutions, including water purification systems,
                    sanitation infrastructure, waste disposal services, and hygiene education. With the support of
                    governmental and non-governmental partners, MoWash operates in multiple districts, especially
                    targeting areas where access to basic sanitation and clean water is limited.
                </p>
                <p>
                    MoWash also runs various awareness programs aimed at promoting hygiene practices and sustainable
                    waste management. Through partnerships with local communities and authorities, we empower individuals
                    to maintain cleanliness, reduce health risks, and build a healthier environment for future generations.
                </p>
                <h3 className="font-semibold">Our Key Services:</h3>
                <ul className="list-disc list-inside space-y-2">
                    <li>Water purification and filtration systems</li>
                    <li>Sanitation infrastructure installation (toilets, waste disposal units)</li>
                    <li>Hygiene promotion and awareness programs</li>
                    <li>Community-based waste management and recycling solutions</li>
                    <li>Regular maintenance and support services</li>
                </ul>
                {/* Download Buttons */}
                <div className="flex space-x-4 mt-4">
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded">
                        📥 Company Brochure (Odia)
                    </button>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded">
                        📥 Company Brochure (English)
                    </button>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold border-b border-blue-700 pb-2">FAQ</h2>
                <div className="space-y-2">
                    {faqData.map((faq, index) => (
                        <div key={index} className="border-b border-blue-700">
                            <button
                                className="w-full flex justify-between items-center py-2 text-left"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{faq.question}</span>
                                <span className='text-white font-bold text-2xl'>{activeFAQ === index ? '-' : '+'}</span>
                            </button>
                            {activeFAQ === index && (
                                <div className="py-2 text-sm text-gray-200">{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
                {/* Download Buttons */}
                <div className="flex space-x-4 mt-4">
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded">
                        📥 FAQ on MoWash (Odia)
                    </button>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded">
                        📥 FAQ on MoWash (English)
                    </button>
                </div>
            </div>
        </div>
    );
};

// FAQ data
const faqData = [
    {
        question: "What services does MoWash Company provide?",
        answer: "MoWash Company offers a range of services, including water purification, sanitation infrastructure, waste management, and hygiene education. We work closely with communities to promote sustainable hygiene practices."
    },
    {
        question: "Who can benefit from MoWash services?",
        answer: "Our services are designed for both rural and urban communities with limited access to clean water and sanitation. We partner with local authorities to ensure everyone, regardless of location or economic status, can benefit."
    },
    {
        question: "How does MoWash contribute to community health?",
        answer: "MoWash improves community health by providing clean water solutions and sanitation facilities, which help reduce the risk of waterborne diseases. Our hygiene awareness programs further educate the community on maintaining clean and healthy practices."
    },
    {
        question: "Is MoWash a government-funded program?",
        answer: "MoWash is a collaborative initiative that operates through both private funding and partnerships with government and non-governmental organizations."
    },
    {
        question: "Does MoWash offer maintenance and support?",
        answer: "Yes, we provide ongoing maintenance and support for our installations, ensuring long-term functionality and reliability of water and sanitation systems."
    },
    {
        question: "How can I get MoWash services in my area?",
        answer: "You can reach out to MoWash through our website or contact our customer service team to inquire about setting up services in your community."
    },
    {
        question: "What measures are in place for sustainable waste management?",
        answer: "MoWash promotes sustainable waste management by implementing recycling programs, waste segregation practices, and community-driven waste disposal solutions."
    },
    {
        question: "Does MoWash provide training on hygiene practices?",
        answer: "Yes, MoWash runs regular workshops and awareness campaigns focused on proper handwashing techniques, safe drinking practices, and maintaining sanitary environments."
    }
];

export default MoWashDetails;
