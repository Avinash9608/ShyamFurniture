import Image from 'next/image';

const teamMembers = [
    { name: "Mr. Gupta", role: "Head of Operations", image: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Mr. Sahil Gupta", role: "CEO & Managing Director", image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Mr. Gupta", role: "Head of Technical & Logistics", image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
];

const historyData = [
  { year: "1990s", description: "Shyam Furniture founded in the early 1990s" },
  { year: "2020s", description: "Expansion into modern and custom furniture design in the 2020s" },
  { year: "2023", description: "Online ordering introduced via WhatsApp and Email in 2023" },
  { year: "2025", description: "Official website and mobile-friendly catalog launched in 2025" },
  { year: "Early 2025", description: "Formation of in-house technical and logistics team in early 2025" },
  { year: "Mid-2025", description: "Dedicated delivery service established within Saharsa in mid-2025" },
  { year: "Upcoming Year", description: "Planned expansion of delivery to nearby cities in the upcoming year" },
]

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground min-h-screen about-page">
      <header 
        className="relative w-full min-h-[25em] flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1932&auto=format&fit=crop')"}}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative z-10 w-11/12 md:w-3/4 lg:w-1/2 mt-20 text-white">
          <span className="inline-block uppercase tracking-wider text-sm font-semibold">Company Management</span>
          <h1 className="text-2xl md:text-4xl font-bold mt-2">Meet a team of experts and innovators who are pioneers in their field</h1>
        </div>
      </header>

      <main className="relative z-10">
        <section id="marketlead-info">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
              SHYAM FURNITURE IS A PREMIUM FURNITURE RETAILER SPECIALIZING IN HANDCRAFTED, HIGH-QUALITY PRODUCTS.
            </h2>
            <div className="text-center text-muted-foreground space-y-4">
              <p>We serve customers in the Saharsa region with a wide range of stylish and durable furniture for homes and offices, combining traditional craftsmanship with contemporary design.</p>
              <p>With a strong local presence built over decades, Shyam Furniture has evolved into a modern retail brand. Our digital platform allows customers to conveniently browse collections and place orders online via our website or mobile application.</p>
              <p>We are committed to quality, timely delivery, and customer satisfaction — values that have earned the trust of thousands of families.</p>
              <p>Shyam Furniture is managed by a team of experienced professionals, each contributing to our operational excellence and digital growth.</p>
            </div>
          </div>
        </section>
        
        <section id="timeline">
            <h2>HISTORY</h2>
            <div className="timeline-container">
              {historyData.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-item-content">
                      <span className="timeline-year">{item.year}</span>
                      <p className="timeline-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
        </section>
      </main>

       <section className="team py-16">
          <h2 className="section-heading">Our Team</h2>
          <div className="container">
            {teamMembers.map((member, index) => (
              <div key={index} className="profile">
                <Image
                  src={member.image}
                  alt={`Photo of ${member.name}`}
                  width={200}
                  height={200}
                  className="profile-img"
                />
                <div className="name-container">
                  <span className="name">{member.name}</span>
                  <span className="role">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
}