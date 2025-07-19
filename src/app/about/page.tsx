import Image from 'next/image';

const teamMembers = [
    { name: "Mr. Gupta", role: "Head of Operations", image: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Mr. Sahil Gupta", role: "CEO & Managing Director", image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Mr. Gupta", role: "Head of Technical & Logistics", image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
];


export default function AboutPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header 
        className="relative w-full min-h-[25em] flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1932&auto=format&fit=crop')"}}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative z-10 w-11/12 md:w-3/4 lg:w-1/2 mt-20 text-foreground">
          <span className="inline-block uppercase tracking-wider text-sm font-semibold">Company Management</span>
          <h1 className="text-2xl md:text-4xl font-bold mt-2">Meet a team of experts and innovators who are pioneers in their field</h1>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 -mt-12 pb-16">
        <div className="bg-card border border-border/50 rounded-lg p-8 shadow-lg text-card-foreground">
          <h2 className="text-3xl font-bold font-headline mb-6 text-center">Management Team – Shyam Furniture</h2>
          <p className="mb-8 text-center text-muted-foreground">
            At Shyam Furniture, our operations are driven by a dedicated and experienced team, each playing a vital role in ensuring smooth day-to-day functioning and long-term growth:
          </p>
          <ul className="space-y-6 text-lg">
            <li>
              <h3 className="text-xl font-semibold text-primary">Founder & Visionary</h3>
              <p className="text-muted-foreground">The foundation of Shyam Furniture was laid by the late Grandfather of Mr. Sahil Gupta, with a commitment to quality and trust.</p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-primary">Head of Operations</h3>
              <p className="text-muted-foreground">Mr. Gupta (Father of Sahil Gupta) – With years of experience in furniture and retail, he leads the on-ground operations and maintains strong customer relationships.</p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-primary">CEO & Managing Director</h3>
              <p className="text-muted-foreground">Mr. Sahil Gupta – Oversees the overall business strategy, digital expansion, and customer experience. He is responsible for taking the brand to new heights in the modern market.</p>
            </li>
            <li>
              <h3 className="text-xl font-semibold text-primary">Head of Technical & Logistics</h3>
              <p className="text-muted-foreground">Mr. Gupta (Elder Brother of Sahil) – Manages technical infrastructure, online order systems, inventory coordination, and delivery logistics to ensure efficient service.</p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}