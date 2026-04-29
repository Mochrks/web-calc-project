
import { faqs } from "@/apis"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { LuHelpCircle } from "react-icons/lu"

export const FAQPage = () => {

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center py-16 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl"
            >
                <div className="bg-white shadow-light border-4 border-black rounded-base overflow-hidden">
                    <div className="bg-main text-text border-b-4 border-black p-8 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <LuHelpCircle className="w-12 h-12 mr-4" />
                            <h1 className="text-3xl font-extrabold">Frequently Asked Questions</h1>
                        </div>
                        <p className="text-xl text-black/80 max-w-2xl mx-auto">
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
                                        className="border-2 border-black rounded-base bg-white"
                                    >
                                        <AccordionTrigger className="px-4 py-3 hover:bg-main hover:text-text transition-colors border-b-2 border-transparent data-[state=open]:border-black">
                                            <div className="flex items-center justify-between w-full">
                                                <span className="text-lg font-semibold text-gray-800 text-left">
                                                    {faq.question}
                                                </span>

                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-4 py-3 bg-bg text-text font-medium border-t-2 border-black">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                </motion.div>
                            ))}
                        </Accordion>
                    </div>

                    <div className="bg-white border-t-4 border-black p-6 text-center">
                        <p className="text-text font-bold">
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