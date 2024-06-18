import FooterSection from "./FooterSection";
import NavBar from "./NavBar";
import React, { useState } from "react";
import Question from "./Question";
import faq from "../../images/faq.jpg";

const Faq = () => {
  const faqs = [
    {
      question: "What kind of events do you plan?",
      answer:
        "We cater to a diverse range of events, including graduation ceremonies, award ceremonies, product launch events, music concerts, sports tournaments and cultural festivals.",
    },
    {
      question: "Do you offer delivery and pickup services?",
      answer:
        "Absolutely, our packages include convenient delivery and pickup services to ensure a hassle-free experience for our customers.",
    },
    {
      question:
        "What if there is an emergency? Can we change the date or details without additional fees?",
      answer:
        "Yes, we understand that unforeseen circumstances can arise. You can make changes to your event date or details without incurring any additional fees.",
    },
    {
      question:
        "Do you provide technical support for the equipment during the event?",
      answer:
        "Rest assured, our dedicated staff will be on-site during your event to provide any necessary technical support for the equipment.",
    },
    {
      question:
        "Do you offer any special packages or deals for certain types of events?",
      answer:
        "Explore our website Home page for exclusive seasonal packages tailored to various event types.",
    },
    {
      question: "What if the equipment I need is not listed on your website?",
      answer:
        "Do not worry! Through our partnerships with third-party suppliers, we can source any equipment you require, even if it is not currently listed in our inventory. Just let us know your needs, and we will take care of the rest.",
    },
  ];

  const [cards] = useState(faqs);

  return (
    <div>
      <NavBar />

      <div
        style={{
          backgroundImage: `url(${faq})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <section className="max-w-xl px-4 py-20 ml-12">
          <h1 className="mb-8 text-3xl font-bold text-center text-black uppercase border-b-2 border-indigo-600">
            Frequently Asked Questions
          </h1>

          <section className="grid grid-cols-1 gap-8">
            {cards.map((card, index) => (
              <Question {...card} key={index} />
            ))}
          </section>
        </section>
      </div>

      <FooterSection />
    </div>
  );
};

export default Faq;
