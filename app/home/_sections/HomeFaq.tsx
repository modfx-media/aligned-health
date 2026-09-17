const HOME_FAQS = [
  {
    q: "What should I expect at my first chiropractic visit in Laguna Hills?",
    a: "Plan on about 45 minutes. We take a history, examine the joints that actually hurt, and screen for red flags — progressive weakness, bowel or bladder changes, fever, unexplained weight loss. If an adjustment is appropriate that day, we do it. You leave with a plan, not a 20-visit package you did not ask for.",
  },
  {
    q: "Does PPO insurance cover chiropractic care here?",
    a: "Most of the PPO plans we see do, when the care is medically necessary. We accept Aetna, Meritain, Anthem Blue Cross, Blue Shield of CA, United Healthcare, and Cigna. Call (949) 557-7208 before you book and we will verify the copay. HSA, FSA, and HRA cards are welcome.",
  },
  {
    q: "Can a chiropractor fix a pinched nerve?",
    a: "Often we can calm it, if the irritation is mechanical — a stuck joint, an angry disc, or a tight muscle crowding a nerve. We cannot “un-pinch” a nerve that is being compressed by a tumor, infection, or fracture. That is why the first visit is a screening, not a sales pitch.",
  },
  {
    q: "Can chiropractic help heel-spur pain?",
    a: "We can often take pressure off the tissue around a heel spur. We cannot dissolve the calcium deposit itself. Foot and ankle mechanics, plantar fascia, and how you walk usually matter more than the spur on the x-ray. If that is your main complaint, say so when you book.",
  },
  {
    q: "What is a red flag in chiropractic?",
    a: "Symptoms that mean “do not adjust first”: new bowel or bladder trouble, fever with back pain, pain after major trauma, progressive neurological weakness, or a history of cancer with new spine pain. We check for those before anyone lies on the table.",
  },
  {
    q: "How much is a chiropractor visit without insurance in California?",
    a: "Cash-pay is available. A first visit in Laguna Hills includes the exam, so it is not the same price as a follow-up. Call (949) 557-7208 and we will quote both before you book. If you have PPO coverage, we would rather verify that first. HSA, FSA, and HRA cards work here.",
  },
  {
    q: "Why do some doctors discourage chiropractors?",
    a: "Old professional turf wars, uneven training across the field, and a few loud bad actors. The American College of Physicians already lists spinal manipulation as a first-line option for low back pain. We work alongside MDs in Orange County when a patient needs both. If your case is outside our scope, we say so.",
  },
] as const;

export const HOME_FAQ_LIST = HOME_FAQS.map((faq) => ({ q: faq.q, a: faq.a }));

export function HomeFaq() {
  return (
    <section className="section-linen section relative overflow-hidden">
      <div className="container-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Straight answers</p>
          <h2 className="heading-section mt-4">
            Questions Laguna Hills patients{" "}
            <span className="italic text-tan">actually ask.</span>
          </h2>
        </div>
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-tan/25 rounded-3xl border border-tan/25 bg-cream">
          {HOME_FAQS.map((faq) => (
            <div key={faq.q} className="px-6 py-5 md:px-7 md:py-6">
              <h3 className="font-serif text-lg text-espresso md:text-xl">
                {faq.q}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mocha md:text-base">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
