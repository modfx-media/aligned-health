/**
 * Canonical service catalog for Aligned Health.
 *
 * One source of truth used by:
 * - the nav dropdown (label + short)
 * - the /services index page (label + short + imageSrc)
 * - each /services/[slug] detail page (full content)
 * - the sitemap (slug list)
 * - the blog "related services" chips
 *
 * When adding/removing a service:
 * 1) update SERVICES below (slug must be URL-safe, unique)
 * 2) confirm imageSrc host is allow-listed in next.config.ts if remote
 * 3) build should show a new /services/<slug> route
 */

export interface ServiceStep {
 title: string;
 description: string;
}

export interface ServiceFaq {
 q: string;
 a: string;
}

export interface Service {
 slug: string;
 /** Nav / card label. Short. */
 label: string;
 /** Nav caption / card subtitle. One phrase. */
 short: string;
 /** SEO <title>. Should include location + keyword. */
 metaTitle: string;
 /** SEO description. 140-160 chars ideal. */
 metaDescription: string;
 /** SEO keywords array. */
 keywords: string[];
 imageSrc: string;
 imageAlt: string;
 hero: {
 eyebrow: string;
 /** Editorial tagline shown under the H1. */
 tagline: string;
 stat?: { value: string; label: string };
 };
 intro: {
 lead: string;
 body: string;
 };
 /** 3-4 "how it works" steps. */
 howItWorks: ServiceStep[];
 /** 5-6 short benefit bullets. */
 benefits: string[];
 /** "Great for..." conditions/goals. */
 indications: string[];
 /** Optional "Not right when..." list. */
 contraindications?: string[];
 whatToExpect: {
 duration: string;
 frequency: string;
 prep: string;
 body: string;
 };
 faqs: ServiceFaq[];
 relatedSlugs: string[];
}

/* ---------------------------------------------------------------------- */
/* Services */
/* ---------------------------------------------------------------------- */

