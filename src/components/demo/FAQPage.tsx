
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { LuHelpCircle, LuChevronDown } from "react-icons/lu"

export const FAQPage = () => {
    const faqs = [
        {
            question: "What is a BMI Calculator?",
            answer: "A BMI (Body Mass Index) Calculator is a tool that uses your height and weight to work out if your weight is healthy. It calculates your BMI by dividing your weight in kilograms by your height in meters squared."
        },
        {
            question: "How does the Income Calculator work?",
            answer: "The Income Calculator allows you to input your income and various expenses. It then calculates your savings and provides a visual breakdown of your financial situation. It also offers recommendations based on your savings rate."
        },
        {
            question: "What is considered a healthy BMI?",
            answer: "A BMI between 18.5 and 24.9 is considered healthy for most adults. However, BMI is not a perfect measure and doesn't account for factors like muscle mass, age, and gender."
        },
        {
            question: "How much should I be saving from my income?",
            answer: "Financial experts often recommend saving at least 20% of your income. Our calculator suggests aiming for 30% savings to provide a stronger financial cushion. However, the right amount can vary based on your individual circumstances and goals."
        },
        {
            question: "Can I customize the expense categories in the Income Calculator?",
            answer: "Yes, the Income Calculator allows you to input custom names for your expense categories. This flexibility helps you track your specific spending habits more accurately."
        },
        {
            question: "How often should I use these calculators?",
            answer: "For the BMI Calculator, checking a few times a year is usually sufficient unless you're actively trying to change your weight. For the Income Calculator, monthly use can help you stay on top of your finances and adjust your budget as needed."
        },
        {
            question: "Are my calculations saved?",
            answer: "The Income Calculator saves your entries within the current session, allowing you to review past calculations. However, this data is not permanently stored or accessible across different sessions for privacy reasons."
        },
        {
            question: "How accurate are these calculators?",
            answer: "These calculators provide good estimates based on the information you input. However, for the BMI Calculator, remember that it doesn't account for factors like muscle mass. The Income Calculator's accuracy depends on how precisely you input your financial data."
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-16 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl"
            >
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <LuHelpCircle className="w-12 h-12 mr-4" />
                            <h1 className="text-3xl font-extrabold">Frequently Asked Questions</h1>
                        </div>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto">
                            Get quick answers to common questions about our calculators and tools
                        </p>
                    </div>

                    <div className="p-6 md:p-10">
                        <Accordion
                            type="single"
                            collapsible
                            className="space-y-4"
                        >
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.5
                                    }}
                                >
                                    <AccordionItem
                                        value={`item-${index}`}
                                        className="border border-gray-200 rounded-lg"
                                    >
                                        <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between w-full">
                                                <span className="text-lg font-semibold text-gray-800 text-left">
                                                    {faq.question}
                                                </span>
                                                <LuChevronDown className="h-5 w-5 text-blue-500 transform transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-4 py-3 bg-gray-50 text-gray-600">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                </motion.div>
                            ))}
                        </Accordion>
                    </div>

                    <div className="bg-gray-100 p-6 text-center">
                        <p className="text-gray-600">
                            Didn't find the answer you were looking for?{' '}
                            <a
                                href="https://github.com/mochrks"
                                className="text-blue-600 hover:underline font-semibold"
                            >
                                Contact our support team
                            </a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}