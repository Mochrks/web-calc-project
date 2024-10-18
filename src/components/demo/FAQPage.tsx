
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


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
        <div className="container relative min-h-screen  items-center justify-center ">
            <div className="py-20">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Card className="w-[500px] bg-white text-black p-4 rounded-3xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Frequently Asked Questions</CardTitle>
                            <CardDescription>Find answers to common questions about our calculators</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                                        <AccordionContent>{faq.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}