export const SERVICES: readonly Service[] = [
 /* ------------------ 01. Chiropractic Adjustments ------------------- */
 {
 slug: "chiropractic-adjustments",
 label: "Chiropractic Adjustments",
 short: "Diversified spinal adjustments",
 metaTitle:
 "Chiropractic Adjustments in Laguna Hills, CA · Aligned Health",
 metaDescription:
 "Precise Diversified-technique chiropractic adjustments in Laguna Hills, CA. Schedule now, most PPO plans accepted. Serving South Orange County.",
 keywords: [
 "chiropractic adjustment laguna hills",
 "chiropractor near me",
 "diversified technique chiropractor",
 "spinal manipulation orange county",
 "back pain adjustment",
 "neck adjustment laguna hills",
 "chiropractor for lower back pain",
 ],
 imageSrc: "/images/services/chiropractic-adjustments-banner.jpg",
 imageAlt: "Chiropractic adjustment being performed at Aligned Health",
 hero: {
 eyebrow: "Core service",
 tagline:
 "Precise, hands-on spinal manipulation that restores motion and calms the nerves passing through your joints.",
 },
 intro: {
 lead:
 "If your back or neck has been stuck, a chiropractic adjustment is usually where we start — not because it is trendy, but because restoring joint motion is often the fastest way to quiet the muscle that has been guarding it.",
 body: "We use Diversified technique: a precise, hand-delivered thrust aimed at the segment that is actually restricted that day. You are not on a 10-minute rotation. Dr. Dustin Hack or Dr. Tara Hadden stays in the room, and if an adjustment is the wrong next step, we say so.",
 },
 howItWorks: [
 {
 title: "Locate the restriction",
 description:
 "We palpate segment-by-segment to find the joints that have lost normal motion or become guarded.",
 },
 {
 title: "Position the segment",
 description:
 "You&rsquo;re positioned so the target joint is isolated and the surrounding tissue is relaxed.",
 },
 {
 title: "Deliver a controlled thrust",
 description:
 "A high-velocity, low-amplitude thrust restores motion. It&rsquo;s quick, well under a second, and usually feels like a release of pressure.",
 },
 {
 title: "Support the change",
 description:
 "We layer targeted soft-tissue work, mobility drills, or a recovery modality to help the segment hold its new position.",
 },
 ],
 benefits: [
 "Restores joint motion where it&rsquo;s been lost",
 "Relaxes protective muscle guarding around the segment",
 "Reduces mechanical low-back, neck, and mid-back pain",
 "Supports better posture and daily movement mechanics",
 "Non-drug, non-surgical first-line care for most spinal pain",
 "Complements strength, mobility, and rehab programs",
 ],
 indications: [
 "Mechanical low-back pain from sitting, driving, or lifting",
 "Neck pain and tension headaches",
 "Sacroiliac joint dysfunction",
 "Facet-joint irritation after training or a weekend project",
 "Post-partum pelvic and low-back tension",
 ],
 contraindications: [
 "Suspected fracture or acute traumatic injury",
 "Cauda equina symptoms or aggressive neurologic loss",
 "Advanced osteoporosis in the segment we&rsquo;d be adjusting",
 ],
 whatToExpect: {
 duration: "5-10 min adjustment · 45 min first visit",
 frequency: "1-3 visits per week in an acute plan",
 prep: "Wear comfortable clothing you can move in.",
 body: "New-patient visits are about 45 minutes and include a full history, exam, adjustment, and plan. Follow-ups are shorter and focused on the specific segments we&rsquo;re treating. Most patients feel a shift in the first two or three visits.",
 },
 faqs: [
 {
 q: "Does the adjustment hurt?",
 a: "For most people, no. The thrust is quick. Patients usually describe a release of pressure, not a stab of pain. Mild next-day soreness, like after a decent workout, is normal and typically gone in a day or two.",
 },
 {
 q: "What does a chiropractic adjustment do?",
 a: "It restores motion in a joint that has gotten stuck or guarded. That takes mechanical pressure off the tissues around it and often quiets the muscle that has been bracing. The pop you hear is gas leaving the joint fluid, not bones cracking, and it is not required for the adjustment to work.",
 },
 {
 q: "What are the potential side effects of a chiropractic adjustment?",
 a: "The common ones are temporary soreness, feeling a little tired, and the occasional mild headache. Those usually settle within 24 to 48 hours. Serious complications are rare. We screen first for red flags — progressive weakness, bowel or bladder changes, fever with back pain, major trauma — and we will not adjust a joint that should not be adjusted.",
 },
 {
 q: "Is it normal to feel off after a chiropractic adjustment?",
 a: "Yes, for a few hours. Your nervous system and the muscles around the joint just got new information. Most people feel settled by the next day. If you feel worse after 48 hours, or you notice spreading numbness or weakness, call us — that is not something to wait out.",
 },
 {
 q: "Is foot tingling normal after a chiropractic adjustment?",
 a: "Brief tingling after a low-back adjustment can happen as a nerve root that was crowded starts to move again. It should be mild and short. Tingling that lasts, spreads, or comes with weakness is not “normal settling.” Call the office or seek urgent care if that is what you are feeling.",
 },
 {
 q: "How many visits will I need?",
 a: "Most acute cases plateau in three to six visits. Chronic or complicated cases take longer. We reassess constantly and change the plan if we are not seeing progress. We will not sell you a 20-visit package on day one.",
 },
 {
 q: "How much is a chiropractor visit without insurance in California?",
 a: "Cash-pay is available. We quote the first-visit exam and any follow-up before you book, because those are different lengths. Call (949) 557-7208. HSA, FSA, and HRA cards are welcome. If you have PPO coverage, we would rather verify that first.",
 },
 {
 q: "Do I need a referral?",
 a: "No. Chiropractors are primary-contact providers in California, so you can book directly. If your case is outside our scope we will tell you and refer you to the right specialist.",
 },
 ],
 relatedSlugs: [
 "spinal-decompression",
 "percussion-therapy",
 "intersegmental-distraction",
 ],
 },

 /* ------------------ 02. Spinal Decompression ----------------------- */
 {
 slug: "spinal-decompression",
 label: "Spinal Decompression",
 short: "Non-surgical disc relief",
 metaTitle:
 "Non-Surgical Spinal Decompression in Laguna Hills · Aligned Health",
 metaDescription:
 "Non-surgical spinal decompression for herniated discs, sciatica, and chronic low-back pain in Laguna Hills, CA. Schedule now, most PPO plans accepted.",
 keywords: [
 "spinal decompression laguna hills",
 "non surgical spinal decompression",
 "herniated disc treatment orange county",
 "sciatica treatment near me",
 "disc bulge chiropractor",
 "spinal traction therapy",
 "back pain relief without surgery",
 ],
 imageSrc: "/images/services/spinal-decompression-banner.jpg",
 imageAlt: "Spinal decompression table at Aligned Health in Laguna Hills",
 hero: {
 eyebrow: "Disc & sciatica care",
 tagline:
 "Motorized traction that creates space where your spine has lost it.",
 stat: { value: "20-40", label: "min per session" },
 },
 intro: {
 lead:
 "Non-surgical spinal decompression is a form of motorized traction that eases pressure on discs and nerve roots.",
 body: "You lie comfortably on a computer-controlled table that applies gentle, cyclical pulling forces to a specific segment of your spine. It&rsquo;s one of the most reliable non-surgical options for herniated discs, sciatica, and chronic disc-related low-back pain.",
 },
 howItWorks: [
 {
 title: "Precise segmental setup",
 description:
 "We position the table to target the specific spinal segment causing your symptoms, in the cervical or lumbar spine.",
 },
 {
 title: "Cyclical traction",
 description:
 "The table applies a programmed pulling force that eases on and off, avoiding muscle guarding.",
 },
 {
 title: "Rehydrate the disc",
 description:
 "Negative pressure draws fluid, oxygen, and nutrients back into the disc while relieving nerve compression.",
 },
 {
 title: "Consolidate the change",
 description:
 "We pair sessions with adjustments and rehab drills so the segment holds its new position between visits.",
 },
 ],
 benefits: [
 "Relieves pressure on inflamed discs and nerve roots",
 "Non-surgical, non-injected alternative for many disc cases",
 "Comfortable enough that many patients fall asleep on the table",
 "Complements adjusting and modalities for compounding results",
 "Fully clothed, no downtime after sessions",
 "Programs adapt to your response as we go",
 ],
 indications: [
 "Herniated or bulging lumbar discs",
 "Classic sciatica with shooting or numb leg symptoms",
 "Cervical disc pain with arm symptoms",
 "Facet-joint syndrome that hasn&rsquo;t responded to adjusting alone",
 "Degenerative disc disease with stubborn low-back stiffness",
 ],
 contraindications: [
 "Spinal fractures or spinal hardware in the treated area",
 "Advanced osteoporosis, tumors, or active infection",
 "Pregnancy",
 ],
 whatToExpect: {
 duration: "20-40 min per session",
 frequency: "2-3 sessions per week in an active protocol",
 prep: "Wear comfortable clothing, no need to change.",
 body: "Most patients feel a shift in the first three to five sessions and complete a full protocol in twelve to twenty-four visits over six to twelve weeks. We reassess constantly, if it&rsquo;s not working we don&rsquo;t just keep going, we change the plan.",
 },
 faqs: [
 {
 q: "Is it safe?",
 a: "Yes, when a proper exam has ruled out contraindications. The pull is gentle and controlled, not the aggressive traction people sometimes imagine.",
 },
 {
 q: "Does it feel painful?",
 a: "Almost never. Most patients describe it as one of the most relaxing parts of their treatment. Several fall asleep on the table.",
 },
 {
 q: "Can it replace surgery?",
 a: "For many disc-related cases, a well-structured decompression protocol is worth trying before injections or surgery. If it does not work, you have not burned any bridges. We will say so.",
 },
 {
 q: "How is this different from a chiropractic adjustment?",
 a: "An adjustment restores motion at a specific joint. Decompression creates space and takes pressure off a disc or nerve. Most patients with sciatica or a herniated disc benefit from both, not one or the other.",
 },
 {
 q: "Can spinal decompression help sciatica?",
 a: "Often, when the sciatica is coming from a disc that is crowding a nerve root. You lie on a computer-controlled table that gently unloads that segment. It is not a miracle, and it is not for every back. We screen first. If the pain is from a tumor, infection, or fracture, decompression is the wrong tool.",
 },
 ],
 relatedSlugs: [
 "chiropractic-adjustments",
 "intersegmental-distraction",
 "pemf-therapy",
 ],
 },

 /* ------------------ 03. Electromuscular Stimulation ---------------- */
 {
 slug: "electromuscular-stimulation",
 label: "Electromuscular Stimulation",
 short: "Reduces muscle spasm",
 metaTitle:
 "Electromuscular Stimulation (E-Stim) in Laguna Hills · Aligned Health",
 metaDescription:
 "Electromuscular stimulation (e-stim / TENS) at Aligned Health in Laguna Hills to relax muscle spasm and reduce pain during recovery. Schedule now, PPO plans accepted.",
 keywords: [
 "electromuscular stimulation laguna hills",
 "e-stim therapy orange county",
 "tens therapy chiropractor",
 "muscle spasm treatment",
 "electric muscle stimulation for pain",
 "ems recovery therapy",
 ],
 imageSrc: "/images/services/electromuscular-stimulation-banner.jpg",
 imageAlt:
 "Electromuscular stimulation pads applied during a recovery session",
 hero: {
 eyebrow: "Pain & spasm relief",
 tagline:
 "Gentle electrical current that calms muscle spasm, boosts circulation, and takes the edge off during acute recovery.",
 stat: { value: "10-15", label: "min per area" },
 },
 intro: {
 lead:
 "Electromuscular stimulation (e-stim) uses low-level electrical current delivered through skin-safe electrode pads to modulate pain signals and relax over-contracted muscle.",
 body: "It&rsquo;s a workhorse recovery modality, especially useful in the first days after an acute injury, following an adjustment when the surrounding muscle is fighting back, or during rehab when a muscle is refusing to fire.",
 },
 howItWorks: [
 {
 title: "Place the pads",
 description:
 "Skin-safe adhesive electrodes are placed on either side of the target muscle or nerve pathway.",
 },
 {
 title: "Set the mode",
 description:
 "Depending on the goal we choose sensory-level (TENS for pain) or motor-level (EMS for muscle activation) settings.",
 },
 {
 title: "Modulate signals",
 description:
 "The current interrupts pain-signal transmission and drives fresh blood into the treatment area.",
 },
 {
 title: "Retest and layer",
 description:
 "We reassess range of motion and pair the session with adjusting, stretching, or manual soft-tissue work.",
 },
 ],
 benefits: [
 "Interrupts pain signals for immediate relief",
 "Reduces protective muscle spasm",
 "Boosts local circulation to speed tissue healing",
 "Non-drug, non-invasive, comfortable for most patients",
 "Helps re-recruit muscles that have &lsquo;shut off&rsquo; after injury",
 "Pairs well with adjustments and manual therapy",
 ],
 indications: [
 "Acute or chronic muscle spasm",
 "Post-injury pain and swelling in the first 48-72 hours",
 "Lingering pain after chiropractic care alone",
 "Muscle inhibition after surgery or immobilization",
 "Rehab plateaus where a muscle isn&rsquo;t firing well",
 ],
 contraindications: [
 "Cardiac pacemakers or implanted electrical devices",
 "Open wounds, active infection, or skin breakdown in the pad area",
 "Pregnancy (over the abdomen or low back)",
 ],
 whatToExpect: {
 duration: "10-15 min per treated area",
 frequency: "2-3 times per week during acute phases",
 prep: "Wear something that gives access to the area we&rsquo;re treating.",
 body: "You&rsquo;ll feel a mild tingling or a rhythmic tapping sensation, adjusted to your comfort. Most patients find it deeply relaxing. Effects on pain and spasm are often felt during the session and last for hours afterward.",
 },
 faqs: [
 {
 q: "Does it hurt?",
 a: "No. You control the intensity with our guidance, it should feel strong but comfortable, never sharp or burning.",
 },
 {
 q: "How is TENS different from EMS?",
 a: "TENS uses sensory-level current to interrupt pain signals. EMS uses motor-level current to actually contract the muscle. We use whichever fits your goal that day.",
 },
 {
 q: "Can I use one at home?",
 a: "Home units are useful for pain management but can&rsquo;t replace the in-office version paired with adjustment and manual therapy. We&rsquo;re happy to guide home use.",
 },
 ],
 relatedSlugs: [
 "chiropractic-adjustments",
 "percussion-therapy",
 "therapeutic-ultrasounds",
 ],
 },

 /* ------------------ 04. Percussion Therapy ------------------------- */
 {
 slug: "percussion-therapy",
 label: "Percussion Therapy",
 short: "Deep-muscle recovery",
 metaTitle:
 "Percussion Therapy in Laguna Hills · Muscle Recovery at Aligned Health",
 metaDescription:
 "Percussion therapy at Aligned Health in Laguna Hills, CA, deep-muscle recovery for athletes, weekend warriors, and desk workers. Schedule now, PPO plans accepted.",
 keywords: [
 "percussion therapy laguna hills",
 "massage gun therapy orange county",
 "deep tissue percussion",
 "muscle recovery chiropractor",
 "post workout recovery laguna hills",
 "myofascial percussion therapy",
 "sports recovery near me",
 ],
 imageSrc: "/images/services/percussion-therapy-banner.jpg",
 imageAlt: "Percussion therapy treatment at Aligned Health",
 hero: {
 eyebrow: "Recovery modality",
 tagline:
 "Rapid mechanical pulses that drive fluid through tissue, break up adhesions, and reset tight muscle in minutes.",
 stat: { value: "1,800-3,200", label: "pulses per minute" },
 },
 intro: {
 lead:
 "Percussion therapy delivers rapid, targeted mechanical pulses into a muscle group to unwind tight tissue and speed recovery.",
 body: "Used well, it&rsquo;s one of the fastest ways to change how tissue feels. In-office we use it before adjustments to relax surrounding muscle and after to consolidate the change, matched to the tissue&rsquo;s actual response, not chased around a sore spot.",
 },
 howItWorks: [
 {
 title: "Warm the tissue",
 description:
 "A broad head at light pressure prepares the muscle for deeper work, roughly 30 seconds of sweeping.",
 },
 {
 title: "Find the target",
 description:
 "We palpate for the actual restriction, not just where it hurts. Those are often different spots.",
 },
 {
 title: "Work it",
 description:
 "A deeper head, moderate pressure, cross-fiber for 60-90 seconds. We stop as soon as the tissue changes.",
 },
 {
 title: "Retest & pair",
 description:
 "We check range of motion and pair with adjusting, stretching, or red light to lock in the change.",
 },
 ],
 benefits: [
 "Rapid reduction in muscle tightness",
 "Improved range of motion in minutes",
 "Boosted local circulation and lymphatic drainage",
 "Less post-workout soreness (DOMS)",
 "Excellent prep and finish for adjustments",
 "No downtime, you leave feeling better right away",
 ],
 indications: [
 "Post-training tightness in athletes",
 "Weekend-warrior soreness after over-doing it",
 "Classic upper-trap and levator scapulae &lsquo;desk knots&rsquo;",
 "Post-surgical patients (once cleared) rebuilding tissue quality",
 "Anyone who feels tight but isn&rsquo;t injured, the sweet spot",
 ],
 contraindications: [
 "Acute muscle strain or fresh bruise",
 "Bone-on-bone joints or bony prominences",
 "Areas of active inflammation, infection, or open wound",
 ],
 whatToExpect: {
 duration: "5-10 min per target area",
 frequency: "As needed, often 1-2 times per week",
 prep: "Wear clothing that gives access to the area.",
 body: "Percussion is usually a prep-and-finish tool, not a full visit on its own. You&rsquo;ll feel and see a change in range of motion within a couple of minutes. If a spot doesn&rsquo;t change in a minute or two, we switch tools, percussion isn&rsquo;t the right answer for every situation.",
 },
 faqs: [
 {
 q: "How is this different from a massage gun at home?",
 a: "Same principle, better technique and pairing. In-office we choose the right head, pressure, and duration based on how your tissue responds, and we pair it with an adjustment or stretch to make the change stick.",
 },
 {
 q: "Will it leave bruises?",
 a: "Not when used correctly. Bruising is a sign of too much pressure or too long on one spot.",
 },
 {
 q: "Who should not use percussion?",
 a: "Anyone with an acute strain, fresh bruise, or active inflammation should wait. Blood-thinning medication is also a caution worth telling us about.",
 },
 ],
 relatedSlugs: [
 "chiropractic-adjustments",
 "assisted-stretching",
 "red-light-therapy",
 ],
 },

 /* ------------------ 05. PEMF Therapy ------------------------------- */
 {
 slug: "pemf-therapy",
 label: "PEMF Therapy",
 short: "Cellular repair support",
 metaTitle:
 "PEMF Therapy in Laguna Hills · Pulsed Electromagnetic Field · Aligned Health",
 metaDescription:
 "PEMF (Pulsed Electromagnetic Field) therapy at Aligned Health in Laguna Hills, CA, supports cellular recovery and reduces inflammation. Schedule now, PPO plans accepted.",
 keywords: [
 "pemf therapy laguna hills",
 "pulsed electromagnetic field therapy",
 "pemf orange county",
 "pemf for inflammation",
 "cellular recovery therapy",
 "pemf near me",
 "pemf pain relief chiropractor",
 ],
 imageSrc: "/images/services/pemf-therapy-banner.jpg",
 imageAlt: "PEMF therapy setup at Aligned Health in Laguna Hills",
 hero: {
 eyebrow: "Cellular recovery",
 tagline:
 "Low-frequency electromagnetic pulses that support cellular repair and dial down inflammation at the tissue level.",
 stat: { value: "15-30", label: "min per session" },
 },
 intro: {
 lead:
 "PEMF stands for Pulsed Electromagnetic Field therapy. It uses low-frequency electromagnetic waves to nudge cells toward better energy production and repair.",
 body: "In practical terms: after an injury, adjustment, or heavy training block, PEMF gives us a way to support the underlying tissue without a needle, a pill, or a manual technique. Most patients pair it with adjusting or decompression for compounding effects.",
 },
 howItWorks: [
 {
 title: "Position the applicator",
 description:
 "A ring or pad-shaped applicator is placed over the treatment area, clothed, no gels or wires on the skin.",
 },
 {
 title: "Deliver pulses",
 description:
 "The device generates a specific frequency of electromagnetic pulses tuned for tissue recovery.",
 },
 {
 title: "Restore cellular charge",
 description:
 "The pulses influence the electrical potential across cell membranes, supporting energy production and ion balance.",
 },
 {
 title: "Support the visit",
 description:
 "Sessions layer alongside adjusting, decompression, or red light so recovery compounds across the visit.",
 },
 ],
 benefits: [
 "Supports cellular energy production and repair",
 "May help reduce local inflammation",
 "Non-invasive, no needles or downtime",
 "Comfortable, most patients feel very little during a session",
 "Layers cleanly with the rest of the visit",
 "Fully clothed, no prep required",
 ],
 indications: [
 "Post-training or post-injury inflammation",
 "Chronic joint or disc pain",
 "Slow-healing soft tissue",
 "Post-surgical recovery (once cleared by your surgeon)",
 "Athletes managing high training loads",
 ],
 contraindications: [
 "Cardiac pacemakers or implanted electrical devices",
 "Pregnancy",
 "Active cancer in the treated area",
 ],
 whatToExpect: {
 duration: "15-30 min per session",
 frequency: "1-3 sessions per week during active recovery",
 prep: "None, keep your clothes on and relax.",
 body: "PEMF is quiet and deeply relaxing. Some patients feel a mild tingling; most feel nothing at all. Effects tend to accumulate across a series rather than showing up in one dramatic session.",
 },
 faqs: [
 {
 q: "Is PEMF safe?",
 a: "Yes, when contraindications are respected. The energy levels are far below anything therapeutic devices like MRIs use.",
 },
 {
 q: "How long before I feel anything?",
 a: "Most patients notice a shift after a series of sessions rather than a single visit. Think of it as a compounding recovery layer.",
 },
 {
 q: "Can PEMF replace an adjustment?",
 a: "No. PEMF works at the cellular level; adjustments work at the joint level. They target different problems and combine well in the same plan.",
 },
 ],
 relatedSlugs: [
 "spinal-decompression",
 "red-light-therapy",
 "therapeutic-ultrasounds",
 ],
 },

 /* ------------------ 06. Game Ready Ice Compressions ---------------- */
 {
 slug: "game-ready-ice-compressions",
 label: "Game Ready Ice Compressions",
 short: "Cold + compression recovery",
 metaTitle:
 "Game Ready Ice Compression Therapy in Laguna Hills · Aligned Health",
 metaDescription:
 "Game Ready cold + intermittent compression therapy at Aligned Health in Laguna Hills, CA, the gold standard for acute-injury recovery. Schedule now, PPO plans accepted.",
 keywords: [
 "game ready therapy laguna hills",
 "cold compression therapy orange county",
 "cryotherapy compression",
 "acute injury recovery laguna hills",
 "post surgery recovery chiropractor",
 "sports injury cold therapy",
 ],
 imageSrc: "/images/services/game-ready-ice-compressions-banner.jpg",
 imageAlt:
 "Game Ready cold compression wrap in use at Aligned Health",
 hero: {
 eyebrow: "Acute recovery",
 tagline:
 "The gold-standard combo of controlled cold and intermittent compression, used by pro training rooms worldwide.",
 stat: { value: "20-30", label: "min per session" },
 },
 intro: {
 lead:
 "Game Ready pairs deep cold with intermittent pneumatic compression in a single wrap, so you get the anti-inflammatory benefit of ice plus the swelling clearance of pumping compression.",
 body: "It&rsquo;s the same technology stocked in college and pro training rooms. In our office it&rsquo;s our first-line pick for acute strains, sprains, post-training swelling, and post-surgical recovery once your surgeon clears external cold.",
 },
 howItWorks: [
 {
 title: "Wrap the area",
 description:
 "A form-fitting sleeve wraps around the joint or muscle group being treated.",
 },
 {
 title: "Deliver controlled cold",
 description:
 "Chilled water circulates through the wrap at a therapist-set temperature, consistent, never dangerous.",
 },
 {
 title: "Add rhythmic compression",
 description:
 "Programmed pressure cycles push swelling out and pull fresh blood in as pressure releases.",
 },
 {
 title: "Guide next steps",
 description:
 "We use the calmer tissue to layer manual therapy, e-stim, or targeted mobility work.",
 },
 ],
 benefits: [
 "Reduces acute swelling and inflammation faster than ice alone",
 "More consistent, safer, and more comfortable than ice packs",
 "Speeds recovery between hard training sessions",
 "Post-surgical recovery aid (with your surgeon&rsquo;s clearance)",
 "Works on knees, ankles, shoulders, elbows, hips, and low back",
 "Comfortable enough to relax through the session",
 ],
 indications: [
 "Acute strains, sprains, and contusions",
 "Post-training swelling in athletes",
 "Post-surgical joint recovery (once cleared)",
 "Flare-ups of tendinopathy or bursitis",
 "Any joint or muscle that&rsquo;s hot, swollen, and unhappy",
 ],
 contraindications: [
 "Cold hypersensitivity or Raynaud&rsquo;s syndrome",
 "Circulatory disorders in the treated limb",
 "Open wounds or fresh incisions without surgical clearance",
 ],
 whatToExpect: {
 duration: "20-30 min per session",
 frequency: "Daily during acute injury, then tapered",
 prep: "Wear something that lets us wrap the target area.",
 body: "The wrap feels snug and the cold builds gradually. Most patients settle in easily; the compression cycling is often what they miss most when they stop treatment.",
 },
 faqs: [
 {
 q: "Is this the same as regular ice?",
 a: "No. Regular ice is inconsistent (too cold in one spot, warming quickly in another) and doesn&rsquo;t move fluid. Game Ready delivers steady cold plus a pumping mechanical action to clear swelling.",
 },
 {
 q: "How soon after an injury should I use it?",
 a: "As soon as possible in the first 48-72 hours. It&rsquo;s also a great weekly-recovery tool for athletes.",
 },
 {
 q: "Can I use it after surgery?",
 a: "Yes, once your surgeon signs off on external cold and compression. We&rsquo;ll coordinate with their protocol.",
 },
 ],
 relatedSlugs: [
 "pneumatic-compressions",
 "pemf-therapy",
 "red-light-therapy",
 ],
 },

 /* ------------------ 07. Myofascial Scraping ------------------------ */
 {
 slug: "myofascial-scraping",
 label: "Myofascial Scraping",
 short: "Fascial release",
 metaTitle:
 "Myofascial Scraping (IASTM) in Laguna Hills · Aligned Health",
 metaDescription:
 "Instrument-assisted myofascial scraping at Aligned Health in Laguna Hills, CA, releases fascial restrictions and restores mobility. Schedule now, PPO plans accepted.",
 keywords: [
 "myofascial scraping laguna hills",
 "iastm therapy orange county",
 "graston technique chiropractor",
 "fascial release near me",
 "gua sha chiropractic",
 "instrument assisted soft tissue mobilization",
 ],
 imageSrc: "/images/services/myofascial-scraping-banner.jpg",
 imageAlt: "Myofascial scraping treatment at Aligned Health",
 hero: {
 eyebrow: "Soft-tissue work",
 tagline:
 "Instrument-assisted release for stubborn fascial restrictions the fingers can&rsquo;t quite reach.",
 stat: { value: "8-12", label: "min per area" },
 },
 intro: {
 lead:
 "Myofascial scraping, sometimes called IASTM, uses smooth stainless-steel tools to release fascial adhesions and improve tissue glide.",
 body: "It&rsquo;s our go-to for restrictions that feel &lsquo;stuck&rsquo; despite manual work: chronic IT-band tightness, plantar fascia complaints, post-injury scar tissue, and lingering forearm or calf issues in overuse cases.",
 },
 howItWorks: [
 {
 title: "Warm the tissue",
 description:
 "A brief warm-up with heat or light manual work primes the fascia for treatment.",
 },
 {
 title: "Apply emollient",
 description:
 "A small amount of skin-safe emollient lets the tool glide smoothly across the area.",
 },
 {
 title: "Scan and treat",
 description:
 "We use the tool to scan for &lsquo;gritty&rsquo; restrictions and then treat them with controlled strokes.",
 },
 {
 title: "Pair with movement",
 description:
 "You move the joint through range while we treat, and we finish with mobility drills to lock in change.",
 },
 ],
 benefits: [
 "Releases fascial adhesions the fingers can&rsquo;t reach",
 "Restores tissue glide between muscle layers",
 "Improves joint range of motion",
 "Effective for chronic overuse patterns",
 "Pairs well with adjustment and stretching",
 "Fast, most sessions are under 15 minutes",
 ],
 indications: [
 "IT-band tightness and lateral-knee pain",
 "Plantar fascia and heel pain",
 "Achilles tendon and calf tightness",
 "Tennis / golfer&rsquo;s elbow and forearm overuse",
 "Post-injury scar tissue restricting motion",
 ],
 contraindications: [
 "Broken skin, active rash, or infection in the area",
 "Recent surgery or open wound",
 "Certain bleeding disorders or high-dose blood thinners",
 ],
 whatToExpect: {
 duration: "8-12 min per treated area",
 frequency: "1-2 times per week during active treatment",
 prep: "Wear clothing that lets us access the area.",
 body: "You&rsquo;ll feel firm pressure and sometimes a &lsquo;gritty&rsquo; sensation as the tool crosses adhesions. Mild pink flushing (petechiae) can appear briefly, that&rsquo;s normal and expected. Some soreness the next day is common and short-lived.",
 },
 faqs: [
 {
 q: "Is it painful?",
 a: "Firm but tolerable. You control the pressure with our guidance. If it&rsquo;s sharp, we back off, that&rsquo;s not the goal.",
 },
 {
 q: "Why does it leave red marks?",
 a: "The strokes bring blood to the surface (petechiae). It&rsquo;s not bruising in the traditional sense and typically fades within a day or two.",
 },
 {
 q: "How is this different from cupping?",
 a: "Both work on fascia. Cupping uses suction to lift tissue; scraping uses instruments to shear across it. We often combine them in the same visit.",
 },
 ],
 relatedSlugs: ["cupping", "percussion-therapy", "assisted-stretching"],
 },

 /* ------------------ 08. Red Light Therapy -------------------------- */
 {
 slug: "red-light-therapy",
 label: "Red Light Therapy",
 short: "Photobiomodulation",
 metaTitle:
 "Red Light Therapy in Laguna Hills · Photobiomodulation · Aligned Health",
 metaDescription:
 "Red light therapy (photobiomodulation) at Aligned Health in Laguna Hills, CA, supports tissue recovery and calms inflammation. Schedule now, PPO plans accepted.",
 keywords: [
 "red light therapy laguna hills",
 "photobiomodulation orange county",
 "red light therapy near me",
 "near infrared therapy chiropractor",
 "red light therapy for pain",
 "cold laser therapy laguna hills",
 ],
 imageSrc: "/images/services/red-light-therapy-banner.jpg",
 imageAlt: "Red light therapy session at Aligned Health",
 hero: {
 eyebrow: "Recovery light",
 tagline:
 "Targeted red and near-infrared wavelengths that calm inflammation and support tissue repair, without heat or downtime.",
 stat: { value: "10-15", label: "min per area" },
 },
 intro: {
 lead:
 "Red light therapy, also called photobiomodulation or low-level light therapy, delivers specific wavelengths of red and near-infrared light to the tissue.",
 body: "The photons are absorbed by cellular structures called mitochondria, supporting energy production and downstream recovery processes. It&rsquo;s a quiet, comfortable, side-effect-free way to layer recovery into a visit.",
 },
 howItWorks: [
 {
 title: "Position the panel",
 description:
 "A red-light panel is aimed at the treatment area from a short distance, clothing is moved off the target zone.",
 },
 {
 title: "Deliver specific wavelengths",
 description:
 "Red and near-infrared wavelengths (typically 630-850 nm) penetrate skin and shallow tissue.",
 },
 {
 title: "Support mitochondria",
 description:
 "Photons are absorbed by cytochrome c oxidase, supporting cellular energy (ATP) production.",
 },
 {
 title: "Compound the visit",
 description:
 "We add red light after adjusting, percussion, or scraping to lock in recovery gains.",
 },
 ],
 benefits: [
 "Supports tissue repair and recovery",
 "May help reduce local inflammation",
 "Comfortable, no heat, no sensation",
 "Zero downtime, side-effect free for most patients",
 "Layers cleanly with adjusting, percussion, and other modalities",
 "Effective across joints, muscles, and skin",
 ],
 indications: [
 "Post-training soreness and recovery",
 "Chronic joint or muscle pain",
 "Slow-healing soft-tissue injuries",
 "Post-surgical recovery (once cleared)",
 "Skin-quality goals as a bonus benefit",
 ],
 contraindications: [
 "Active cancer in the treatment area",
 "Photosensitizing medications (tell us what you take)",
 "Direct exposure to eyes without protective goggles",
 ],
 whatToExpect: {
 duration: "10-15 min per treated area",
 frequency: "2-3 sessions per week during a recovery block",
 prep: "Nothing on the skin at the treatment site (lotions, sunscreens off).",
 body: "You&rsquo;ll feel almost nothing during the session, a slight warmth at most. Effects tend to accumulate across a series. Many patients pair it with adjustments and describe it as the &lsquo;wind-down&rsquo; part of a visit.",
 },
 faqs: [
 {
 q: "Is it safe for skin?",
 a: "Yes. Red light does not use UV wavelengths, so there&rsquo;s no burn risk. We do provide goggles for eye protection.",
 },
 {
 q: "How is this different from a heating pad?",
 a: "Heat brings blood to the surface. Red light drives energy into cells at the mitochondrial level, a different mechanism entirely.",
 },
 {
 q: "How many sessions until I notice a difference?",
 a: "Most patients feel a shift after 4-6 sessions used consistently. Chronic issues take longer than acute ones.",
 },
 ],
 relatedSlugs: [
 "pemf-therapy",
 "percussion-therapy",
 "therapeutic-ultrasounds",
 ],
 },

 /* ------------------ 09. Pneumatic Compressions --------------------- */
 {
 slug: "pneumatic-compressions",
 label: "Pneumatic Compressions",
 short: "Air-sleeve leg recovery",
 metaTitle:
 "Pneumatic Compression Boots in Laguna Hills · Aligned Health",
 metaDescription:
 "Sequential pneumatic compression boots at Aligned Health in Laguna Hills, CA, spa-like recovery for legs and arms. Schedule now, PPO plans accepted.",
 keywords: [
 "pneumatic compression laguna hills",
 "compression boots orange county",
 "air relax boots recovery",
 "leg recovery therapy",
 "normatec alternative laguna hills",
 "circulation boots for athletes",
 ],
 imageSrc: "/images/services/pneumatic-compressions-banner.jpg",
 imageAlt: "Pneumatic compression boots in use at Aligned Health",
 hero: {
 eyebrow: "Circulation & recovery",
 tagline:
 "Sequential compression sleeves that boost venous return and lymphatic drainage through your body.",
 stat: { value: "20-30", label: "min per session" },
 },
 intro: {
 lead:
 "Pneumatic compression uses inflatable sleeves, usually on the legs, sometimes on the arms or hips, that inflate and deflate in a programmed sequence.",
 body: "The wave-like pressure boosts venous return and lymphatic drainage, clearing metabolic waste and delivering fresh blood to fatigued tissue. Athletes love them for post-training recovery; anyone with tired, heavy legs will feel the difference.",
 },
 howItWorks: [
 {
 title: "Slip on the sleeves",
 description:
 "You settle into a recliner as we wrap the sleeves around your legs (or arms) and connect them to the pump.",
 },
 {
 title: "Sequential inflation",
 description:
 "Chambers inflate from the extremity upward, mimicking the body&rsquo;s natural venous return.",
 },
 {
 title: "Clear and refresh",
 description:
 "Rhythmic pressure moves lymph and used blood out, and fresh oxygenated blood in as pressure releases.",
 },
 {
 title: "Rest and repeat",
 description:
 "Most patients close their eyes and enjoy it. It pairs perfectly with red light or PEMF running at the same time.",
 },
 ],
 benefits: [
 "Speeds recovery between training sessions",
 "Reduces post-workout leg heaviness and soreness",
 "Supports lymphatic drainage",
 "Comfortable and deeply relaxing",
 "Pairs with red light or PEMF for a stacked recovery visit",
 "Great for runners, cyclists, weekend warriors, and desk workers",
 ],
 indications: [
 "Post-training recovery in athletes",
 "Long-flight or long-drive leg swelling",
 "Tired, heavy legs from prolonged standing",
 "General circulation support",
 "Weekly-recovery routines",
 ],
 contraindications: [
 "Active deep-vein thrombosis (DVT) or history of DVT without clearance",
 "Severe peripheral arterial disease",
 "Skin infection or open wound in the treated area",
 "Uncontrolled congestive heart failure",
 ],
 whatToExpect: {
 duration: "20-30 min per session",
 frequency: "As often as you like, weekly is a common cadence",
 prep: "Wear athletic shorts or leggings that let the sleeves fit smoothly.",
 body: "You&rsquo;ll settle into a comfortable seat and feel wave-like squeezing from the ankles upward. Most patients rate it a 9/10 for relaxation. Legs feel lighter and looser immediately after.",
 },
 faqs: [
 {
 q: "Is this like Normatec?",
 a: "Same category of therapy, sequential air compression. We&rsquo;ve chosen the specific equipment that works best in our office setting.",
 },
 {
 q: "How often should I do it?",
 a: "For general recovery, once a week is a good baseline. Athletes in high-volume blocks often do 2-3 sessions per week.",
 },
 {
 q: "Can I combine it with other services?",
 a: "Absolutely. It stacks perfectly with red light or PEMF running at the same time, a genuinely spa-quality recovery visit.",
 },
 ],
 relatedSlugs: [
 "game-ready-ice-compressions",
 "red-light-therapy",
 "assisted-stretching",
 ],
 },

 /* ------------------ 10. Intersegmental Distraction ----------------- */
 {
 slug: "intersegmental-distraction",
 label: "Intersegmental Distraction",
 short: "Roller-table mobilization",
 metaTitle:
 "Intersegmental Distraction (Roller Table) in Laguna Hills · Aligned Health",
 metaDescription:
 "Intersegmental distraction roller-table therapy at Aligned Health in Laguna Hills, CA, gentle spinal mobilization for stiff backs. Schedule now, PPO plans accepted.",
 keywords: [
 "roller table therapy laguna hills",
 "intersegmental traction",
 "spinal mobilization chiropractor",
 "gentle chiropractic care orange county",
 "roller table for back stiffness",
 ],
 imageSrc: "/images/services/intersegmental-distraction-banner.jpg",
 imageAlt:
 "Intersegmental distraction roller table at Aligned Health",
 hero: {
 eyebrow: "Gentle mobilization",
 tagline:
 "Rolling wheels that mobilize every spinal segment, the easiest &lsquo;good-morning stretch&rsquo; your back has ever gotten.",
 stat: { value: "10-15", label: "min per session" },
 },
 intro: {
 lead:
 "Intersegmental distraction uses a table with slow-moving rollers built underneath its padded surface.",
 body: "As the rollers travel along the length of your spine, each vertebral segment is gently mobilized and blood flow to the spinal tissues increases. It&rsquo;s an excellent low-force option for stiff backs, older patients, or a warm-up before adjusting.",
 },
 howItWorks: [
 {
 title: "Lie back and relax",
 description:
 "You lie face-up on the padded table, no belts or restraints needed.",
 },
 {
 title: "Rollers travel your spine",
 description:
 "The rollers move slowly up and down the length of your spine, gently mobilizing each segment.",
 },
 {
 title: "Boost tissue circulation",
 description:
 "Mobilization drives fresh blood into the spinal muscles and discs.",
 },
 {
 title: "Prep for the next step",
 description:
 "Most patients use it as a warm-up before adjustments or as a cool-down after.",
 },
 ],
 benefits: [
 "Gentle mobilization every spinal segment loves",
 "Increased blood flow to spinal tissues",
 "Excellent low-force option for older or apprehensive patients",
 "Great warm-up before manual adjusting",
 "Deeply relaxing, most patients would take a nap",
 "No downtime, no soreness",
 ],
 indications: [
 "General low-back or mid-back stiffness",
 "Older patients preferring low-force care",
 "Warm-up for a manual adjustment",
 "Recovery after long sedentary days",
 "First-visit patients easing into hands-on care",
 ],
 contraindications: [
 "Acute disc herniation with radicular symptoms (in flare)",
 "Spinal fracture or instability",
 "Advanced osteoporosis",
 ],
 whatToExpect: {
 duration: "10-15 min per session",
 frequency: "Layered into most visits as a warm-up",
 prep: "Wear comfortable clothing.",
 body: "You&rsquo;ll feel the rollers move slowly up and down your back. Pressure is adjustable and it&rsquo;s almost universally relaxing, several patients tell us it&rsquo;s the best part of the visit.",
 },
 faqs: [
 {
 q: "Is this an adjustment?",
 a: "No. It&rsquo;s mobilization, not manipulation. Different mechanism, gentler force. We often use both in the same visit.",
 },
 {
 q: "Is it safe for older patients?",
 a: "Yes. It&rsquo;s one of our first-choice options when a patient prefers low-force care.",
 },
 {
 q: "Can I do this without an adjustment?",
 a: "Absolutely. Some patients come in specifically for the roller table plus a modality, a great gentle recovery visit.",
 },
 ],
 relatedSlugs: [
 "chiropractic-adjustments",
 "spinal-decompression",
 "assisted-stretching",
 ],
 },

 /* ------------------ 11. Assisted Stretching ------------------------ */
 {
 slug: "assisted-stretching",
 label: "Assisted Stretching",
 short: "Guided passive stretching",
 metaTitle:
 "Assisted Stretching in Laguna Hills · One-on-One Sessions · Aligned Health",
 metaDescription:
 "One-on-one assisted stretching at Aligned Health in Laguna Hills, CA, restores flexibility, mobility, and balance. Schedule now, PPO plans accepted.",
 keywords: [
 "assisted stretching laguna hills",
 "stretch therapy orange county",
 "one on one stretch session",
 "flexibility therapy chiropractor",
 "mobility work laguna hills",
 "passive stretching near me",
 ],
 imageSrc: "/images/services/assisted-stretching-banner.jpg",
 imageAlt: "One-on-one assisted stretching session at Aligned Health",
 hero: {
 eyebrow: "Mobility & flexibility",
 tagline:
 "Guided passive stretching, the mobility work you know you should be doing, done properly with hands-on guidance.",
 stat: { value: "20-30", label: "min per session" },
 },
 intro: {
 lead:
 "Assisted stretching is exactly what it sounds like: we do the mobility work with you and for you, guiding each stretch to the edge of your range with hands-on support.",
 body: "The result is deeper, safer stretching than most people can achieve alone, and a much better handle on where your tightness actually lives. Great as a standalone session or as the finisher after an adjustment.",
 },
 howItWorks: [
 {
 title: "Quick mobility screen",
 description:
 "We look at hips, spine, shoulders, and ankles to see what&rsquo;s stuck and what needs the most attention.",
 },
 {
 title: "Position for each stretch",
 description:
 "You settle onto a padded table while we position the joint and apply gentle, controlled pressure.",
 },
 {
 title: "Breathe into the stretch",
 description:
 "We coach breath and cueing so your nervous system lets the tissue lengthen rather than fight back.",
 },
 {
 title: "Take-home drills",
 description:
 "You leave with 2-3 simple mobility drills tailored to what we found, not a generic printout.",
 },
 ],
 benefits: [
 "Improved joint range of motion",
 "Reduced day-to-day muscle tightness",
 "Better body awareness, you learn where you&rsquo;re actually tight",
 "Deeper stretching than most people achieve solo",
 "Excellent finisher after adjusting or percussion",
 "Take-home drills that carry the effect between visits",
 ],
 indications: [
 "General tightness from desk work or driving",
 "Athletes wanting more usable range of motion",
 "Post-adjustment tissue relaxation",
 "People starting a new training program",
 "Recovery from long sedentary periods",
 ],
 whatToExpect: {
 duration: "20-30 min per session",
 frequency: "Weekly or bi-weekly for progress",
 prep: "Wear athletic clothes you can move in comfortably.",
 body: "You&rsquo;ll leave feeling markedly looser and with a clearer sense of which areas need the most work. We&rsquo;ll always send you home with a couple of targeted drills so the change compounds between visits.",
 },
 faqs: [
 {
 q: "Is this like yoga?",
 a: "Similar goals, different vehicle. Yoga is active and self-directed. Assisted stretching is passive and coached, often more effective for people who struggle to find their edge alone.",
 },
 {
 q: "Do I need to be flexible already?",
 a: "No. The tighter you are, the more you&rsquo;ll get out of it. We meet you where you are.",
 },
 {
 q: "Can I book this without an adjustment?",
 a: "Yes. Many patients come in specifically for stretching as a standalone service.",
 },
 ],
 relatedSlugs: [
 "myofascial-scraping",
 "percussion-therapy",
 "intersegmental-distraction",
 ],
 },

 /* ------------------ 12. Cupping ------------------------------------ */
 {
 slug: "cupping",
 label: "Cupping",
 short: "Fascial suction therapy",
 metaTitle: "Cupping Therapy in Laguna Hills · Aligned Health",
 metaDescription:
 "Cupping therapy at Aligned Health in Laguna Hills, CA, suction that lifts fascia to improve circulation and release tension. Schedule now, PPO plans accepted.",
 keywords: [
 "cupping therapy laguna hills",
 "cupping orange county",
 "myofascial cupping chiropractor",
 "cupping for back pain",
 "cupping near me",
 "vacuum cupping therapy",
 ],
 imageSrc: "/images/services/cupping-banner.jpg",
 imageAlt: "Cupping therapy session at Aligned Health",
 hero: {
 eyebrow: "Soft-tissue release",
 tagline:
 "Suction that lifts fascia instead of pressing on it, the opposite direction of every other tool in the room.",
 stat: { value: "10-15", label: "min per area" },
 },
 intro: {
 lead:
 "Cupping uses controlled suction to lift the skin and superficial fascia away from the deeper tissue.",
 body: "It&rsquo;s the mirror-image of most manual therapy: every other tool presses down; cups pull up. That decompression helps loosen adhesions, boost local circulation, and take pressure off entrapped structures.",
 },
 howItWorks: [
 {
 title: "Place the cups",
 description:
 "Silicone or glass cups are placed on the target area with a small amount of skin-safe oil.",
 },
 {
 title: "Apply suction",
 description:
 "The cups create negative pressure that lifts the skin and superficial fascia away from deeper tissue.",
 },
 {
 title: "Static or gliding",
 description:
 "Depending on the goal we either leave the cups in place for 5-10 minutes or glide them slowly across the area.",
 },
 {
 title: "Pair with movement",
 description:
 "You move the joint through range while cupping to encourage tissue glide.",
 },
 ],
 benefits: [
 "Lifts fascia instead of compressing it",
 "Improves local circulation and lymphatic flow",
 "Releases stubborn superficial adhesions",
 "Complements percussion and scraping perfectly",
 "Comfortable for most patients, not the &lsquo;painful pinching&rsquo; some expect",
 "Fast, most sessions are under 15 minutes",
 ],
 indications: [
 "Chronic upper-back or trap tightness",
 "IT-band or hamstring restrictions",
 "Post-training soreness",
 "Lingering tension after manual work alone",
 "Patients curious about a different feeling than pressing therapies",
 ],
 contraindications: [
 "Broken skin, active rash, or infection at the site",
 "Bleeding disorders or high-dose blood thinners",
 "Recent surgery or open wound",
 ],
 whatToExpect: {
 duration: "10-15 min per treated area",
 frequency: "1-2 times per week during active treatment",
 prep: "Wear clothing that lets us access the area.",
 body: "You&rsquo;ll feel firm suction, strong but not painful. The classic circular marks are common and typically fade within 3-7 days. They&rsquo;re not bruises in the traditional sense; they&rsquo;re a mark of the tissue being pulled apart, and they&rsquo;re harmless.",
 },
 faqs: [
 {
 q: "Do the marks hurt or damage skin?",
 a: "No. The marks are surface-level and fade in a few days. They&rsquo;re not bruises from impact; they&rsquo;re from suction, which is a very different mechanism.",
 },
 {
 q: "How is cupping different from scraping?",
 a: "Cupping pulls tissue up; scraping shears across it. We often use both in the same session because they address the fascia from different angles.",
 },
 {
 q: "Can I have marks visible for an event?",
 a: "If you have a photoshoot or event coming up, tell us and we&rsquo;ll skip cupping that visit, there are plenty of other tools that don&rsquo;t leave marks.",
 },
 ],
 relatedSlugs: [
 "myofascial-scraping",
 "percussion-therapy",
 "assisted-stretching",
 ],
 },

 /* ------------------ 13. Therapeutic Ultrasounds -------------------- */
 {
 slug: "therapeutic-ultrasounds",
 label: "Therapeutic Ultrasounds",
 short: "Deep-tissue sound waves",
 metaTitle:
 "Therapeutic Ultrasound in Laguna Hills · Aligned Health",
 metaDescription:
 "Therapeutic ultrasound at Aligned Health in Laguna Hills, CA, deep-tissue sound waves that reduce inflammation and speed healing. Schedule now, PPO plans accepted.",
 keywords: [
 "therapeutic ultrasound laguna hills",
 "ultrasound therapy orange county",
 "chiropractic ultrasound",
 "deep tissue ultrasound for pain",
 "physical therapy ultrasound near me",
 "ultrasound for tendonitis",
 ],
 imageSrc: "/images/services/therapeutic-ultrasounds-banner.jpg",
 imageAlt:
 "Therapeutic ultrasound applied during treatment at Aligned Health",
 hero: {
 eyebrow: "Deep-tissue heat",
 tagline:
 "High-frequency sound waves that reach deep into soft tissue, a quiet, warming assist for slow-healing structures.",
 stat: { value: "5-8", label: "min per area" },
 },
 intro: {
 lead:
 "Therapeutic ultrasound uses high-frequency sound waves, not visible light or heat, to reach into deep soft tissue where surface modalities can&rsquo;t.",
 body: "It&rsquo;s a workhorse for lingering tendon and ligament complaints, chronic muscle knots, and post-injury tissue that has plateaued with other approaches. Delivered by a technician-guided wand at a specific frequency and intensity for your case.",
 },
 howItWorks: [
 {
 title: "Apply conducting gel",
 description:
 "A skin-safe gel lets the sound waves transmit smoothly from the wand into the tissue.",
 },
 {
 title: "Move the wand",
 description:
 "The wand is moved in slow, small circles across the treatment area, never held stationary.",
 },
 {
 title: "Deliver deep vibration & warming",
 description:
 "Sound waves cause microscopic vibration and gentle warming several centimeters below the surface.",
 },
 {
 title: "Reassess",
 description:
 "We check range of motion and tenderness before layering in adjusting, stretching, or another modality.",
 },
 ],
 benefits: [
 "Reaches tissue too deep for surface modalities",
 "Supports healing in tendons, ligaments, and deep muscle",
 "Painless and comfortable during treatment",
 "Effective for stubborn overuse cases",
 "Pairs well with adjustment, scraping, and stretching",
 "Short sessions, typically under 10 minutes",
 ],
 indications: [
 "Chronic tendinopathy (Achilles, patellar, elbow)",
 "Ligament sprains past the acute phase",
 "Deep muscle knots that haven&rsquo;t responded to surface work",
 "Post-injury tissue that has plateaued",
 "Adhesions in older sports injuries",
 ],
 contraindications: [
 "Directly over spinal implants, pacemakers, or metal hardware",
 "Active cancer in the treated area",
 "Growth plates in children (over those specific sites)",
 "Pregnancy (over the abdomen or low back)",
 ],
 whatToExpect: {
 duration: "5-8 min per treated area",
 frequency: "2-3 times per week during an active recovery block",
 prep: "Wear clothing that lets us access the area.",
 body: "You&rsquo;ll feel the smooth glide of the wand and, at higher settings, a mild warming sensation. Sessions are short and painless. Effects on tissue quality accumulate across a series.",
 },
 faqs: [
 {
 q: "Is this the same as diagnostic ultrasound?",
 a: "Same physics, different goal. Diagnostic ultrasound produces images; therapeutic ultrasound delivers vibration and heat into the tissue.",
 },
 {
 q: "Will I feel anything during the session?",
 a: "A smooth wand glide and sometimes mild warmth. Nothing painful.",
 },
 {
 q: "How is this different from red light or PEMF?",
 a: "Different mechanism entirely, sound waves vs. light photons vs. electromagnetic pulses. Each works better for different tissue depths and problem types.",
 },
 ],
 relatedSlugs: [
 "red-light-therapy",
 "pemf-therapy",
 "electromuscular-stimulation",
 ],
 },

 /* ------------------ 14. Auto / Personal Injury --------------------- */
 {
  slug: "auto-personal-injury",
  label: "Auto/Personal Injury",
  short: "Crash & injury recovery care",
  metaTitle:
   "Auto Accident & Personal Injury Chiropractor in Laguna Hills · Aligned Health",
  metaDescription:
   "Post-accident chiropractic care for whiplash, neck, and back injuries in Laguna Hills, CA. Schedule now, auto insurance and attorney lien accepted. Serving South Orange County.",
  keywords: [
   "auto accident chiropractor laguna hills",
   "personal injury chiropractor laguna hills",
   "car accident chiropractor near me",
   "whiplash treatment laguna hills",
   "post accident chiropractic care orange county",
   "chiropractor for car accident injuries",
   "personal injury doctor laguna hills",
   "attorney lien chiropractor orange county",
  ],
  // NOTE: reusing the chiropractic-adjustment photo until a dedicated
  // auto/PI hero image is provided. Swap `imageSrc` when new imagery
  // is available; keep the Squarespace CDN allow-list entry in
  // next.config.ts intact.
  imageSrc: "/images/services/auto-personal-injury-banner.jpg",
  imageAlt:
   "Chiropractic care for auto accident and personal injury patients at Aligned Health in Laguna Hills",
  hero: {
   eyebrow: "Post-accident care",
   tagline:
    "Whiplash, neck, and back injury care after a car accident or workplace incident, documented, insurance-friendly, and built to get you back to normal.",
   stat: { value: "72hr", label: "ideal care window" },
  },
  intro: {
   lead:
    "If you&rsquo;ve been in a car accident or suffered a personal injury, prompt chiropractic care can be the difference between a clean recovery and lingering pain months later.",
   body: "We treat auto accident and personal injury patients across South Orange County. Every case starts with a full injury workup, whiplash screen, spinal and neurologic exam, then a documented treatment plan matched to what we find. We bill your auto insurance directly (MedPay / PIP) when available and treat many patients on an attorney lien so the paperwork side of your recovery is handled while you focus on healing.",
  },
  howItWorks: [
   {
    title: "Comprehensive injury assessment",
    description:
     "Full orthopedic and neurologic exam, imaging referral when indicated, and a written report that documents your injuries from day one.",
   },
   {
    title: "Personalized treatment plan",
    description:
     "Adjustments, spinal decompression, soft-tissue work, and recovery modalities matched to the specific injuries revealed by your exam.",
   },
   {
    title: "Insurance & attorney coordination",
    description:
     "We bill auto insurance directly and, when appropriate, treat on an attorney lien so you have zero out-of-pocket cost during care.",
   },
   {
    title: "Documented recovery",
    description:
     "Every visit is charted with objective findings so your attorney and insurance carrier have the clinical record they need for your claim.",
   },
  ],
  benefits: [
   "See a chiropractor within the ideal 72-hour post-accident window",
   "Non-drug, non-surgical relief for whiplash and back injuries",
   "Detailed injury documentation for your insurance or PI claim",
   "Direct billing to auto insurance (MedPay / PIP) where available",
   "Attorney lien-based treatment available, zero upfront cost",
   "Coordinated care with your PI attorney and primary physician",
  ],
  indications: [
   "Whiplash and cervical soft-tissue injury after a rear-end collision",
   "Neck pain, headaches, or dizziness that started after a crash",
   "Mid-back and low-back pain following an auto accident",
   "Herniated or bulging disc from accident-related trauma",
   "Shoulder, hip, or knee soft-tissue injury from a fall or slip",
   "Delayed-onset symptoms 24-72 hours after an impact",
  ],
  contraindications: [
   "Suspected fracture, internal bleeding, or head injury (go to the ER first)",
   "Progressive neurologic deficits requiring immediate imaging",
   "Loss of consciousness during the incident without prior evaluation",
  ],
  whatToExpect: {
   duration: "60 min first visit · 20-30 min follow-ups",
   frequency: "2-3 visits per week during the acute phase",
   prep: "Bring your police report, insurance information, and attorney details if you have them.",
   body: "Your first visit is a full injury workup: history of the accident, orthopedic and neurologic exam, and a written treatment plan you can share with your attorney or claims adjuster. We&rsquo;ll explain what we found, what we recommend, and what recovery typically looks like for your injury pattern before you start care.",
  },
  faqs: [
   {
    q: "How soon after a car accident should I see a chiropractor?",
    a: "As soon as possible, ideally within 72 hours. Adrenaline and inflammation can mask whiplash and spinal injuries for days after a crash. Early care speeds recovery and creates a medical record that supports your insurance or personal injury claim.",
   },
   {
    q: "Do you accept auto insurance or work on an attorney lien?",
    a: "Yes to both. We bill auto insurance directly when MedPay or PIP is available, and we treat many patients on an attorney lien, which means zero out-of-pocket cost during your care. Payment is handled from your settlement.",
   },
   {
    q: "What injuries do you treat after an accident?",
    a: "Whiplash, neck and back pain, headaches, herniated or bulging discs, sacroiliac dysfunction, shoulder and knee soft-tissue injuries, and delayed-onset symptoms that appear days after the impact.",
   },
   {
    q: "How many visits will I need?",
    a: "Minor whiplash often resolves in 6-12 visits over 4-6 weeks. More significant spinal injuries can take 3-6 months of care. We reassess constantly and share updates with your attorney or adjuster as your case progresses.",
   },
   {
    q: "Do I need a personal injury attorney?",
    a: "Not always. If your case is straightforward and the other driver&rsquo;s insurance is cooperating, you may not need one. If liability is disputed or your injuries are significant, we&rsquo;re happy to refer you to trusted local PI attorneys we work with regularly.",
   },
  ],
  relatedSlugs: [
   "chiropractic-adjustments",
   "spinal-decompression",
   "electromuscular-stimulation",
  ],
 },
];

/* ---------------------------------------------------------------------- */
/* Nav-specific projection                                                 */
/* ---------------------------------------------------------------------- */

export interface ServiceNavItem {
 slug: string;
 label: string;
 short?: string;
}

/**
 * Compact projection used by the nav dropdown + mobile accordion. Keeps
 * only the fields those components need so they don&rsquo;t re-render on
 * unrelated content changes.
 */
export const SERVICE_NAV_ITEMS: readonly ServiceNavItem[] = SERVICES.map(
 (s) => ({ slug: s.slug, label: s.label, short: s.short })
);

/* ---------------------------------------------------------------------- */
/* Helpers */
/* ---------------------------------------------------------------------- */

export function getAllServices(): readonly Service[] {
 return SERVICES;
}

export function getServiceBySlug(slug: string): Service | undefined {
 return SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
 return SERVICES.map((s) => s.slug);
}

export function getRelatedServices(slug: string): readonly Service[] {
 const source = getServiceBySlug(slug);
 if (!source) return [];
 return source.relatedSlugs
 .map((rs) => getServiceBySlug(rs))
 .filter((s): s is Service => Boolean(s));
}
